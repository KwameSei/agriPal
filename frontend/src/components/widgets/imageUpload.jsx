import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";

const ImageUpload = ({ onFileChange }) => {
  const [photoURL, setPhotoURL] = useState(null);
  const [error, setError] = useState("");

  const handleDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles.length === 0) {
      setError("Image file is required");
      return;
    }

    const file = acceptedFiles[0];
    setError("");
    onFileChange(file);
    previewPhotoURL(file);
  }, [onFileChange]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: "image/*",
    multiple: false,
    onDrop: handleDrop,
  });

  const previewPhotoURL = (file) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setPhotoURL(reader.result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div>
      
    </div>
  );
};

export default ImageUpload;
