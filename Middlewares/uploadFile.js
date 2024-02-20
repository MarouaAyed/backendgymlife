const multer = require('multer');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './StoragesFile');
  },
  filename: (req, file, cb) => {
    //console.log(file);
    cb(null, file.originalname);
  },
});
const fileFilter = (req, file, cb) => {
  //  console.log(file);
  if (
    file.mimetype == 'application/pdf' ||
    file.mimetype == 'application/docx' ||
    file.mimetype == 'application/png'
  ) {
    //   console.log(file);
    cb(null, true);
  } else {
    // console.log(file);
    cb(null, false);
  }
};
module.exports = multer({ storage: storage, fileFilter: fileFilter });

