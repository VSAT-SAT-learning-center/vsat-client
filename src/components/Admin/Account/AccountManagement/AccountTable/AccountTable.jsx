import { PlusCircleOutlined } from "@ant-design/icons";
import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import Modal from "react-modal";
import { toast } from "react-toastify";
import CreateAccount from "../../../../../components/Admin/Account/CreateAccount";
import apiClient from "~/services/apiService";
import styles from "./AccountTable.module.scss";

const cx = classNames.bind(styles);

Modal.setAppElement("#root");

function AccountTable() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [pageSize] = useState(6);
  const [searchName, setSearchName] = useState("");

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    fetchData(currentPage, searchName);
  };

  const fetchData = (page, name = "") => {
    apiClient.get("http://localhost:5000/account/search", {
        params: {
          page,
          pageSize,
          name,
          sortOrder: "DESC",
        },
      })
      .then((response) => {
        const { data, totalPages, currentPage } = response.data.data;
        setUsers(data);
        setTotalPages(totalPages);
        setCurrentPage(currentPage);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  const updateStatus = async (id, currentStatus) => {
    const newStatus = currentStatus === "Active" ? "Banned" : "Active";
    try {
      await apiClient.put(`http://localhost:5000/account/update-status/${id}`, {
        status: newStatus,
      });
      fetchData(currentPage, searchName);
    } catch (error) {
      toast.error("Error updating status:", error);
    }
  };

  const handleSearch = () => {
    fetchData(1, searchName);
  };

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      fetchData(newPage, searchName);
    }
  };

  useEffect(() => {
    fetchData(currentPage, searchName);
  }, [currentPage]);

  return (
    <div className={cx("table-wrapper")}>
      <div className={cx("table-container")}>
        <div className={cx("header-container")}>
          <div className={cx("header-actions")}>
            <div className={cx("header-actions-search")}>
            <input
              className={cx("search-input")}
              placeholder="Search by name"
              value={searchName}
              onChange={(e) => setSearchName(e.target.value)}
            />
            <button className={cx("filter-btn")} onClick={handleSearch}>
              Search
            </button>
            </div>
            <button className={cx("add-user-btn")} onClick={openModal}>
              <PlusCircleOutlined style={{ marginRight: "5px" }} /> Add User
            </button>
          </div>
        </div>
        <div className={cx("user-table-container")}>
          <table className={cx("user-table")}>
            <thead>
              <tr>
                <th>Full Name</th>
                <th>Email</th>
                <th>Date of Birth</th>
                <th>Phone number</th>
                <th>Gender</th>
                <th>Role Name</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>
                    {user.firstname} {user.lastname}
                  </td>
                  <td>{user.email}</td>
                  <td>{user.dateofbirth}</td>
                  <td>{user.phonenumber}</td>
                  <td className={cx("gender-cell")}>
                    {user.gender === true ? "👨" : "👩"}
                  </td>
                  <td>{user.role?.rolename || "N/A"}</td>
                  <td className={cx("status-cell")}>
                    <div
                      className={cx("status-toggle")}
                      onClick={
                        user.status !== "Inactive"
                          ? () => updateStatus(user.id, user.status)
                          : null
                      }
                      style={{
                        cursor:
                          user.status !== "Inactive"
                            ? "pointer"
                            : "not-allowed",
                        opacity: user.status === "Inactive" ? 0.5 : 1,
                      }}
                    >
                      {user.status === "Active" ? (
                        <div className={cx("toggle-switch", "active")}>
                          <div className={cx("toggle-circle")}></div>
                        </div>
                      ) : user.status === "Inactive" ? (
                        <div className={cx("toggle-switch", "inactive")}>
                          <div className={cx("toggle-circle")}></div>
                        </div>
                      ) : (
                        <div className={cx("toggle-switch", "ban")}>
                          <div className={cx("toggle-circle")}></div>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className={cx("paging-container")}>
          <div className={cx("pagination")}>
            <button onClick={() => handlePageChange(currentPage - 1)}>«</button>
            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index + 1}
                onClick={() => handlePageChange(index + 1)}
                className={currentPage === index + 1 ? cx("active") : ""}
              >
                {index + 1}
              </button>
            ))}
            <button onClick={() => handlePageChange(currentPage + 1)}>»</button>
          </div>
        </div>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          className={cx("modal")}
          overlayClassName={cx("modal-overlay")}
        >
          <CreateAccount
            closeModal={closeModal}
            fetchData={fetchData}
            currentPage={currentPage}
          />
        </Modal>
      </div>
    </div>
  );
}

export default AccountTable;
