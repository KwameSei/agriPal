import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import FlexBetween from "../components/FlexBetween";
import {
  Box,
  Button,
  Divider,
  IconButton,
  Typography,
  useTheme,
} from "@mui/material";
import {
  PersonAddOutlined,
  PersonRemoveOutlined
} from "@mui/icons-material";
import { setConnections } from "../state";
import UserImage from "../components/widgets/ImageWidget";
// import Wrapper from "../../components/widgets/widgetWrapper";

const Connection = ({ connections, name, subtitle, picturePath }) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { _id } = useSelector((state) => state.user || {});
  const token = useSelector((state) => state.token);
  const { user } = useSelector((state) => state);
  // const connections = useSelector((state) => state.user.connections);

  // Generate the connectionId dynamically
  const connectionId = connections?._id;

  // Show or hide the connection icon
  const isConnection = connections && connections.find((connection) => connection._id === connectionId);
  const handleConnection = async () => {
    const res = await fetch(`http://localhost:5000/api/users/${_id}/${connectionId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    dispatch(setConnections({ connections: data }));
  };

  return (
    <FlexBetween>
      <FlexBetween gap="1rem">
        <UserImage image={picturePath} size="55px" />
        <Box
          onClick={() => {
            navigate(`/profile/${connectionId}`);
            navigate(0);
          }
        }
        >
          <Typography 
            variant="h6"
            color="red"
            fontWeight="bold"
            sx={{
              "&:hover": {
                cursor: "pointer",
                color: "blue"
              },
            }}
          >
            {name}
          </Typography>
          <Typography 
            variant="subtitle1" 
            color="white"
          >
            <i>{subtitle}</i>
           </Typography>
        </Box>
      </FlexBetween>
      <IconButton
        onClick={() => handleConnection()}
        sx={{ backgroundColor: "rgba(0, 0, 0, 0.7)" }}
      >
        {isConnection ? (
          <PersonRemoveOutlined sx={{ color: "red" }} />
        ) : (
          <PersonAddOutlined sx={{ color: "green" }} />
        )}
      </IconButton>
    </FlexBetween>
  )
};

export default Connection;