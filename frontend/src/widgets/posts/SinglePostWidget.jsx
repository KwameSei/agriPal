import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPost } from "../../state";
import {
  ChatBubbleOutlineOutlined,
  FavoriteBorderOutlined,
  ThumbUpAltOutlined,
  ThumbUpAlt,
  FavoriteOutlined,
  ShareOutlined,
} from "@mui/icons-material";
import {
  Box,
  Divider,
  IconButton,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import FlexBetween from "../../components/FlexBetween";
import Connection from "../../components/Connection";
import Wrapper from "../../components/widgets/widgetWrapper";
import "../widgets.css";

const SinglePostWidget = ({
  postId,
  postUserId,
  postUser,
  name,
  picturePath,
  description,
  createdAt,
  likes,
  comments,
  isProfile,
  address,
  region,
  city,
  district,
}) => {
  const token = useSelector((state) => state.token);
  const dispatch = useDispatch();
  const loggedInUserId = useSelector((state) => state?.user?._id);
  const isLiked = Boolean(likes?.[loggedInUserId]);
  const likeCount = likes ? Object.keys(likes || {}).length : 0;
  const [isComments, setIsComments] = useState(false);

  // Access the name from the postUser object
  const postUserName = postUser ? postUser.name : '';

  const handleLike = async () => {
    const res = await fetch(`http://localhost:5000/api/posts/${postId}/like`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ userId: loggedInUserId }),
    });
    const data = await res.json();
    dispatch(setPost({ post: data }));
  };

  return (
    <div className="wrapper">
      <Connection
        connectionId={postUserId}
        name={postUserName}
        picturePath={picturePath}
        city={city}
        district={district}
        region={region}
        address={address}
      />
      <Typography color="white" sx={{ mt: "1rem" }}>
        {description}
      </Typography>
      {picturePath && (
        <img
          src={`https://res-console.cloudinary.com/dcgxzrhmo/thumbnails/v1/image/upload/v1687619176/${picturePath}`}
          alt="post image"
          style={{ width: "100%", borderRadius: "0.5rem", marginTop: "1rem" }}
        />
      )}
      <FlexBetween mt="1rem">
        <FlexBetween gap="1rem">
          <FlexBetween gap="1rem">
            <IconButton onClick={handleLike}>
              {isLiked ? (
                <ThumbUpAlt sx={{ color: "white" }} />
              ) : (
                <ThumbUpAltOutlined sx={{ color: "white" }} />
              )}
            </IconButton>
            <Typography color="white">{likeCount}</Typography>
          </FlexBetween>

          <FlexBetween gap="1rem">
            <IconButton onClick={() => setIsComments(!isComments)}>
              <ChatBubbleOutlineOutlined sx={{ color: "white" }} />
            </IconButton>
            <Typography color="white">
              {comments && comments.length > 0 ? comments.length : 0}
            </Typography>
          </FlexBetween>
        </FlexBetween>
        <IconButton>
          <ShareOutlined sx={{ color: "white" }} />
        </IconButton>
      </FlexBetween>
      {isComments && comments && comments.length > 0 && (
        <Box sx={{ mt: "1rem" }}>
          {comments.map((comment, i) => (
            <Box key={`${name}-${i}`}>
              <Divider />
              <Typography color="white" sx={{ mt: "1rem" }}>
                {comment}
              </Typography>
            </Box>
          ))}
          <Divider />
        </Box>
      )}
    </div>
  );
};

export default SinglePostWidget;
