import { GoogleLogin } from "@react-oauth/google";
import classNames from "classnames/bind";
import { jwtDecode } from "jwt-decode";
import PropTypes from "prop-types";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "~/components/General/Loader";
import { AuthContext } from "~/contexts/AuthContext";
import Logo from "../../../assets/images/logo/LOGO-06.png";
import styles from "./Login.module.scss";
const cx = classNames.bind(styles);
function Login({ setShowLogin }) {
  const { login, googleLogin } = useContext(AuthContext);
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    try {
      setLoading(true);
      const user = await login({ username, password });
      if (!user.isTrialExam && user.role === "Student") {
        setLoading(false);
        setShowLogin(false);
        navigate("/trial-exam");
        return;
      }

      setLoading(false);
      setShowLogin(false);
      switch (user.role) {
        case "Admin":
          navigate("/admin/account/manage");
          break;
        case "Manager":
          navigate("/manager");
          break;
        case "Staff":
          navigate("/staff");
          break;
        case "Teacher":
          navigate("/teacher");
          break;
        case "Student":
          navigate("/learning");
          break;
        default:
          break;
      }
      toast.success("Login successfully!", {
        autoClose: 1000
      })
    } catch (error) {
      console.error("Login failed!", error.response?.data?.details);
      setLoading(false);
      toast.error(
        error.response?.data?.details || "Login failed. Please try again.",
        {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        }
      );
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleLogin();
    }
  };

  const handleGoogleLoginSuccess = async (credentialResponse) => {
    setLoading(true);
    try {
      const decodedToken = jwtDecode(credentialResponse.credential);
      const user = await googleLogin(decodedToken);
      if (!user.isTrialExam && user.role === "Student") {
        setLoading(false);
        setShowLogin(false);
        navigate("/trial-exam");
        return;
      }

      setLoading(false);
      setShowLogin(false);
      switch (user.role) {
        case "Admin":
          navigate("/admin/account/manage");
          break;
        case "Manager":
          navigate("/manager");
          break;
        case "Staff":
          navigate("/staff");
          break;
        case "Teacher":
          navigate("/teacher");
          break;
        case "Student":
          navigate("/learning");
          break;
        default:
          break;
      }

      toast.success("Login successfully!", {
        autoClose: 1000
      })
    } catch (error) {
      console.error("Google login failed!", error);
      toast.error(error.response?.data?.details || "Google login failed. Please try again.", {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } finally {
      setLoading(false)
    }
  };

  const handleGoogleLoginError = () => {
    toast.error("Google login failed. Please try again.", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };


  return (
    <>
      {loading && <Loader />}
      <div className={cx("login-wrapper")}>
        <div className={cx("login-container")}>
          <div className={cx("close")}>
            <div
              className={cx("close-btn")}
              onClick={() => setShowLogin(false)}
            >
              <i className={cx("fa-solid fa-xmark", "icon")}></i>
            </div>
          </div>
          <div className={cx("logo")}>
            <img src={Logo} alt="logo-img" className={cx("logo-image")} />
          </div>
          <div className={cx("welcome")}>
            <div className={cx("text")}>Welcome to VSAT Center</div>
          </div>
          <div className={cx("form-login-wrapper")}>
            <div className={cx("form-login-container")}>
              <div className={cx("form-content")}>
                <div className={cx("email")}>
                  <div className={cx("email-text")}>Email</div>
                  <div className={cx("email-input")}>
                    <input
                      type="text"
                      placeholder="Email"
                      spellCheck={false}
                      autoFocus={true}
                      className={cx("input")}
                      onChange={(e) => setUsername(e.target.value.trim())}
                    />
                  </div>
                </div>
                <div className={cx("password")}>
                  <div className={cx("password-text")}>Password</div>
                  <div className={cx("password-input")}>
                    <input
                      type="password"
                      placeholder="Password"
                      spellCheck={false}
                      className={cx("input")}
                      onChange={(e) => setPassword(e.target.value.trim())}
                      onKeyDown={handleKeyDown}
                    />
                  </div>
                </div>
                <div className={cx("login-btn")}>
                  <button className={cx("btn", { diasbled: !username.trim() || !password.trim() })} disabled={!username.trim() || !password.trim()} onClick={handleLogin}>
                    Sign in
                  </button>
                </div>
                <div className={cx("login-google-btn")}>
                  <GoogleLogin
                    onSuccess={handleGoogleLoginSuccess}
                    onError={handleGoogleLoginError}
                  />
                </div>
              </div>
              <div className={cx("or")}>
                <span></span>Support team<span></span>
              </div>
              <div className={cx("information")}>
                <div className={cx("text")}>
                  By continuing, you agree to Vsat.{" "}
                  <span className={cx("mark")}>Terms of Service</span> and
                  acknowledge you have read our.{" "}
                  <span className={cx("mark")}>Privacy Policy</span> and{" "}
                  <span className={cx("mark")}>Notice at collection</span>.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

Login.propTypes = {
  setShowLogin: PropTypes.func,
};

export default Login;
