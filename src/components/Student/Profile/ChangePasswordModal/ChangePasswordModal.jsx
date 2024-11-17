import { useState } from "react";
import classNames from "classnames/bind";
import styles from "./ChangePasswordModal.module.scss";
const cx = classNames.bind(styles);

function ChangePasswordModal({ isOpen, onClose, onSubmit }) {
  const [currentPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = () => {
    if (newPassword !== confirmPassword) {
      alert("New password and confirm password do not match!");
      return;
    }
    onSubmit({ currentPassword, newPassword });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className={cx("modal-overlay")}>
      <div className={cx("modal-content")}>
        <h2 className={cx("modal-title")}>Change Password</h2>
        <div className={cx("form-group")}>
          <label htmlFor="old-password" className={cx("form-label")}>
            Old Password
          </label>
          <input
            type="password"
            id="old-password"
            className={cx("form-input")}
            value={currentPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            placeholder="Enter old password"
          />
        </div>
        <div className={cx("form-group")}>
          <label htmlFor="new-password" className={cx("form-label")}>
            New Password
          </label>
          <input
            type="password"
            id="new-password"
            className={cx("form-input")}
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="Enter new password"
          />
        </div>
        <div className={cx("form-group")}>
          <label htmlFor="confirm-password" className={cx("form-label")}>
            Confirm Password
          </label>
          <input
            type="password"
            id="confirm-password"
            className={cx("form-input")}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm new password"
          />
        </div>
        <div className={cx("modal-actions")}>
          <button className={cx("cancel-button")} onClick={onClose}>
            Cancel
          </button>
          <button className={cx("submit-button")} onClick={handleSubmit}>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}

export default ChangePasswordModal;
