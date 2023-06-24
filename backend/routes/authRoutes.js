import express from 'express';
import {
  forgotpassword,
  login,
  register,
  resetpassword
} from './../controllers/authControllers.js';
import upload from '../cloudinary-storage/storage.js';

const router = express.Router();

router.post('/register', upload.single('picture'), register, async (req, res) => {
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

router.post('/login', login);

router.post('/forgotpassword', forgotpassword);

router.put('/resetpassword/:resetToken', resetpassword);

export default router;
