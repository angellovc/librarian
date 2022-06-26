import multer from 'multer';
import path from 'path';
import {v1} from 'uuid';

const picturesFolder = "./assets/images/";

const picturesStorage = multer.diskStorage({
    destination: (req, file, next) => {
      next(null, picturesFolder);
    },
    filename: (req, file, next) => {
      const fileName = v1()+path.extname(file.originalname.toLowerCase());
      next(null, fileName)
    }
  });

const uploadImage = multer({
    storage: picturesStorage,
    fileFilter: (req, file, next) => {
      if (["image/png", "image/jpg", "image/jpeg", "image/gif"].includes(file.mimetype)) {
        next(null, true);
      } else {
        next(null, false);
        return next(new Error('Only .png, .jpg and .jpeg format allowed!'));
      }
    }
});


export {
    uploadImage,
    picturesFolder
}