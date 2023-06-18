import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import jwtDecode from "jwt-decode";
import { setLogout } from "../state";

const UserTokenCheck = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    const checkToken = async () => {
      if (user && user.token) {
        try {
          const decodedToken = jwtDecode(user.token);
          if (decodedToken.exp * 1000 < Date.now()) {
            dispatch(setLogout());
          }
        } catch (error) {
          console.log("Error decoding token:", error);
          dispatch(setLogout());
        }
      }
    };

    checkToken()
      .then(() => {})
      .catch((error) => {
        console.log("Error checking token:", error);
        dispatch(setLogout());
      });
  }, [user, dispatch]);

  return null;
};

export default UserTokenCheck;
