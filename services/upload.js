import multer from 'multer';
import path from 'path';

const videoStorage = multer.diskStorage({
  destination: 'public', // Destination to store video
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + '_' + Date.now() + path.extname(file.originalname)
    );
  },
});

export const videoUpload = multer({
  storage: videoStorage,
  limits: {
    fileSize: 100000000000000, // 10000000 Bytes = 10 MB
  },
  fileFilter(req, file, cb) {
    // upload only mp4 and mkv format
    if (!file.originalname.match(/\.(mp4|MPEG-4|mkv)$/)) {
      return cb(new Error('Please upload a video'));
    }
    cb(undefined, true);
  },
});

const imageStorage = multer.diskStorage({
  destination: 'public', // Destination to store video
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + '_' + Date.now() + path.extname(file.originalname)
    );
  },
});

export const imageUpload = multer({
  storage: imageStorage,
  limits: {
    fileSize: 10000000, // 10000000 Bytes = 10 MB
  },
  fileFilter(req, file, cb) {
    // upload only mp4 and mkv format
    if (!file.originalname.match(/\.(png|jpg|jpeg)$/)) {
      return cb(new Error('Please upload an image'));
    }
    cb(undefined, true);
  },
});
