import React, { useRef, useState, useEffect } from "react";
import { useValue } from "../../stateManagement/context/ContextProvider";
import {
  DialogContent,
  DialogContentText,
  IconButton,
  TextField,
  DialogActions,
  Button,
  DialogTitle,
} from "@mui/material";
import Password from "./PasswordField";
import GoogleLogin from "./GoogleLogin";
import { registerUser, loginUser } from "../../actions/api";
import { Close, Send } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import {closeLogin, setLogin } from '../../state';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const Form = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [title, setTitle] = useState("Login");
  const { state: { openLogin, currentUser }, dispatch } = useValue(); 
  console.log("Dispatch:", dispatch);
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const phoneRef = useRef();
  const confirmPasswordRef = useRef();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const dispatched = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.user);

  // Use useEffect to change the title of the dialog
  useEffect(() => {
    setTitle(isRegister ? "Register" : "Login");
  }, [isRegister]);

  // Listen for changes in the currentUser state
  // useEffect(() => {
  //   // Check if the user is logged in and tohen exists
  //   const token = localStorage.getItem("token");
  //   if (token && user) {
  //     dispatched({user: user, token: token})
  //   }
  // }, [dispatched, user]);

  const handleRegister = async () => {
    const name = nameRef.current.value;
    const email = emailRef.current.value;
    const password = passwordRef.current?.value;
    const phone = phoneRef.current.value;
    const confirmPassword = confirmPasswordRef.current?.value;

    const userData = { name, email, password, phone, confirmPassword };

    try {
      setIsSubmitting(true);
      dispatch({ type: "START_LOADING" });

      const response = await registerUser(userData);

      if (response && response.success) {
        dispatch({ type: "UPDATE_USER", payload: { user: response.result } });
        dispatch({ type: "CLOSE_LOGIN" });

        toast.success("Registered Successfully", { position: toast.POSITION.TOP_CENTER });
      } else {
        throw new Error(response ? response.message : "Registration failed");
      }
    } catch (error) {
      toast.error(error.message, { position: toast.POSITION.TOP_CENTER });
      console.error(error);
    } finally {
      setIsSubmitting(false);
      dispatch({ type: "STOP_LOADING" });
    }

    // Clear the form
    nameRef.current.value = "";
    emailRef.current.value = "";
    passwordRef.current.value = "";
    phoneRef.current.value = "";
    confirmPasswordRef.current.value = "";
  };

  const handleLogin = async () => {
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const userData = { email, password };
    try {
      setIsSubmitting(true);
      dispatch({ type: "START_LOADING" });

      const response = await loginUser(userData);
      // dispatch({ type: "UPDATE_USER", payload: { user: response } });
      if (response && response.success) {
        console.log("Another response message: ", response);
        dispatched(setLogin(response));
        // dispatch({ type: "UPDATE_USER", payload: { user: response } });
        // if (response) {
        //   dispatched({
        //     type: "LOGIN_SUCCESS",
        //     payload: { user: response.user, token: response.token}
        //   })
        // }
        dispatch({ type: "CLOSE_LOGIN" });

        toast.success("Logged in Successfully", { position: toast.POSITION.TOP_CENTER });
        navigate('/home')
      } else {
        throw new Error(response ? response.message : "Login failed");
      }
    } catch (error) {
      toast.error(error.message, { position: toast.POSITION.TOP_CENTER });
      console.error(error);
    } finally {
      setIsSubmitting(false);
      dispatch({ type: "STOP_LOADING" });
    }

    // Clear the form
    emailRef.current.value = "";
    passwordRef.current.value = "";
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isRegister) {
      handleRegister();
    } else {
      handleLogin();
    }
  };

  const handleCloseLogin = () => {
    dispatched(closeLogin())
    console.log("Close button clicked")
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <DialogTitle id="alert-dialog-title">
          {title}
          <IconButton
            sx={{ position: "absolute", right: 8, top: 8, color: "grey" }}
            onClick={handleCloseLogin}
          >
            <Close />
          </IconButton>
        </DialogTitle>

        <DialogContent dividers>
          <DialogContentText>Please Fill Out the Form</DialogContentText>
          {isRegister && (
            <>
              <TextField
                autoFocus
                margin="dense"
                variant="standard"
                id="name"
                label="Name"
                type="text"
                fullWidth
                inputRef={nameRef}
                inputProps={{ minLength: 3, maxLength: 50 }}
                required
              />

              <TextField
                autoFocus
                margin="dense"
                variant="standard"
                id="phone"
                label="Phone Number"
                type="tel"
                fullWidth
                inputRef={phoneRef}
                inputProps={{ minLength: 11, maxLength: 13 }}
                required
              />
            </>
          )}
          {/* For login and signup */}
          <TextField
            autoFocus={!isRegister}
            margin="dense"
            variant="standard"
            id="email"
            label="Email Address"
            type="text"
            fullWidth
            inputRef={emailRef}
            inputProps={{ minLength: 3, maxLength: 50 }}
            required
          />

          <Password {...{ passwordRef }} />
          {isRegister && (
            <Password
              {...{ confirmPasswordRef, id: "confirmPassword", label: "Confirm Password" }}
            />
          )}
        </DialogContent>
        <DialogActions>
          <Button
            type="submit"
            color="primary"
            variant="contained"
            endIcon={<Send />}
            disabled={isSubmitting}
          >
            Submit
          </Button>
        </DialogActions>
      </form>
      <DialogActions
        sx={{ justifyContent: "center", padding: "0 24px", margin: "0 -24px" }}
      >
        {isRegister
          ? "Do you have an account? Sign in now"
          : "Don't have an account? Create one now"}
        <Button onClick={() => setIsRegister(!isRegister)} color="primary" variant="text">
          {isRegister ? "Sign in" : "Register"}
        </Button>
      </DialogActions>
      <DialogActions sx={{ justifyContent: "center", py: "24" }}>
        <GoogleLogin />
      </DialogActions>
    </div>
  );
};

export default Form;
