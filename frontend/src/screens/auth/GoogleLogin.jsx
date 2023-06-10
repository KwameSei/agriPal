import { Google } from "@mui/icons-material";
import { Button } from "@mui/material";
import React, { useState } from "react";
import jwtDecode from "jwt-decode";
import { useValue} from "../../stateManagement/context/ContextProvider"

const GoogleLogin = () => {
  const {dispatch} = useValue()
  const [disabled, setDisabled] = useState(false);

  const handleCredentialResponse = (response) => {
    console.log(response);
    // if (response.credential) {
    const token = response.credential;
    const decodedToken = jwtDecode(token);
    const {sub:id, email, name, picture:imgURL} = decodedToken;
    dispatch({type: "UPDATE_USER", payload: {id, email, name, token, imgURL, google: true}})
    dispatch({type: "CLOSE_LOGIN"})
    //   const googleUser = response;
    //   const profile = googleUser.getBasicProfile();
    //   const googleData = {
    //     id: profile.getId(),
    //     name: profile.getName(),
    //     email: profile.getEmail(),
    //     image: profile.getImageUrl(),
    //     token: id_token,
    //   };
    //   console.log(googleData);
    // }
  };

  const handleGoogleLogin = () => {
    setDisabled(true);

    try {
      window.google.accounts.id.initialize({
        client_id: import.meta.env.VITE_APP_GOOGLE_CLIENT_ID,
        callback: handleCredentialResponse,
        auto_select: false,
      })
      window.google.accounts.id.prompt((notify) => {
        if (notify.isNotDisplayed()) {
          throw new Error("Error in displaying Google Login");
        }
        if (notify.isSkippedMoment() || notify.isDismissedMoment()) {
          setDisabled(false);
        };
      })
    } catch (error) {
      dispatch({type: "UPDATE_NOTIFICATIONS", payload:{open: true, severity: "error", message: error.message}})
      console.log(error);
    }
  };

  return (
    <div className="google-login">
      <Button
        variant="contained"
        color="primary"
        fullWidth startIcon={<Google />}
        disabled={disabled}
        onClick={handleGoogleLogin}
        >
        Login with Google
      </Button>
    </div>
  )
};

export default GoogleLogin;