import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "./config";

export const uploadImage = async (file, filePath) => {
  return new Promise(async (resolve, reject) => {
    const storageRef = ref(storage, filePath);
    try {
      await uploadBytes(storageRef, file);
      const url = await getDownloadURL(storageRef);
      resolve(url);
    } catch (err) {
      reject(err);
    }
  });
};