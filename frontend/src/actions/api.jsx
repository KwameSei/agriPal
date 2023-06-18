import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {v4 as uuidv4} from "uuid";
import { uploadImage } from ".././firebase/uploadFile";

const BASE_URL = import.meta.env.VITE_APP_SERVER_URL + "/api/auth";

const handleRequest = async (url, method, body) => {
  const token = localStorage.getItem("token");
  console.log("API token:", token);
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
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        data = await response.json();
      } else {
        data = await response.text();
      }
      console.log("Data:", data);
    } catch (parseError) {
      throw new Error("Invalid response from the server");
    }

    if (!response.ok) {
      const errorData = data || { message: "Request failed" };
      throw new Error(errorData.message);
    }

    return data;
  } catch (error) {
    toast.error(error.message, { position: "top-center" });
    if (error instanceof TypeError) {
      // Network error
      toast.error("Network error. Please check your internet connection.");
    } else {
      toast.error("An error occurred. Please try again later.");
    }
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
    console.log("User Data:", userData);
    const response = await handleRequest("/login", "POST", userData);
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const updatedProfile = async(currentUser, updatedFields, dispatch) => {
  dispatch({ type: "START_LOADING" });

  const {name, phone, city, district, address, file} = updatedFields;
  let body = {name, phone, city, district, address};
  try {
    if (file) {
      const imageName = uuidv4() + '.' + file?.name.split('.')?.pop();  // generate unique image name
      const photoURL = await uploadImage(file, `profile/${currentUser.id}/${imageName}`);  // upload image to firebase storage
      body = {...body, photoURL};
    }
    const response = await handleRequest("/profile", "PUT", body, currentUser.token, dispatch);
    if (response && response.success) {
      dispatch({ type: "UPDATE_USER", payload: {...currentUser, ...response}});
      toast.success("Profile updated successfully", { position: "top-center" });
      dispatch({ type: "UPDATE_PROFILE", payload: {open: false, file: null, photoURL: response.photoURL} });
    }
  } catch (error) {
    console.log(error);
    toast.error(error.message, { position: "top-center" });
  }

  dispatch({ type: "STOP_LOADING" });
};
