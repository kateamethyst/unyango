import {uploader} from '../../config/cloudinary.config';

export const uploadFile = (file) => {
  const image = uploader.upload(file).then((res) => {
    return res.url;
  });

  if (image) {
    return image;
  }

  return false;
}