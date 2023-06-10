import React, { useRef, useState, useEffect } from "react";
import { useValue } from "../../stateManagement/context/ContextProvider";
import { DialogContent, DialogContentText, IconButton ,TextField, DialogActions, Button, DialogTitle } from "@mui/material";
import Password from "./PasswordField";
import GoogleLogin from "./GoogleLogin";
import { Close, Send } from "@mui/icons-material";

const Form = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [title, setTitle] = useState("Login");
  const {state: {openLogin}, dispatch} = useValue();
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const otherNamesRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const phoneRef = useRef();

  // Use useEffect to change the title of the dialog
  useEffect(() => {
    if (isRegister) {
      setTitle("Register");
    } else {
      setTitle("Login");
    }
  }, [isRegister]);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleCloseLogin = () => {
    dispatch({ type: "CLOSE_LOGIN" });
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
          <DialogContentText>
            Please Fill Out the Form
          </DialogContentText>
        {isRegister &&
        <>
          <TextField
            autoFocus
            margin="dense"
            variant="standard"
            id="firstName"
            label="First Name"
            type="text"
            fullWidth
            inputRef={firstNameRef}
            inputProps={{ minLength: 3, maxLength: 20 }}
            required
          />

          <TextField
            autoFocus
            margin="dense"
            variant="standard"
            id="lastName"
            label="Last Name"
            type="text"
            fullWidth
            inputRef={lastNameRef}
            inputProps={{ minLength: 3, maxLength: 20 }}
            required
          />

          <TextField
            autoFocus
            margin="dense"
            variant="standard"
            id="otherNames"
            label="Other Names"
            type="text"
            fullWidth
            inputRef={otherNamesRef}
            inputProps={{ minLength: 3, maxLength: 20 }}
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
            inputProps={{ minLength: 11, maxLength: 11 }}
            required
          />
        </>
        }
        {/* For login and signup */}
        <TextField
          autoFocus={!isRegister}
          margin="dense"
          variant="standard"
          id="email"
          label="Email Address"
          type="email"
          fullWidth
          inputRef={emailRef}
          inputProps={{ minLength: 3, maxLength: 20 }}
          required
        />

        <Password {...{passwordRef}} />
        {/* {isRegister &&
          <Password {...{passwordRef, id: 'confirmPassword', label: 'Confirm Password'}} />
        } */}

        {/* <TextField
          autoFocus
          margin="dense"
          variant="standard"
          id="password"
          label="Password"
          type="password"
          fullWidth
          inputRef={passwordRef}
          inputProps={{ minLength: 3, maxLength: 20 }}
          required
        /> */}
      </DialogContent>
      <DialogActions>
        <Button type="submit" color="primary" variant="contained" endIcon={<Send />}>
          Submit
        </Button>
      </DialogActions>
      </form>
      <DialogActions
        sx={{justifyContent: 'center', padding: '0 24px', margin: '0 -24px'}}
      >
        {isRegister ? 'Do you have an account? Sign in now' : 'Don\'t have an account? Create one now'}
        <Button onClick={() => setIsRegister(!isRegister)} color="primary" variant="text">
          {isRegister ? 'Sign in' : 'Register'}
        </Button>
      </DialogActions>
      <DialogActions sx={{ justifyContent: 'center', py: '24'}}>
        <GoogleLogin />
      </DialogActions>
    </div>
  );

};

export default Form;