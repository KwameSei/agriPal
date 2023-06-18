import jwtDecode from "jwt-decode";
import { setLogout } from "../state"

export const checkAuthState = (token) => {
  return (dispatch) => {
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        if (decodedToken.exp * 1000 < Date.now()) {
          dispatch(setLogout());
        }
      } catch (error) {
        console.log("Error decoding token:", error);
        dispatch(setLogout());
      }
    }
  };
};