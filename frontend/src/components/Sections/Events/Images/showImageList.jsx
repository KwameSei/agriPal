import { ImageList, ImageListItem, ImageListItemBar } from "@mui/material"
import { useValue} from "../../../../stateManagement/context/ContextProvider"
import { IconButton } from "@mui/material"
import { Cancel } from "@mui/icons-material";
import deleteImg from "../../../../firebase/deleteImg";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ShowImageList = () => {
  const { state: { images, currentUser }, dispatch } = useValue();

  const handleDelete = async (image) => {
    dispatch({ type: 'DELETE_IMAGE', payload: image });
  
    try {
      const url = new URL(image);
      const imageName = url.searchParams.get('alt');
      
      if (currentUser.user?.id) {
        console.log('currentUser.user?.id', currentUser.user?.id);
        await deleteImg(`events/${currentUser.id}/${imageName}`);
        toast.success('Image deleted successfully', { position: 'top-center' });
      } else {
        throw new Error('User ID is undefined');
      }
    } catch (error) {
      toast.error(error.message, { position: 'top-center' });
      console.log(error);
    }
  };
  
  

  return (
    <div className="row">
      <ImageList
        rowHeight={250}
         sx={{
          '& .MuiImageListItem-root': {
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))!important',
          },
         }}
      >
        {images.map((image, index) => (
          <ImageListItem key={index} cols={1} rows={1}>
            <img src={image} alt="events" loading="lazy" style={{height: '100%'}} />

            <ImageListItemBar
              position="top"
              sx={{
                background: 'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, ' + 'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
              }}
              actionIcon={
                <IconButton
                  sx={{ color: 'white' }}
                  onClick={() => handleDelete(image)}
                >
                  <Cancel />
                </IconButton>
              }
            >
            </ImageListItemBar>
          </ImageListItem>
        ))}
      </ImageList>
    </div>
  )
}

export default ShowImageList;