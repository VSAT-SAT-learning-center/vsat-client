import classNames from "classnames/bind";
import { useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
import HeaderNotification from "~/components/General/HeaderNotification";
import HeaderUserProfile from "~/components/General/HeaderUserProfile";
import { AuthContext } from "~/contexts/AuthContext";
import AccountOptions from "~/layouts/Landing/HeaderAuthen/AccountOptions";
import Notifications from "~/layouts/Landing/HeaderAuthen/Notifications";
import apiClient from "~/services/apiService";
import TokenService from "~/services/tokenService";
import styles from "./ManagerTopbar.module.scss";
const cx = classNames.bind(styles);

function ManagerTopbar() {
  const { user } = useContext(AuthContext);
  const [isFocused, setIsFocused] = useState(false);
  const [showAccountSetting, setShowAccountSetting] = useState(false);
  const [showNotification, setShowNotification] = useState(false)
  // eslint-disable-next-line no-unused-vars
  const [socket, setSocket] = useState(null);
  const [nofiticationsData, setNotificationsData] = useState([])
  useEffect(() => {
    const newSocket = io("http://localhost:5001/feedbacks", {
      query: {
        userId: user?.id,
        token: TokenService.getAccessToken(),
      },
    });

    newSocket.on("feedbackNotification", (notification) => {
      const mapNotification = {
        type: notification.eventType,
        message: notification.data.message,
        accountFrom: notification.data.data[0].account,
        createdAt: notification.data.data[0].createdAt,
      }
      setNotificationsData((prevNotifications) => [mapNotification, ...prevNotifications]);
    });
    setSocket(newSocket);

    return () => {
      newSocket.close();
    };
  }, [user?.id]);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await apiClient.get("/notifications")
        const notifications = response.data.data.map(notification => ({
          type: notification.type,
          message: notification.message,
          accountFrom: notification.accountFrom,
          createdAt: notification.createdAt,
        }));

        setNotificationsData(notifications)
      } catch (error) {
        console.error("Error while fetching notifications:", error)
      }
    }

    fetchNotifications()
  })

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };
  return (
    <>
      {showAccountSetting && <AccountOptions />}
      {showNotification && <Notifications notifications={nofiticationsData} />}
      <div className={cx("manager-topbar-wrapper")}>
        <div className={cx("manager-topbar-container")}>
          <div className={cx("manager-topbar-left")}>
            <div
              className={cx("manager-topbar-search", { focused: isFocused })}
            >
              <i
                className={cx(
                  "fa-regular fa-magnifying-glass",
                  "manager-search-icon"
                )}
              ></i>
              <input
                type="text"
                placeholder="Search..."
                className={cx("manager-search-input")}
                onFocus={handleFocus}
                onBlur={handleBlur}
              />
            </div>
          </div>
          <div className={cx("manager-topbar-right")}>
            <HeaderNotification notifications={nofiticationsData} showNotification={showNotification} setShowNotification={setShowNotification} />
            <HeaderUserProfile
              showAccountSetting={showAccountSetting}
              setShowAccountSetting={setShowAccountSetting}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default ManagerTopbar;
