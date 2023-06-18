import React, {useCallback, useState} from "react";
import { useDropzone } from "react-dropzone";
import { Paper, Typography } from "@mui/material";
import ProgressList from "./ProgressList";
import ShowImageList from "./showImageList";
// import ImageInput from "./Input";

const AddImages = () => {
  const [files, setFiles] = useState([]);
  const onDrop = useCallback((acceptedFiles) => {
    setFiles((files) => [...files, ...acceptedFiles]);
    console.log(files);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, accept: "image/*" });

  return (
    <div>
      <Paper
        sx={{
          cursor: "pointer",
          backgroundColor: "#F5F5F5",
          color: "#bdbdbd",
          border: "1px solid #bdbdbd",
          "&:hover": {border: "1px solid #757575"},
          borderRadius: "10px",
        }}>
          <div style={{padding: "10px"}} {...getRootProps()}>
            <Typography variant="h6" sx={{color: "#757575"}}>
              Add Images
            </Typography>
            <input {...getInputProps()} />
            {isDragActive ? (<p style={{color:'green'}}>Drop the files here ...</p>)  : (<p>Drag and drop some files here, or click to select files</p>)}
            <em>Accepted images: *.jpeg, *.png, *.jpg</em>
          </div>
        </Paper>
      
        <ProgressList {...{ files }} />
        <ShowImageList />
    </div>
  );
};

export default AddImages;