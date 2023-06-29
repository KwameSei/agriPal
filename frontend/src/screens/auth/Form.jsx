import React, { useRef, useState, useEffect } from "react";
// import { useValue } from "../../stateManagement/context/ContextProvider";
import {
  Box,
  DialogContent,
  DialogContentText,
  IconButton,
  TextField,
  DialogActions,
  Button,
  DialogTitle,
  useMediaQuery,
  Typography,
} from "@mui/material";
import Password from "./PasswordField";
import ImageUpload from "../../components/widgets/imageUpload";
import GoogleLogin from "./GoogleLogin";
import { registerUser, loginUser } from "../../actions/api";
import { Close, Edit, Send } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { closeLogin, setLogin, setRegister } from '../../state';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Dropzone from "react-dropzone";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { Formik, Form } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import "../../widgets/widgets.css"
import "./Form.css"

// Creating validation schema for form
const registerSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  phone: yup.string().required("Phone is required"),
  password: yup.string().required("Password is required"),
  picture: yup.mixed().required("Image file is required"),
});

const loginSchema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().required("Password is required"),
});

// Creating initial values for form
const initialValuesRegister = {
  name: "",
  email: "",
  phone: "",
  password: "",
  picture: "",
};

const initialValuesLogin = {
  email: "",
  password: "",
};

// Creating form component
const AuthForm = () => {
  // Create state variables
  const [type, setType] = useState("login");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const user = useSelector((state) => state.user);
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const isLogin = type === "login";
  const isRegister = type === "register";

  const register = async (values, onSubmitProps) => {
    try {
      const formData = new FormData();
      for (let key in values) {
        formData.append(key, values[key]);
      }

      formData.append("picture", values.picture.name); // Append image file to form data
  
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        body: formData,
      });
      const registeredUser = await res.json();
      console.log("This is registered user: ", registeredUser);
  
      if (registeredUser) {
        setType("login");
      }
  
      toast.success("Registered successfully");
    } catch (err) {
      console.log(err);
      toast.error("Invalid credentials");
    }
  };

  // const login = async (values, onSubmitProps) => {
  //   try {
  //     const res = await loginUser(values);
  //     const loggedIn = await res.json();
  //     onSubmitProps.resetForm();
  //     if (loggedIn) {
  //       dispatch(
  //       setLogin({
  //           user: loggedIn.user,
  //           token: loggedIn.token,
  //         })
  //       )
  //       toast.success("Logged in successfully");
  //       navigate("/home");
  //     }
  //   } catch (err) {
  //     console.log(err);
  //     toast.error("Invalid credentials");
  //   }
  // };

  const login = async (values, onSubmitProps) => {
    try {
      const { email, password } = values;
  
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }), // Send email and password as JSON
      });
  
      const loggedIn = await response.json();
      
      if (loggedIn) {
        dispatch(
          setLogin({
            user: loggedIn.user,
            token: loggedIn.token,
          })
        );
        toast.success("Logged in successfully");
        navigate("/home");
      }
    } catch (err) {
      console.log(err);
      toast.error("Invalid credentials");
    }
  };  

  const formSubmit = async (values, {onSubmitProps, setSubmitting}) => {
    setIsSubmitting(true);

    try {
      if (isRegister) {
        await registerSchema.validate(values, { abortEarly: false });
        await register(values, onSubmitProps);
      } else {
        await loginSchema.validate(values, { abortEarly: false });
        await login(values, onSubmitProps);
      }

      console.log("This is values: ", values);
    } catch (err) {
      console.log(err);
      toast.error(success ? "Registered successfully" : "Invalid credentials");
    }

    setIsSubmitting(false);
    setSubmitting(false);
  };

  const handleImageDrop = (acceptedFiles, setFieldValue) => {
    setFieldValue("picture", acceptedFiles[0]);
  };

  return (
    <div className="wrapper main" >
    <Box>
      <Formik
        initialValues={isLogin ? initialValuesLogin : initialValuesRegister}
        validationSchema={isLogin ? loginSchema : registerSchema}
        onSubmit={formSubmit}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          setFieldValue,
          setFieldTouched,
          resetForm
        }) => (
          // Creating form
          <Form onSubmit={handleSubmit}>
            <Box
              display="grid"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              gap="30px"
              padding="1px"
              width="100%"
              sx={{
                "& > div": {
                  gridColumn: isNonMobile ? undefined : "span 4",
                },
              }}
            >
              {isRegister && (
                <>
                  <TextField
                    label="Name"
                    variant="outlined"
                    name="name"
                    value={values.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.name && Boolean(errors.name)}
                    helperText={touched.name && errors.name}
                    sx={{ 
                      gridColumn: "span 4",
                      background: "#fff",
                      color: "#fff",
                    }}
                  />
                  <TextField
                    label="Phone"
                    variant="outlined"
                    name="phone"
                    value={values.phone}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.phone && Boolean(errors.phone)}
                    helperText={touched.phone && errors.phone}
                    sx={{ 
                      gridColumn: "span 4",
                      background: "#fff",
                      color: "#fff" 
                    }}
                  />
                  <Box
                    gridColumn="span 4"
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
                    border={`1px solid ${errors.picture ? "red" : "#ccc"}`}
                    borderRadius="5px"
                    padding="10px"
                  >
                    <Dropzone
                      acceptedFiles=".jpg, .png, .jpeg"
                      multiple={false}
                      value={values.picture}
                      onChange={(acceptedFiles) => {
                        setFieldValue("picture", acceptedFiles[0]);
                      }}
                      onDrop={(acceptedFiles) =>
                        handleImageDrop(acceptedFiles, setFieldValue)
                      }
                    >
                      {({ getRootProps, getInputProps }) => (
                        <Box
                          {...getRootProps()}
                          display="flex"
                          alignItems="center"
                          justifyContent="center"
                          flexDirection="column"
                          border={`2px dashed ${ errors.picture ? "red" : "#ccc"}`}
                          borderRadius="5px"
                          padding="10px"
                          width="100%"
                          height="100%"
                          sx={{
                            "&:hover": { cursor: "pointer" },
                            background: "#fff",
                            color: "#000",
                          }}
                        >
                          <input {...getInputProps()} />
                          {!values.picture ? (
                            <Typography variant="body2"><b>Upload Profile Image</b></Typography>
                          ) : (
                            <Box>
                              <Typography variant="body2">
                                <b>{values.picture.name}</b>
                                <EditOutlinedIcon />
                              </Typography>
                              <Typography variant="caption">
                                {values.picture.size} bytes
                              </Typography>
                            </Box>
                          )}
                        </Box>
                      )}
                    </Dropzone>
                  </Box>
                </>
              )}

              <TextField
                label="Email"
                variant="outlined"
                name="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.email && Boolean(errors.email)}
                helperText={touched.email && errors.email}
                sx={{ 
                  gridColumn: "span 4",
                  background: "#fff",
                  color: "#fff" 
                }}
              />
              <TextField
                label="Password"
                variant="outlined"
                type="password"
                name="password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.password && Boolean(errors.password)}
                helperText={touched.password && errors.password}
                sx={{ 
                  gridColumn: "span 4",
                  background: "#fff",
                  color: "#fff" 
                }}
              />
            </Box>

            {/* Register and login buttons */}
            <Box marginTop="1.5rem">
              <Button
                variant="contained"
                color="primary"
                type="submit"
                disabled={isSubmitting}
                sx={{
                  left: "40%",
                  padding: "10px 20px",
                  marginBottom: "1rem",
                  "&:hover": {
                    backgroundColor: "#3f51b5",
                    color: "#fff",
                  }, 
                }}
              >
                {isLogin ? "Login" : "Register"}
              </Button>
              <Typography
                variant="body2"
                marginBottom="1rem"
                color="red"
                fontSize="15px"
                sx={{ 
                  cursor: "pointer",
                  textAlign: "center",
                  textDecoration: "underline",
                  "&:hover": {
                    cursor: "pointer",
                    color: "#3f51b5",
                  },
                }}
                onClick={() => {
                  setType(isLogin ? "register" : "login");
                  resetForm();
                }}
              >
                {isLogin ? "Don't have an account? Register" : "Already have an account? Login"}
              </Typography>
            </Box>
            {/* GOOGLE LOGIN */}
            <Box>
              <GoogleLogin sx={{
                marginTop: "1rem"
              }} />
            </Box>
          </Form>
        )}
      </Formik>
    </Box>
    </div>
  )
};

export default AuthForm;