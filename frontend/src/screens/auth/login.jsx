// import { useState } from "react";
// import { Dialog, IconButton , DialogTitle} from "@mui/material";
// import { Close } from "@mui/icons-material";
// import { useSelector, useDispatch } from "react-redux";
import AuthData from "./Form";

const Login = () => {
  // const [title, setTitle] = useState("Login");
  // const [isRegister, setIsRegister] = useState(false);
  // const loginOpen = useSelector((state) => state.loginOpen);
  // const dispatch = useDispatch();

  return (
    <div>
      {/* <Dialog
        open={loginOpen}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth
        maxWidth="sm" // xs, sm, md, lg, xl
      > */}
        <AuthData />
      {/* </Dialog> */}
    </div>
  );
}

export default Login