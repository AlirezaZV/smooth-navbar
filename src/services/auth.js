import api from "./api"; // Your Axios instance

// 🔐 Login and return token
export const loginUser = async ({ username, password }) => {
  const response = await api.post("/login", { username, password });
  const { accessToken } = response.data;
  if (accessToken) {
    localStorage.setItem("token", accessToken);
    return accessToken;
  } else {
    throw new Error("Login failed");
  }
};

// 🚪 Logout user
export const logoutUser = () => {
  localStorage.removeItem("token");
};

// ✅ Check if token exists
export const isLoggedIn = () => {
  return !!localStorage.getItem("token");
};

// 🧠 (Optional) Decode user from token
export const getUserFromToken = () => {
  const token = localStorage.getItem("token");
  if (!token) return null;
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch {
    return null;
  }
};
