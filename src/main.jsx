import { createRoot } from "react-dom/client";
import "./App.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { ToastContainer } from "react-toastify";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <App />
    <ToastContainer
      position="top-right"
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop={true}
      closeOnClick
      pauseOnHover
      draggable
      theme="dark"
      toastStyle={{
        background: "linear-gradient(145deg, #1e1e35, #12122a)",
        color: "#fff",
        borderRadius: "16px",
        border: "1px solid rgba(255,255,255,0.1)",
        boxShadow: `
      0 10px 40px rgba(0, 0, 0, 0.6),
      0 2px 8px rgba(0, 0, 0, 0.4),
      inset 0 1px 0 rgba(255, 255, 255, 0.1),
      inset 0 -1px 0 rgba(0, 0, 0, 0.3)
    `,
        backdropFilter: "blur(12px)",
        transform: "perspective(1000px) rotateX(2deg)",
        fontFamily: "'DM Sans', sans-serif",
        fontSize: "14px",
        fontWeight: "500",
        padding: "14px 18px",
      }}
    />
  </BrowserRouter>,
);
