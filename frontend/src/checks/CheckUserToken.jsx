import React, { useEffect } from "react";
import { useValue } from "../stateManagement/context/ContextProvider";
import jwtDecode from "jwt-decode";

const UserTokenCheck = () => {
  const {state: {currentUser}, dispatch} = useValue()

  useEffect(() => {
    const checkToken = async () => {
      if (currentUser) {
        const decodedToken = jwtDecode(currentUser.token);
        if (decodedToken.exp * 1000 < Date.now()) {
          dispatch({ type: "UPDATE_USER", payload: null });
        }
      }
    };
    checkToken();
  }, []);
};

export default UserTokenCheck;