import { useEffect, useState } from "react";
import { Dialog, IconButton , DialogTitle} from "@mui/material";
import { useValue } from "../../stateManagement/context/ContextProvider";
import { Close } from "@mui/icons-material";
import Form from "./AuthForm";

const Login = () => {
  const [title, setTitle] = useState("Login");
  const [isRegister, setIsRegister] = useState(false);
  const {state: {openLogin}, dispatch} = useValue();

  const handleCloseLogin = () => {
    dispatch({ type: "CLOSE_LOGIN" });
  };

  return (
    <div>
      <Dialog
        open={openLogin}
        onClose={handleCloseLogin}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth
        maxWidth="sm" // xs, sm, md, lg, xl
      >
        <Form />
      </Dialog>
    </div>
  );
}

export default Login