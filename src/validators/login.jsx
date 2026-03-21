import { Link, useNavigate } from "react-router-dom";
import { LOGO, SINGUPBG } from "../../public/Images";
import { useState } from "react";
import { toast } from "react-toastify";
import { login_user } from "../api/UserAction";
import SmallLoader from "../components/Common/SmallLoader";

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [showLoader, setShowLoader] = useState(false);
  const Login = async (e) => {
    setShowLoader(true);
    e?.preventDefault();
    try {
      const res = await login_user(email, password);
      console.log(res);
      if (res?.success) {
        setShowLoader(false);
        localStorage.setItem("token", res?.data?.token);
        localStorage.setItem("user", JSON.stringify(res?.data?.userDetail));
        navigate("/");
      }
    } catch (err) {
    } finally {
      setShowLoader(false);
    }
  };
  return (
    <>
      <section
        className="singup-bg"
        style={{ backgroundImage: `url(${SINGUPBG})` }}
      >
        <div className="form-container">
          <div className="signup-logo">
            <img src={LOGO} alt="" className="img-fluid" />
          </div>
          <div className="text-center">
            <p className="text-white fs-5 mb-0">Sign in to Music</p>
            <p className="text-secondary fs-6">
              Welcome back! Please enter your details.
            </p>
          </div>

          <div className="form-content">
            <form className="d-flex flex-column gap-3">
              <div className="d-flex flex-column gap-1">
                <label htmlFor="email" className="signup-label">
                  Email
                </label>
                <input
                  onChange={(e) => setEmail(e?.target?.value)}
                  placeholder="Enter your email"
                  type="email"
                  className="signup-input"
                />
              </div>
              <div className="d-flex flex-column gap-1">
                <label htmlFor="password" className="signup-label">
                  Password
                </label>

                <div className="position-relative">
                  <input
                    onChange={(e) => setPassword(e?.target?.value)}
                    id="password"
                    placeholder="Enter your Password"
                    type={showPassword ? "text" : "password"}
                    className="signup-input w-100"
                    style={{ paddingRight: "40px" }}
                  />

                  <i
                    className={`bi ${showPassword ? "bi-eye-slash" : "bi-eye"}`}
                    onClick={() => setShowPassword(!showPassword)}
                    style={{
                      position: "absolute",
                      right: "12px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      cursor: "pointer",
                      color: "#888",
                      fontSize: "18px",
                    }}
                  />
                </div>
              </div>

              <div className="d-flex justify-content-end px-4">
                <Link className="text-center link-danger" href>
                  forget Password?
                </Link>
              </div>
              <div className="d-flex justify-content-center py-3">
                {showLoader ? (
                  <SmallLoader />
                ) : (
                  <button onClick={Login} className="signin-btn">
                    Sign in
                  </button>
                )}
              </div>
            </form>

            <div className="d-flex justify-content-center align-items-center gap-4 py-3">
              <span className="w-25 border border-1"></span>
              <span className="text-light text-capitalize text-nowrap">
                or continue with
              </span>
              <span className="w-25 border border-1"></span>
            </div>

            <div className=" py-4 border-top border-1 border-secondary text-center">
              <p className="mb-0 text-white">
                Don’t have an account?
                <span
                  onClick={() => navigate("/signup")}
                  className="text-center link-danger ms-3 pointer"
                >
                  Sign up
                </span>
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
