import { deleteObject, ref } from "firebase/storage";
import { storage } from "./config";

const deleteImg = (filePath) => {
  const imgRef = ref(storage, filePath)
  return deleteObject(imgRef)
};

export default deleteImg;