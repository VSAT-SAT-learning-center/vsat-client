import { Switch } from "@mui/material";
import classNames from "classnames/bind";
import { useState } from "react";
import Modal from "react-modal";
import { toast } from "react-toastify";
import apiClient from "~/services/apiService";
import styles from "./ProfileEditModal.module.scss";

const cx = classNames.bind(styles);

Modal.setAppElement("#root");

const parseCustomDate = (dateString) => {
  if (!dateString) return "";
  const dateParts = dateString.split(" ")[1]?.split("/") || [];
  if (dateParts.length !== 3) return "";

  let [day, month, year] = dateParts;

  day = day.padStart(2, '0');
  month = month.padStart(2, '0');

  return `${year}-${month}-${day}`; 
};

function ProfileEditModal({ isOpen, onClose, profile, onSaveSuccess }) {
  const [editableProfile, setEditableProfile] = useState({
    ...profile,
    startdate: parseCustomDate(profile.startdate),
    enddate: parseCustomDate(profile.enddate),
  });
  const [isSaving, setIsSaving] = useState(false);

  const handleInputChange = (field, value) => {
    if (field.includes(".")) {
      const [parent, child] = field.split(".");
      setEditableProfile((prev) => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value,
        },
      }));
    } else {
      setEditableProfile((prev) => ({
        ...prev,
        [field]: value,
      }));
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const studyProfileResponse = await apiClient.put(
        `/study-profiles/updateStudyProfile/${editableProfile.id}`,
        {
          startDate: editableProfile.startdate,
          endDate: editableProfile.enddate,
        }
      );

      const trialExamResponse = await apiClient.put(
        `/account/updateIsTrialExamById/${editableProfile.account.id}/${editableProfile.account.isTrialExam}`
      );

      if (
        studyProfileResponse.status === 200 &&
        trialExamResponse.status === 200
      ) {
        toast.success("Update profile successfully.");
        onSaveSuccess();
      }

      onClose();
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to save changes. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className={cx("profile-modal")}
      overlayClassName={cx("profile-modal-overlay")}
    >
      <div className={cx("profile-modal-container")}>
        <div className={cx("profile-header")}>
          <div className={cx("profile-infor")}>
            <div className={cx("profile-image-container")}>
              <img
                className={cx("profile-image")}
                src={
                  editableProfile.account?.profilepictureurl ||
                  "/default-avatar.png"
                }
                alt="Profile"
              />
            </div>
            <div className={cx("profile-details")}>
              <h2 className={cx("profile-name")}>
                {editableProfile.account?.firstname || "N/A"}{" "}
                {editableProfile.account?.lastname || "N/A"}
              </h2>
              <p className={cx("profile-email")}>
                {editableProfile.account?.email || "N/A"}
              </p>
            </div>
          </div>
          <div
            className={cx(
              "profile-status",
              editableProfile?.status === "Completed"
                ? "approved"
                : editableProfile?.status === "Inactive"
                  ? "rejected"
                  : ""
            )}
          >
            {editableProfile?.status}
          </div>
        </div>

        {/* Profile Information */}
        <div className={cx("profile-content")}>
          <div className={cx("form-group")}>
            <label className={cx("form-label")}>First Name:</label>
            <input
              type="text"
              className={cx("form-input")}
              value={editableProfile.account?.firstname || ""}
              readOnly
            />
          </div>
          <div className={cx("form-group")}>
            <label className={cx("form-label")}>Last Name:</label>
            <input
              type="text"
              className={cx("form-input")}
              value={editableProfile.account?.lastname || ""}
              readOnly
            />
          </div>
          <div className={cx("form-group")}>
            <label className={cx("form-label")}>Start Date:</label>
            <input
              type="date"
              className={cx("form-input")}
              value={editableProfile.startdate || ""}
              onChange={(e) =>
                handleInputChange("startdate", e.target.value)
              }
            />
          </div>
          <div className={cx("form-group")}>
            <label className={cx("form-label")}>End Date:</label>
            <input
              type="date"
              className={cx("form-input")}
              value={editableProfile.enddate || ""}
              onChange={(e) =>
                handleInputChange("enddate", e.target.value)
              }
            />
          </div>
          <div className={cx("form-group")}>
            <label className={cx("form-label")}>Teacher In Charge:</label>
            <input
              type="text"
              className={cx("form-input")}
              value={`${editableProfile.teacher?.firstname || ""} ${editableProfile.teacher?.lastname || ""
                }`}
              readOnly
            />
          </div>
          <div className={cx("form-group")}>
            <label className={cx("form-label")}>Take Trial Exam:</label>
            <Switch
              checked={editableProfile.account?.isTrialExam || false}
              onChange={(e) =>
                handleInputChange("account.isTrialExam", e.target.checked)
              }
            />
          </div>
        </div>
        <div className={cx("profile-footer")}>
          <button
            className={cx("save-btn")}
            onClick={handleSave}
            disabled={isSaving}
          >
            {isSaving ? "Saving..." : "Save"}
          </button>
          <button
            className={cx("close-btn")}
            onClick={onClose}
            disabled={isSaving}
          >
            Cancel
          </button>
        </div>
      </div>
    </Modal>
  );
}

export default ProfileEditModal;
