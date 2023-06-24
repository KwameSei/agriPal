import { Box } from "@mui/material";

const UserImage = ({ image, size='60px' }) => {
  return (
    <Box>
      <img 
        src={image} 
        alt="user"
        style={{ 
          width: size, 
          height: size, 
          borderRadius: "50%",
          objectFit: "cover",
          objectPosition: "center",
        }} />
    </Box>
  )
};

export default UserImage;