import classNames from "classnames/bind";
import { useState } from "react";
import Modal from "react-modal";
import { toast } from "react-toastify";
import apiClient from "~/services/apiService";
import styles from "./ProfileCreateModal.module.scss";

const cx = classNames.bind(styles);

Modal.setAppElement("#root");

function ProfileCreateModal({ isOpen, onClose, onSaveSuccess }) {
  const [editableProfile, setEditableProfile] = useState({
    startdate: "",
    enddate: "",
    readandwwirtescore: "",
    mathscore: "",
  });
  const [isSaving, setIsSaving] = useState(false);

  const handleInputChange = (field, value) => {
    setEditableProfile((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const response = await apiClient.post("", {
        startdate: editableProfile.startdate,
        enddate: editableProfile.enddate,
        readandwwirtescore: "",
        mathscore: "",
      });

      if (response.status === 200) {
        toast.success("Profile created successfully.");
        onSaveSuccess();
        onClose();
      }
    } catch (error) {
      console.error("Error creating profile:", error);
      toast.error("Failed to create profile. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className={cx("create-study-profile-modal")}
      overlayClassName={cx("create-study-profile-modal-overlay")}
    >
      <div className={cx("create-study-profile-modal-container")}>
        <div className={cx("create-study-profile-header")}>
          <div className={cx("create-study-profile-infor")}>
            <div className={cx("create-study-profile-image-container")}>
              <img
                className={cx("create-study-profile-image")}
                src={
                  editableProfile.account?.profilepictureurl ||
                  "/default-avatar.png"
                }
                alt="Profile"
              />
            </div>
            <div className={cx("create-study-profile-details")}>
              <h2 className={cx("create-study-profile-name")}>
                {editableProfile.account?.firstname || "N/A"}{" "}
                {editableProfile.account?.lastname || "N/A"}
              </h2>
              <div className={cx("form-group")}>
                <label className={cx("form-label")}>Email:</label>
                <select
                  className={cx("form-input")}
                  value={editableProfile.account?.email || ""}
                  onChange={(e) =>
                    setEditableProfile((prev) => ({
                      ...prev,
                      account: {
                        ...prev.account,
                        email: e.target.value, // Cập nhật giá trị email trong state
                      },
                    }))
                  }
                >
                  <option value="">Select an email</option>{" "}
                  {/* Tùy chọn mặc định */}
                  <option value="email1@example.com">email1@example.com</option>
                  <option value="email2@example.com">email2@example.com</option>
                  <option value="email3@example.com">email3@example.com</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        <div className={cx("create-study-profile-content")}>
          <div className={cx("form-group")}>
            <label className={cx("form-label")}>Start Date:</label>
            <input
              type="date"
              className={cx("form-input")}
              value={editableProfile.startdate || ""}
              onChange={(e) => handleInputChange("startdate", e.target.value)}
            />
          </div>
          <div className={cx("form-group")}>
            <label className={cx("form-label")}>End Date:</label>
            <input
              type="date"
              className={cx("form-input")}
              value={editableProfile.enddate || ""}
              onChange={(e) => handleInputChange("enddate", e.target.value)}
            />
          </div>
          <div className={cx("form-group")}>
            <label className={cx("form-label")}>
              Target score reading and writing:
            </label>
            <input
              type="range"
              className={cx("form-input")}
              min="200"
              max="800"
              step="50"
              value={editableProfile.readandwwirtescore || 200}
              onChange={(e) =>
                setEditableProfile((prev) => ({
                  ...prev,
                  readandwwirtescore: e.target.value,
                }))
              }
            />
            <div>{editableProfile.readandwwirtescore || 200}</div>{" "}
          </div>
          <div className={cx("form-group")}>
            <label className={cx("form-label")}>Target score math:</label>
            <input
              type="range"
              className={cx("form-input")}
              min="200"
              max="800"
              step="50"
              value={editableProfile.mathscore || 200}
              onChange={(e) =>
                setEditableProfile((prev) => ({
                  ...prev,
                  mathscore: e.target.value,
                }))
              }
            />
            <div>{editableProfile.mathscore || 200}</div>{" "}
          </div>
        </div>
        <div className={cx("create-study-profile-footer")}>
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

export default ProfileCreateModal;
