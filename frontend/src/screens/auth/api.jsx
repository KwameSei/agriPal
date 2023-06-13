import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const BASE_URL = import.meta.env.VITE_APP_SERVER_URL + "/api/auth";

const handleRequest = async (url, method, body, token = "") => {
  const headers = token
    ? { "Content-Type": "application/json", authorization: `Bearer ${token}` }
    : { "Content-Type": "application/json" };

  const requestOptions = {
    method,
    headers,
    body: body ? JSON.stringify(body) : null,
  };

  try {
    const response = await fetch(`${BASE_URL}${url}`, requestOptions);
    console.log("Response:", response);

    let data;
    try {
      data = await response.json();
      console.log("Data:", data);
    } catch (parseError) {
      throw new Error("Invalid response from the server");
    }

    if (!data.success) {
      if (response.status === 401) {
        throw new Error(data.message);
      }
    }

    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const registerUser = async (userData) => {
  try {
    const response = await handleRequest("/register", "POST", userData);

    if (response && response.success) {
      return response.result;
    } else {
      throw new Error(response ? response.message : "Registration failed");
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const loginUser = async (userData) => {
  try {
    console.log("User Data:", userData)
    const response = await handleRequest("/login", "POST", userData);
    console.log("Response:", response);

    if (response && response.success) {
       console.log("Response:", response);
       return response;
    } else {
      console.log("Response:", response);
      throw new Error(response ? response.message : "Login failed");
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};
