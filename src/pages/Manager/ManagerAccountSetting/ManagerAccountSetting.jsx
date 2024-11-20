import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import PageLayout from "~/layouts/Manager/PageLayout";
import LearningMaterialCreateFooter from "~/components/Staff/LearningMaterialCreate/LearningMaterialCreateFooter";
import ChangePasswordModal from "~/components/Student/Profile/ChangePasswordModal";
import apiClient from "~/services/apiService";
import { toast } from "react-toastify";
import styles from "./ManagerAccountSetting.module.scss";
const cx = classNames.bind(styles);
function ManagerAccountSetting() {
  const [profile, setProfile] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [editableProfile, setEditableProfile] = useState({});
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false); // Trạng thái mở modal

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await apiClient.get(`account/getUserById`);
        setProfile(response.data.data);
        setEditableProfile(response.data.data);
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };

    fetchProfile();
  }, []);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleInputChange = (field, value) => {
    setEditableProfile((prev) => ({ ...prev, [field]: value }));
  };

  const handleSaveClick = async () => {
    try {
      const response = await apiClient.put("/account/updateAccount", {
        firstname: editableProfile.firstname,
        lastname: editableProfile.lastname,
        phoneNumber: editableProfile.phonenumber,
      });
      setProfile(editableProfile);
      setIsEditing(false);
      console.log(response);
      if (response.status === 200) {
        toast.success("Update profile successfully.");
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.details.message ||
        "Error creating account. Please try again.";
      toast.error(errorMessage);
    }
  };

  const handlePasswordChange = async (data) => {
    try {
      console.log(data);
      const response = await apiClient.post("/account/changepassword", data);
      if (response.status === 201) {
        toast.success("Update password successfully.");
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.details.message ||
        "Error creating account. Please try again.";
      toast.error(errorMessage);
    }
  };

  return (
    <PageLayout>
      <div className={cx("manager-profile-wrapper")}>
        <div className={cx("manager-profile-container")}>
          <div className={cx("manager-profile-header")}>
            <div className={cx("manager-profile-text")}>Profile</div>
            {isEditing ? (
              <button className={cx("save-button")} onClick={handleSaveClick}>
                Save
              </button>
            ) : (
              <button className={cx("edit-button")} onClick={handleEditClick}>
                Edit
              </button>
            )}
          </div>
          <div className={cx("manager-profile-content")}>
            <div className={cx("profile-info")}>
              <div className={cx("profile-avatar")}>
                <img
                  className={cx("profile-avatar-img")}
                  src={profile.profilepictureurl}
                  alt="Avatar"
                />
              </div>
              <div className={cx("profile-basic")}>
                <div className={cx("profile-username")}>{profile.username}</div>
                <div className={cx("profile-email")}>{profile.email}</div>
              </div>
            </div>
            {/* Input Fields */}
            <div className={cx("profile-form")}>
              <div className={cx("form-group")}>
                <div className={cx("form-label")}>First Name</div>
                <input
                  type="text"
                  className={cx("form-input")}
                  value={editableProfile.firstname || ""}
                  readOnly={!isEditing}
                  onChange={(e) =>
                    handleInputChange("firstname", e.target.value)
                  }
                />
              </div>
              <div className={cx("form-group")}>
                <div className={cx("form-label")}>Last Name</div>
                <input
                  type="text"
                  className={cx("form-input")}
                  value={editableProfile.lastname || ""}
                  readOnly={!isEditing}
                  onChange={(e) =>
                    handleInputChange("lastname", e.target.value)
                  }
                />
              </div>
              <div className={cx("form-group")}>
                <div className={cx("form-label")}>Gender</div>
                <input
                  type="text"
                  className={cx("form-input")}
                  value={profile.gender ? "Male" : "Female"}
                  readOnly
                />
              </div>
              <div className={cx("form-group")}>
                <div className={cx("form-label")}>Date Of Birth</div>
                <input
                  type="text"
                  className={cx("form-input")}
                  value={profile.dateofbirth || ""}
                  readOnly
                />
              </div>
              <div className={cx("form-group")}>
                <div className={cx("form-label")}>Phone Number</div>
                <input
                  type="text"
                  className={cx("form-input")}
                  value={editableProfile.phonenumber || ""}
                  readOnly={!isEditing}
                  onChange={(e) =>
                    handleInputChange("phonenumber", e.target.value)
                  }
                />
              </div>
              <div className={cx("form-group")}>
                <div className={cx("form-label")}>Role</div>
                <input
                  type="text"
                  className={cx("form-input")}
                  value={profile.role || ""}
                  readOnly
                />
              </div>
            </div>
            <div className={cx("change-password-section")}>
              <div
                className={cx("change-password-button")}
                onClick={() => setIsPasswordModalOpen(true)}
              >
                Change password
              </div>
            </div>
          </div>
        </div>
      </div>
      <LearningMaterialCreateFooter />
      <ChangePasswordModal
        isOpen={isPasswordModalOpen}
        onClose={() => setIsPasswordModalOpen(false)}
        onSubmit={handlePasswordChange}
      />
    </PageLayout>
  );
}

export default ManagerAccountSetting;
