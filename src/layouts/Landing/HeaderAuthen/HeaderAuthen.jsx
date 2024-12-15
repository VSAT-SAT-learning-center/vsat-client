import classNames from "classnames/bind";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { io } from "socket.io-client";
import Logo from "~/assets/images/logo/LOGO-06.png";
import HeaderNotification from "~/components/General/HeaderNotification";
import HeaderUserProfile from "~/components/General/HeaderUserProfile";
import { AuthContext } from "~/contexts/AuthContext";
import apiClient from "~/services/apiService";
import TokenService from "~/services/tokenService";
import AccountOptions from "./AccountOptions";
import styles from "./HeaderAuthen.module.scss";
import Notifications from "./Notifications";
const cx = classNames.bind(styles);
function HeaderAuthen() {
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
        id: notification.data.id,
        type: notification.type,
        eventType: notification.eventType,
        message: notification.data.message,
        accountFrom: notification.data.accountFrom,
        createdAt: notification.data.createdAt,
        isRead: false,
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
      <div className={cx("header-authen-wrapper")}>
        <div className={cx("header-authen-container")}>
          <Link to="/" className={cx("header-authen-logo")}>
            <img src={Logo} alt="main-logo" className={cx("logo")} />
          </Link>
          <div className={cx("header-authen-option")}>
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

export default HeaderAuthen;
