import classNames from "classnames/bind";
import { useState } from "react"; 
import Modal from 'react-modal';
import styles from "./AccountTable.module.scss";
import CreateAccount from "../../../../../components/Admin/Account/CreateAccount";

const cx = classNames.bind(styles);

const users = [
  {
    id: 245,
    name: "Anh Nguyễn Nghị",
    email: "vi.vy@hotmail.com",
    dob: "22/04/2000",
    gender: "male",
    type: "Admin",
  },
  {
    id: 245,
    name: "Anh Nguyễn Nghị",
    email: "vi.vy@hotmail.com",
    dob: "22/04/2000",
    gender: "male",
    type: "Admin",
  },
  {
    id: 245,
    name: "Anh Nguyễn Nghị",
    email: "vi.vy@hotmail.com",
    dob: "22/04/2000",
    gender: "female",
    type: "Admin",
  },
  {
    id: 245,
    name: "Anh Nguyễn Nghị",
    email: "vi.vy@hotmail.com",
    dob: "22/04/2000",
    gender: "female",
    type: "Student",
  },
  {
    id: 245,
    name: "Anh Nguyễn Nghị",
    email: "vi.vy@hotmail.com",
    dob: "22/04/2000",
    gender: "male",
    type: "Teacher",
  },
  {
    id: 245,
    name: "Anh Nguyễn Nghị",
    email: "vi.vy@hotmail.com",
    dob: "22/04/2000",
    gender: "male",
    type: "Admin",
  },
];
Modal.setAppElement('#root'); // Thiết lập vùng mà modal sẽ được áp dụng

function AccountTable() {
  const [modalIsOpen, setModalIsOpen] = useState(false); // Trạng thái mở/đóng popup

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <div className={cx("table-container")}>
      <div className={cx("header-container")}>
        <div className={cx("header-title")}>User Management</div>
        <div className={cx("header-actions")}>
          <input className={cx("search-input")} placeholder="Search by..." />
          <button className={cx("filter-btn")}>Filter</button>
          <button className={cx("add-user-btn")} onClick={openModal}>
            + Add User
          </button>
        </div>
      </div>

      <table className={cx("user-table")}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Full Name</th>
            <th>Email</th>
            <th>Date of Birth</th>
            <th>Gender</th>
            <th>Type</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.dob}</td>
              <td className={cx("gender-cell")}>
                {user.gender === "male" ? "👨" : "👩"}
              </td>
              <td>
                <span
                  className={cx(
                    user.type === "Admin" ? "admin-badge" : "trainer-badge"
                  )}
                >
                  {user.type}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className={cx("paging-container")}>
        <div className={cx("pagination")}>
          <button>«</button>
          <button>1</button>
          <button>2</button>
          <button>3</button>
          <button>»</button>
        </div>
        <div className={cx("rows-per-page")}>
          Rows per page:
          <select>
            <option value="10">10</option>
            <option value="25">25</option>
            <option value="50">50</option>
          </select>
        </div>
      </div>

      {/* Popup (Modal) */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        className={cx('modal')}
        overlayClassName={cx('modal-overlay')}
      >
        <button className={cx("close-btn")} onClick={closeModal}>
          ×
        </button>
        <CreateAccount /> 
      </Modal>
    </div>
  );
}

export default AccountTable;
