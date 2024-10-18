import PropTypes from "prop-types";
import classNames from "classnames/bind";
import { useState } from "react";
import styles from "./CreateAccount.module.scss";
import axios from "axios";

const cx = classNames.bind(styles);

function CreateAccount({ closeModal, fetchData, currentPage }) {
  const [formValid, setFormValid] = useState(true);
  const [formData, setFormData] = useState({
    role: "",
    firstname: "",
    lastname: "",
    email: "",
    phonenumber: "",
    dateofbirth: "",
    gender: true,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleGenderChange = (e) => {
    const { value } = e.target;
    setFormData({
      ...formData,
      gender: value === "male" ? true : false,
    });
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    if (!form.checkValidity()) {
      setFormValid(false);
    } else {
      setFormValid(true);

      const formattedDateOfBirth = formatDate(formData.dateofbirth);

      try {
        const response = await axios.post("http://localhost:5000/account", {
          ...formData,
          dateofbirth: formattedDateOfBirth,
        });

        if (response.status === 201) {
          closeModal();
          fetchData(currentPage); 
        }
      } catch (error) {
        console.error("Error creating account:", error.response?.data || error.message);
        alert("Error creating account. Please try again.");
      }
    }
  };

  return (
    <div className={cx("create-account-container")}>
      <form onSubmit={handleSubmit}>
        <div className={cx("modal-header")}>
          <div className={cx("modal-title")}>Add a new user</div>
        </div>
        <div className={cx("form-container")}>
          <div className={cx("form-group")}>
            <label>User type</label>
            <select
              name="role"
              value={formData.role}
              onChange={handleInputChange}
              required
            >
              <option value="">Select one</option>
              <option value="Student">Student</option>
              <option value="Teacher">Teacher</option>
              <option value="Manager">Manager</option>
              <option value="Staff">Staff</option>
            </select>
          </div>
          <div className={cx("name-group")}>
            <div className={cx("form-group-half")}>
              <label>First name</label>
              <input
                type="text"
                name="firstname"
                placeholder="Enter first name"
                value={formData.firstname}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className={cx("form-group-half")}>
              <label>Last name</label>
              <input
                type="text"
                name="lastname"
                placeholder="Enter last name"
                value={formData.lastname}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          <div className={cx("form-group")}>
            <label>Email address</label>
            <input
              type="email"
              name="email"
              placeholder="Enter email address"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className={cx("form-group")}>
            <label>Phone</label>
            <input
              type="tel"
              name="phonenumber"
              placeholder="Enter phone number"
              value={formData.phonenumber}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className={cx("form-group")}>
            <label>Date of birth</label>
            <input
              type="date"
              name="dateofbirth"
              value={formData.dateofbirth}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className={cx("form-group")}>
            <label>Gender</label>
            <div className={cx("radio-group")}>
              <div className={cx("radio-item")}>
                <input
                  type="radio"
                  id="male"
                  name="gender"
                  value="male"
                  checked={formData.gender === true}
                  onChange={handleGenderChange}
                  required
                />
                <label htmlFor="male">Male</label>
              </div>
              <div className={cx("radio-item")}>
                <input
                  type="radio"
                  id="female"
                  name="gender"
                  value="female"
                  checked={formData.gender === false}
                  onChange={handleGenderChange}
                  required
                />
                <label htmlFor="female">Female</label>
              </div>
            </div>
          </div>

          {!formValid && (
            <p className={cx("error-message")}>
              Please fill out all required fields.
            </p>
          )}

          <button className={cx("submit-btn")} type="submit">
            Save
          </button>
        </div>
      </form>
    </div>
  );
}

CreateAccount.propTypes = {
  closeModal: PropTypes.func.isRequired,
  fetchData: PropTypes.func.isRequired,
  currentPage: PropTypes.number.isRequired,
};

export default CreateAccount;
