import { Slider } from "@mui/material";
import classNames from "classnames/bind";
import { useEffect, useState } from "react";
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
    account: {
      id: "",
      email: "",
      firstname: "",
      lastname: "",
    },
  });
  const [isSaving, setIsSaving] = useState(false);
  const [accounts, setAccounts] = useState([]);
  const [loadingEmails, setLoadingEmails] = useState(true);

  useEffect(() => {
    const fetchAccounts = async () => {
      setLoadingEmails(true);
      try {
        const response = await apiClient.get(
          "/study-profiles/getStudyProfileComplete?page=1&pageSize=0"
        );
        const accountList = response.data.data.data.map((profile) => ({
          id: profile.account.id,
          email: profile.account?.email,
          firstname: profile.account?.firstname,
          lastname: profile.account?.lastname,
          profilepictureurl: profile.account?.profilepictureurl
        }));
        setAccounts(accountList);
      } catch (error) {
        console.error("Error fetching accounts:", error);
        toast.error("Failed to load accounts.");
      } finally {
        setLoadingEmails(false);
      }
    };

    if (isOpen) {
      fetchAccounts();
    }
  }, [isOpen]);

  const handleEmailChange = (email) => {
    const selectedAccount = accounts.find((account) => account.email === email);
    setEditableProfile((prev) => ({
      ...prev,
      account: {
        ...prev.account,
        id: selectedAccount?.id || "",
        email,
        firstname: selectedAccount?.firstname || "",
        lastname: selectedAccount?.lastname || "",
        profilepictureurl: selectedAccount?.profilepictureurl || ""
      },
    }));
  };

  const handleInputChange = (field, value) => {
    setEditableProfile((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = async () => {
    if (!editableProfile.account.id || !editableProfile.startdate || !editableProfile.enddate) {
      toast.error("Please fill all required fields before saving.");
      return;
    }

    setIsSaving(true);
    try {
      const response = await apiClient.post("/study-profiles/createStudyProfile", {
        accountId: editableProfile.account.id,
        targetscoreMath: parseInt(editableProfile.mathscore, 10) || 0,
        targetscoreRW: parseInt(editableProfile.readandwwirtescore, 10) || 0,
        startDate: editableProfile.startdate,
        endDate: editableProfile.enddate,
      });
      if (response.status === 201) {
        toast.success("Study profile created successfully.");
        onSaveSuccess();
        onClose();
      }
    } catch (error) {
      console.error("Error creating study profile:", error);
      toast.error("Failed to create study profile. Please try again.");
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
                src={editableProfile.account.profilepictureurl || "https://cdn-icons-png.flaticon.com/512/18174/18174163.png"}
                alt="Profile"
              />
            </div>
            <div className={cx("create-study-profile-details")}>
              <h2 className={cx("create-study-profile-name")}>
                {editableProfile.account.firstname && editableProfile.account.lastname
                  ? `${editableProfile.account.firstname} ${editableProfile.account.lastname}`
                  : "Student Name"}
              </h2>
            </div>
          </div>
        </div>
        <div className={cx("create-study-profile-container-content")}>
          <div className={cx("form-group")}>
            <label className={cx("form-label")}>Email:</label>
            <select
              className={cx("form-input")}
              value={editableProfile.account?.email || ""}
              onChange={(e) => handleEmailChange(e.target.value)}
            >
              <option value="">Select an email</option>
              {loadingEmails ? (
                <option value="">Loading emails...</option>
              ) : (
                accounts.map((account) => (
                  <option key={account.id} value={account.email}>
                    {account.email}
                  </option>
                ))
              )}
            </select>
          </div>
          <div className={cx("create-study-profile-content")}>
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
                onChange={(e) => handleInputChange("enddate", e.target.value)}
              />
            </div>
            <div className={cx("form-group")}>
              <label className={cx("form-label")}>
                Target score reading and writing:
              </label>
              <Slider
                onChange={(e) =>
                  setEditableProfile((prev) => ({
                    ...prev,
                    readandwwirtescore: e.target.value,
                  }))
                }
                valueLabelDisplay="auto"
                step={50}
                marks
                min={200}
                max={800}
                sx={{
                  color: "rgb(36, 70, 182)",
                }}
              />
              <div>{editableProfile.readandwwirtescore || 200}</div>
            </div>
            <div className={cx("form-group")}>
              <label className={cx("form-label")}>Target score math:</label>
              <Slider
                onChange={(e) =>
                  setEditableProfile((prev) => ({
                    ...prev,
                    mathscore: e.target.value,
                  }))
                }
                valueLabelDisplay="auto"
                step={50}
                marks
                min={200}
                max={800}
                sx={{
                  color: "rgb(36, 70, 182)",
                }}
              />
              <div>{editableProfile.mathscore || 200}</div>
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
      </div>
    </Modal>
  );
}

export default ProfileCreateModal;
