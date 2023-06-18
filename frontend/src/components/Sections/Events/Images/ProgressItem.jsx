import { CheckCircleOutline } from '@mui/icons-material';
import { Box, ImageListItem } from '@mui/material';
import React, { useEffect, useState } from 'react';
import CircularProgressWithLabel from './CircularProgressWithLabel';
import { v4 as uuidv4 } from 'uuid';
import uploadFileProgress from '../../../../firebase/uploadFileProgress';
import { useValue } from '../../../../stateManagement/context/ContextProvider';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ProgressItem = ({ file }) => {
  const [progress, setProgress] = useState(0);
  const [imageURL, setImageURL] = useState(null);
  const [isUploaded, setIsUploaded] = useState(false);
  const { state: { currentUser }, dispatch } = useValue();

  useEffect(() => {
    const uploadImage = async () => {
      const imageName = uuidv4() + '.' + file.name.split('.').pop();
      try {
        const url = await uploadFileProgress(
          file,
          `events/${currentUser?.id}`,
          imageName,
          setProgress
        );

        dispatch({ type: 'UPDATE_IMAGES', payload: url });
        setIsUploaded(true);
        toast.success('Image uploaded successfully', { position: toast.POSITION.TOP_RIGHT });
      } catch (error) {
        toast.error(error.message, { position: toast.POSITION.TOP_RIGHT });
        console.log(error);
      }
    };

    if (!isUploaded) {
      setImageURL(URL.createObjectURL(file));
      uploadImage();
    }

    return () => {
      // Clean up URL object when component unmounts
      URL.revokeObjectURL(imageURL);
    };
  }, [file, currentUser, dispatch, isUploaded]);

  return (
    imageURL && (
      <ImageListItem cols={1} rows={1}>
        <img src={imageURL} alt="gallery" loading="lazy" />
        <Box sx={backDrop}>
          {progress < 100 ? (
            <CircularProgressWithLabel value={progress} />
          ) : (
            <CheckCircleOutline sx={{ width: 60, height: 60, color: 'lightgreen' }} />
          )}
        </Box>
      </ImageListItem>
    )
  );
};

export default ProgressItem;

const backDrop = {
  position: 'absolute',
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: 'rgba(0,0,0, .5)',
};
