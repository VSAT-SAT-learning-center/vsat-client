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
  const [showAccountSetting, setShowAccountSetting] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [socket, setSocket] = useState(null);
  const [nofiticationsData, setNotificationsData] = useState([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await apiClient.get("/notifications");
        const notifications = response.data.data.map((notification) => ({
          id: notification.id,
          type: notification.type,
          eventType: notification.eventType,
          message: notification.message,
          accountFrom: notification.accountFrom,
          createdAt: notification.createdAt,
          isRead: notification.isRead,
        }));
        setNotificationsData(notifications);
      } catch (error) {
        console.error("Error while fetching notifications:", error);
      }
    };

    fetchNotifications();
  }, []);

  useEffect(() => {
    const socketUrl = import.meta.env.VITE_SOCKET_URL;
    const newSocket = io(socketUrl, {
      query: {
        userId: user?.id,
        token: TokenService.getAccessToken(),
      },
    });

    newSocket.on("feedbackNotification", (notification) => {
      const mapNotification = {
        type: notification.type,
        eventType: notification.eventType,
        message: notification.data.message,
        accountFrom: notification.data.accountFrom,
        createdAt: notification.data.createdAt,
      };
      setNotificationsData((prevNotifications) => [
        mapNotification,
        ...prevNotifications,
      ]);
    });
    setSocket(newSocket);

    return () => {
      newSocket.close();
    };
  }, [user?.id]);

  return (
    <>
      {showAccountSetting && <AccountOptions />}
      {showNotification && (
        <Notifications
          notifications={nofiticationsData}
          setNotifications={setNotificationsData}
          setShowNotification={setShowNotification}
        />
      )}
      <div className={cx("manager-topbar-wrapper")}>
        <div className={cx("manager-topbar-container")}>
          <div className={cx("manager-topbar-left")}></div>
          <div className={cx("manager-topbar-right")}>
            <HeaderNotification
              notifications={nofiticationsData}
              showNotification={showNotification}
              setShowNotification={setShowNotification}
            />
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
