import classNames from "classnames/bind";
import PropTypes from "prop-types";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "~/components/General/Loader";
import { AuthContext } from "~/contexts/AuthContext";
import Logo from "../../../assets/images/logo/LOGO-06.png";
import styles from "./Login.module.scss";
const cx = classNames.bind(styles);
function Login({ setShowLogin }) {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    try {
      setLoading(true);
      const decodedUser = await login({ username, password });
      setLoading(false);
      setShowLogin(false);
      switch (decodedUser.role) {
        case "Admin":
          navigate("/admin");
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
      }
    } catch (error) {
      console.error("Login failed!", error);
      setErrorMsg(error.response.data.details);
    }
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
                      onChange={(e) => setUsername(e.target.value)}
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
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                </div>
                {/* Error Message */}
                {errorMsg && (
                  <div className={cx("error-message")}>{errorMsg}</div>
                )}
                {/* Forget password */}
                <div
                  className={cx("login-btn")}
                  style={{ marginTop: errorMsg === "" ? "15px" : "0" }}
                >
                  <button className={cx("btn")} onClick={handleLogin}>
                    Log in
                  </button>
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
