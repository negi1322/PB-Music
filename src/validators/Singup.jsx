import { useState } from "react";
import { LOGO, SINGUPBG } from "../../public/Images";
import { Link, useNavigate } from "react-router-dom";
import { add_user } from "../api/UserAction";
import SmallLoader from "../components/Common/SmallLoader";

const Signup = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [name, setname] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [showLoadersow, setshowLoaderShow] = useState(false);
  const createAccount = async (e) => {
    e.preventDefault();
    setshowLoaderShow(true);
    try {
      const res = await add_user(name, email, password);
      if (res.success) {
        navigate("/");
      }
    } catch (err) {
    } finally {
      setshowLoaderShow(false);
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
            <p className="text-white fs-5 mb-0">Create your account</p>
          </div>

          <div className="form-content">
            <form className="d-flex flex-column gap-3">
              <div className="d-flex flex-column gap-1">
                <label htmlFor="name" className="signup-label">
                  Name
                </label>
                <input
                  onChange={(e) => setname(e?.target?.value)}
                  placeholder="Enter your name"
                  type="text"
                  className="signup-input border-0"
                />
              </div>
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
                {showLoadersow ? (
                  <SmallLoader />
                ) : (
                  <button onClick={createAccount} className="signin-btn">
                    Create account
                  </button>
                )}
              </div>
            </form>

            <div className="d-flex justify-content-center align-items-center gap-4 py-2">
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
                  onClick={() => navigate("/login")}
                  className="text-center link-danger ms-3 pointer "
                >
                  Sign in
                </span>
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
export default Signup;
