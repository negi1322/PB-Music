import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { update_user_detail, user_detail } from "../../api/UserAction";
import { useFormik } from "formik";
import { data, useNavigate } from "react-router-dom";
import { Logout } from "../../utils/auth";

const Profile = ({ closeProfile }) => {
  const fileInputRef = useRef(null);
  const [userData, setUser] = useState();
  const navigate = useNavigate();
  useEffect(() => {
    get_userDetail();
  }, []);

  const get_userDetail = async () => {
    const res = await user_detail();
    setUser(res?.data);
  };

  const profileFormik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: userData?.name || "",
      email: userData?.email || "",
      surname: userData?.surname || "",
      contact: userData?.contact || "",
    },
    onSubmit: async (values) => {
      const res = await update_user_detail(values);
      if (res?.success) {
        await get_userDetail();
      }
    },
  });

  return (
    <>
      <form onSubmit={profileFormik?.handleSubmit}>
        <motion.div className="profile-card">
          <div className="card-header-row">
            <div className="avatar-wrap">
              <img
                src="https://i.pravatar.cc/150?img=47"
                alt="Amélie Laurent"
              />
              <div className="badge-verified">
                <i className="bi bi-check"></i>
              </div>
            </div>
            <div className="header-actions">
              <button
                type="button"
                onClick={() => Logout(navigate)}
                className="btn-outline-secondary-sm pointer"
              >
                <i className="bi bi-link-45deg"></i> Log out
              </button>
              <button
                type="button"
                onClick={closeProfile}
                className="btn-outline-secondary-sm pointer z-3"
              >
                Close profile
              </button>
            </div>
          </div>

          <h2 className="user-name text-white text-capitalize">
            {userData?.name}
          </h2>
          <p className="user-email-sub text-white">{userData?.email}</p>

          <div className="field-row">
            <span className="field-label text-white">Name</span>
            <div className="field-inputs">
              <input
                type="text"
                name="name"
                className="form-control-custom text-capitalize"
                onChange={profileFormik?.handleChange}
                value={profileFormik?.values?.name}
              />
              <input
                className="form-control-custom"
                type="text"
                name="surname"
                onChange={profileFormik?.handleChange}
                value={profileFormik?.values?.surname}
              />
            </div>
          </div>

          <div className="field-row">
            <span className="field-label text-white">Email address</span>
            <div className="input-icon-wrap">
              <i className="bi bi-envelope"></i>
              <input
                className="form-control-custom w-100"
                type="email"
                name="email"
                disabled
                onChange={profileFormik?.handleChange}
                value={profileFormik?.values?.email}
              />
            </div>
          </div>
          <div className="field-row">
            <span className="field-label text-white">Contact</span>
            <div className="username-group">
              <input
                className="username-input"
                type="number"
                name="contact"
                onChange={profileFormik?.handleChange}
                value={profileFormik?.values?.contact}
              />
            </div>
          </div>
          <div className="field-row">
            <span className="field-label text-white">Profile photo</span>
            <div className="photo-wrap">
              <img
                className="photo-thumb"
                src="https://i.pravatar.cc/150?img=47"
                alt="thumb"
              />
              <input
                type="file"
                ref={fileInputRef}
                className="visually-hidden"
              />
              <button
                type="button"
                onClick={() => fileInputRef.current.click()}
                className="btn-replace"
              >
                Click to replace
              </button>
            </div>
          </div>
          <hr className="divider" />
          <div className="card-footer-row">
            <button type="button" className="btn-delete">
              <i className="bi bi-trash3"></i> Delete user
            </button>
            <div className="footer-right">
              <button type="button" className="btn-cancel">
                Cancel
              </button>
              <button type="submit" className="btn-save">
                Save changes
              </button>
            </div>
          </div>
        </motion.div>
      </form>
    </>
  );
};
export default Profile;
