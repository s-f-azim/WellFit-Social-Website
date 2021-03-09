import multer from 'multer';
import ErrorResponse from '../utils/errorResponse.js';

const upload = multer({
  limits: {
    fileSize: 1000000,
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/))
      return cb(
        new ErrorResponse(
          'Please upload a picture in the format of jpg/jpeg/png',
          400
        )
      );
    cb(undefined, true);
  },
});

export default upload;
