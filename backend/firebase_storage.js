import serviceAccount from './config/serviceAccountKey.json' assert { type: "json" };
import dotenv from 'dotenv';
import multer from 'multer';
import multerGoogleStorage from 'multer-google-storage';
import firebaseAdmin from 'firebase-admin';

dotenv.config();

const admin = firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(serviceAccount),
  storageBucket: process.env.STORAGE_BUCKET
});

// Create Multer storage engine
const storage = multerGoogleStorage.storageEngine({
  bucket: process.env.STORAGE_BUCKET,
  projectId: process.env.PROJECT_ID,
  keyFilename: './config/serviceAccountKey.json',
  filename: function (req, file, cb) {
    const fileName = `${Date.now()}-${file.originalname}`;
    cb(null, fileName);
  },
});

// Init upload
const upload = multer({ storage }).array('files');

export { admin, upload };
// export default upload;