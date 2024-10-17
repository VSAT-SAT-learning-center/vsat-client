import classNames from "classnames/bind";
import styles from "./CreateAccount.module.scss";
const cx = classNames.bind(styles);

function CreateAccount() {
  return (
      <div className={cx("create-account-container")}>
        <div className={cx("modal-header")}>
          <div className={cx("modal-title")}>Add a new user</div>
        </div>
        <div className={cx("form-container")}>
          <div className={cx("form-group")}>
            <label>User type</label>
            <select>
              <option>Select one</option>
              <option>Teacher</option>
              <option>Student</option>
            </select>
          </div>
          <div className={cx("form-group")}>
            <label>Name</label>
            <input type="text" placeholder="Enter name" />
          </div>

          <div className={cx("form-group")}>
            <label>Email address</label>
            <input type="email" placeholder="Enter email address" />
          </div>

          <div className={cx("form-group")}>
            <label>Phone</label>
            <input type="tel" placeholder="Enter phone number" />
          </div>

          <div className={cx("form-group")}>
            <label>Date of birth</label>
            <input type="date" />
          </div>

          <div className={cx("form-group")}>
            <label>Gender</label>
            <div className={cx("radio-group")}>
              <div className={cx("radio-item")}>
                <input type="radio" id="male" name="gender" value="male" />
                <label htmlFor="male">Male</label>
              </div>
              <div className={cx("radio-item")}>
                <input type="radio" id="female" name="gender" value="female" />
                <label htmlFor="female">Female</label>
              </div>
            </div>
          </div>

          <button className={cx("submit-btn")}>Save</button>
        </div>
      </div>
  );
}

export default CreateAccount;
