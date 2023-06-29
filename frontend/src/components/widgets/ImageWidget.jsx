import { Box } from "@mui/material";
import { useSelector } from "react-redux";

const UserImage = ({ image, size='60px' }) => {
  return (
    <Box>
      <img 
        src={`https://res-console.cloudinary.com/dcgxzrhmo/thumbnails/v1/image/upload/v1687619176/${image}`}
        alt="user"
        width={size}
        height={size}
        style={{ 
          borderRadius: "50%",
          objectFit: "cover",
          objectPosition: "center",
        }} />
    </Box>
  )
};

export default UserImage;