import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import {
  AccountCircleOutlined,
  ManageAccountsOutlined,
  LocationOnOutlined,
  EditOutlined,
  WorkOutlineOutlined,
  Mail,
  PhoneAndroid,
  Visibility,
  Pages,
} from "@mui/icons-material";
import { Box, Button, Divider, Typography } from "@mui/material";
import UserImage from "../components/widgets/ImageWidget";
import Wrapper from "../components/widgets/widgetWrapper";
import FlexBetween from "../components/FlexBetween";
import "./widgets.css"

const Timeline = ({ userId, photoURL }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null); // Add an error state
  const token  = useSelector((state) => state.token);
  console.log("This is the user:", user);
  // const userId = user?._id; // Add a conditional check for user object
  console.log("This is the userId:", userId);

  // Making a GET request to the backend to get the user data
  const getUser = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/users/single_user/${userId}`,
      {
        headers: { 
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json', 
        },
      });
      console.log("This is the response:", res);
      const data = res.data; // Remove unnecessary await statement
      setUser(data);
    } catch (err) {
      console.log(err);
      setError("Failed to fetch user data."); // Set the error message
    }
  };

  useEffect(() => {
    getUser();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (error) {
    return <div>Error: {error}</div>; // Display error message if error exists
  }

  if (!user) return null;

  const {
    name,
    email,
    // location,
    phone,
    connections,
    region,
    district,
    city,
    address,
    viewedProfiles,
    impressions,
    // photoURL, // Add this line to define the photoURL variable
  } = user;

  return (
    <div className="wrapper">
      {/* <Wrapper className="wrapper-container"> */}
        <FlexBetween
         gap="0.5"
          pb="1rem"
          onClick={() => navigate(`/profile/${userId}`)}
        >
          <FlexBetween gap="0.5">
            <UserImage image={photoURL} size="60px" />
            <Box>
              <Typography 
                variant="h6"
                sx={{
                  "&:hover": {
                    textDecoration: "underline",
                    cursor: "pointer",
                    color: "white"
                  },
                  fontSize: "1rem",
                  fontWeight: 600,
                  color: "dark",
                }}
              >
                {name}
              </Typography>
              <Typography color="dark">{connections.length} connections</Typography>
            </Box>
          </FlexBetween>
          <ManageAccountsOutlined />
          </FlexBetween>

          <Divider color="white" />
          <Box p="1rem 0">
            <Box mb="0.5rem" display="flex" alignItems="center" gap="1rem">
              <LocationOnOutlined fontSize="large" fontWeight="bold" color="red" />
              <Typography variant="h6" color="dark">{region} {district} {city} {address}</Typography>
            </Box>
          {/* <Box mb="0.5rem" display="flex" alignItems="center" gap="1rem">
            <LocationOnOutlined fontSize="large" fontWeight="bold" color="red" />
            <Typography variant="h6" color="dark">{region} {district} {city} {address}</Typography>
          </Box> */}
            <Box mb="0.5rem" display="flex" alignItems="center" gap="1rem">
              <Mail fontSize="large" fontWeight="bold" color="red" />
              <Typography variant="h6" color="dark">{email}</Typography>
            </Box>
            <Box mb="0.5rem" display="flex" alignItems="center" gap="1rem">
              <PhoneAndroid fontSize="large" fontWeight="bold" color="red" />
              <Typography variant="h6" color="dark">{phone}</Typography>
            </Box>
          </Box>

          <Divider color="white" />
          <Box p="1rem 0">
            <FlexBetween mb="0.5rem" alignItems="center" >
              <Typography variant="h6" color="dark">Profile Views</Typography>
              <Visibility color="dark" /> {viewedProfiles}
            </FlexBetween>
            <FlexBetween mb="0.5rem" alignItems="center" >
              <Typography variant="h6" color="dark">Post Impressions</Typography>
              <Pages color="dark" />{impressions}
            </FlexBetween>
          </Box>	
      {/* </Wrapper> */}
    </div>
  )
};

export default Timeline;
