import { uploadImage } from '../controllers/uploadController.js';
import upload from '../cloudinary-storage/storage.js';
import express from "express";

const router = express.Router();

router.post("/upload", upload.single("picture"), uploadImage, (req, res) => {
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

export default router;