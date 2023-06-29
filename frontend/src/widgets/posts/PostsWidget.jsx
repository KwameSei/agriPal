import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  AttachFileOutlined,
  DeleteOutlined,
  EditOutlined,
  GifBoxOutlined,
  ImageOutlined,
  MicOutlined,
  MoreHorizOutlined,
} from "@mui/icons-material";
import { 
  Box, 
  Button, 
  Divider, 
  IconButton, 
  InputBase, 
  Paper, 
  Typography,
  useMediaQuery,
  useTheme,
 } from "@mui/material";
import Dropzone from "react-dropzone";
import FlexBetween from "../../components/FlexBetween";
import UserImage from "../../components/widgets/ImageWidget";
import Wrapper from "../../components/widgets/widgetWrapper";
import { setPosts } from "../../state";
import "../widgets.css"
// import "./posts.css"

const PostsWidget = ({ picturePath }) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const [isImage, setIsImage] = useState(false);
  const [image, setImage] = useState(null);
  const [post, setPost] = useState("");
  const { _id } = useSelector((state) => state.user || {});
  const token = useSelector((state) => state.token);
  const { user } = useSelector((state) => state);
  const isNotMobile = useMediaQuery('(min-width:1000px)');

  const handlePost = async () => {
    const formData = new FormData();
    formData.append("userId", _id);
    formData.append("description", post);
    if (image) {
      formData.append("picture", image);
      formData.append("picturePath", image.name);
    }

    const res = await fetch("http://localhost:5000/api/posts/create_post", {
      method: "POST",
      body: formData,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(res);

    const posts = await res.json();
    console.log(posts);
    dispatch(setPosts({posts}));
    setPost("");
    setImage(null);
  };

  const handleImageDrop = (acceptedFiles) => {
    console.log(acceptedFiles);
    setImage(acceptedFiles[0]);
    setIsImage(true);
  };

  return (
    
    <div className="wrapper">
      {/* <Wrapper> */}
        <FlexBetween>
          <UserImage image={picturePath} />
          <InputBase
            placeholder="Where did you visit..."
            multiline
            fullWidth
            value={post}
            onChange={(e) => setPost(e.target.value)}
            sx={{
              fontSize: "1.2rem",
              width: "100%",
              borderRadius: "2rem",
              padding: "0.5rem 1rem",
              backgroundColor: "rgba(255, 255, 255)",
              color: "black",
            }}
          />
        </FlexBetween>
        {/* If user chooses to add an image */}
        {isImage && (
          <Box
            padding="0.5rem 1rem"
            marginTop="0.5rem"
            borderRadius="0.5rem"
            bgcolor="rgba(247, 244, 244, 0.8)"
          >
            <Dropzone
              acceptedFiles=".jpg, .png, .jpeg"
              multiple={false}
              // value={values.picture}
              // onChange={(files) => {
              //   setImage(acceptedFiles[0]);
              // }}
              onDrop={handleImageDrop}
            >
              {({ getRootProps, getInputProps }) => (
                <FlexBetween>
                <Box
                  {...getRootProps()}
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  flexDirection="column"
                  border="2px dashed red"
                  borderRadius="5px"
                  padding="10px"
                  width="100%"
                  height="100%"
                  sx={{
                    "&:hover": { cursor: "pointer" },
                  }}
                >
                  <input {...getInputProps()} />
                  {!image ? (
                    <Typography variant="body2"><b>Upload Image</b></Typography>
                  ) : (
                    <Box>
                      <Typography variant="body2">
                        <b>{image.name}</b>
                        <EditOutlined />
                      </Typography>
                      <Typography variant="caption">
                        {image.size} bytes
                      </Typography>
                    </Box>
                  )}
                </Box>
                {image && (
                  <IconButton
                    onClick={() => setImage(null)}
                    sx={{ width : "2rem", height: "2rem", marginLeft: "1rem"}}
                  >
                    <DeleteOutlined color="red" />
                  </IconButton>
                )}
                </FlexBetween>
              )}
            </Dropzone>
          </Box>
        )}

        <Divider sx={{ margin: "1rem 0" }} />

        <FlexBetween>
          {/* Showing the dropzone upon click */}
          <FlexBetween
            onClick={() => setIsImage(!isImage)}
            gap="0.5rem"
          >
            <ImageOutlined sx={{ color: "#fff"}} />
            <Typography 
              variant="body2"
              sx={{
                "&:hover": { cursor: "pointer" },
                color: "#fff" 
              }}
            >
              Image
            </Typography>
          </FlexBetween>

          {isNotMobile ? (
            <>
              <FlexBetween gap="0.5rem">
                <GifBoxOutlined sx={{ color: "#fff"}} />
                <Typography sx={{ color: "#fff" }}>
                  GIF
                </Typography>
              </FlexBetween>

              <FlexBetween gap="0.5rem">
                <AttachFileOutlined sx={{ color: "#fff"}} />
                <Typography sx={{ color: "#fff" }}>
                  Attachment
                </Typography>
              </FlexBetween>

              <FlexBetween gap="0.5rem">
                <MicOutlined sx={{ color: "#fff"}} />
                <Typography sx={{ color: "#fff" }}>
                  Audio
                </Typography>
              </FlexBetween>
            </>
          ) : (
            <FlexBetween gap="0.5rem">
              <MoreHorizOutlined sx={{ color: "#fff"}} />
            </FlexBetween>
          )}

          <Button
            disabled={!post.trim() && !image}
            onClick={handlePost}
            type="submit"
            sx={{
              "&:hover": {
                backgroundColor: "#1DA1F2",
                opacity: "0.8",
                cursor: "pointer",
              },
              backgroundColor: "white",
              color: "white",
              borderRadius: "1rem",
              padding: "0.5rem 1rem",
            }}
          >
            Post
          </Button>
        </FlexBetween>
      {/* </Wrapper> */}
    </div>
  )
};

export default PostsWidget;