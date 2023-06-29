import express from 'express';
import { createPost, getFeedPosts, getUserPosts, likePost } from '../controllers/postControllers.js';
import auth from '../middleware/auth.js'
// import { admin, upload } from '../firebase_storage.js';
import upload from '../cloudinary-storage/storage.js';

const router = express.Router();

router.post("/create_post", auth, upload.single("picture"), createPost, (req, res) => {
  try {
    const picture = req.file;
    console.log(picture);

    if (!picture) {
      return res
        .status(400)
        .json({ success: false, message: 'Image file is required' });
    } else {
      return res
        .status(200)
        .json({ success: true, message: 'Image file uploaded successfully' });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: 'Server Error' });
  }
});

// router.post('/create_post', upload, createPost, (req, res) => {
//   if (!req.files || req.files.length === 0) {
//     return res.status(400).json({ error: 'No files provided' });
//   }

//   const bucket = admin.storage().bucket();

//   // Iterate over each uploaded file
//   req.files.forEach((file) => {
//     // Upload the file to Firebase Storage
//     const storageFile = bucket.file(file.originalname);
//     const stream = storageFile.createWriteStream();

//     stream.on('error', (error) => {
//       console.error('Error uploading file:', error);
//       res.status(500).json({ error: 'Failed to upload file' });
//     });

//     stream.on('finish', () => {
//       // File upload completed successfully
//       console.log('File uploaded:', file.originalname);
//     });

//     // Pipe the file stream to the Firebase Storage upload stream
//     stream.end(file.buffer);
//   });

//   res.status(200).json({ message: 'Files uploaded successfully' });
// });

router.get('/feed', auth, getFeedPosts);
router.get('/:userId/posts', auth, getUserPosts);
router.put('/:id/like', auth, likePost);

export default router;