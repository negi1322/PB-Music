import axios from "axios";
import { toast } from "react-toastify";
const API = import.meta.env.VITE_APP_URL;
const userData = JSON.parse(localStorage.getItem("user"));

export const get_trending = async (category) => {
  const cat = category.toLowerCase();
  try {
    const data = await axios.get(`${API}/trending`, {
      params: { category: cat },
    });
    return data?.data;
  } catch (err) {
    toast.error(err.message);
  }
};

export const get_playlist = async (query) => {
  try {
    const res = await axios.get(`${API}/playlist`, {
      params: {
        query,
      },
    });
    return res?.data;
  } catch (err) {
    toast.error(err?.message);
  }
};
export const add_user = async (name, email, password) => {
  try {
    const response = await axios.post(`${API}/addUser`, {
      name,
      email,
      password,
    });

    toast.success(response?.data?.message || "Account created successfully");
    return { success: true };
  } catch (err) {
    toast.error(err?.response?.data?.message || "Something went wrong");
    return { success: false };
  }
};
export const login_user = async (email, password) => {
  try {
    const response = await axios.post(`${API}/login`, {
      email,
      password,
    });
    toast.success(response?.data?.message || "Login successfully");
    return { success: true, data: response?.data };
  } catch (err) {
    toast.error(err?.response?.data?.message || "Something went wrong");
    return { success: false };
  }
};

export const user_detail = async () => {
  try {
    const response = await axios.get(`${API}/profile`, {
      params: {
        email: userData?.email,
      },
    });
    toast.success(response?.data?.message);
    return { success: true, data: response?.data?.data };
  } catch (err) {
    toast.error(err?.response?.data?.message || "Something went wrong");
    return { success: false };
  }
};

export const update_user_detail = async (payload) => {
  try {
    const response = await axios.put(`${API}/update_profile`, payload);
    toast.success(response?.data?.message);
    return { success: true, data: response?.data?.data };
  } catch (err) {
    toast.error(err?.response?.data?.message || "Something went wrong");
    return { success: false };
  }
};

export const add_user_favourite = async (payload) => {
  try {
    const response = await axios.post(`${API}/addFav`, payload);
    return { success: true, data: response?.data?.data };
  } catch (err) {
    toast.error(err?.response?.data?.message || "Something went wrong");
    return { success: false };
  }
};

export const remove_user_favourite = async (payload) => {
  try {
    const response = await axios.post(`${API}/removeFav`, payload);
    return { success: true, data: response?.data?.data };
  } catch (err) {
    toast.error(err?.response?.data?.message || "Something went wrong");
    return { success: false };
  }
};

export const get_user_favourite = async () => {
  try {
    const response = await axios.get(`${API}/getFav`, {
      params: { email: userData?.email },
    });
    return { success: true, data: response?.data?.data };
  } catch (err) {
    toast.error(err?.response?.data?.message || "Something went wrong");
    return { success: false };
  }
};

export const get_song_album = async (videoIds) => {
  console.log(videoIds);
  try {
    const response = await axios.post(`${API}/get_song`, { videoIds });
    return { success: true, data: response?.data?.data };
  } catch (err) {
    toast.error(err?.response?.data?.message || "Something went wrong");
    return { success: false };
  }
};
