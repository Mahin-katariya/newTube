import multer from "multer";

//storing data in disk
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // this function decides where the file will be stored
    cb(null, './public/temp')
  },
    // decide what to name the file that is going to be stored.
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`); // custom file name
  }
})

export const upload = multer({ storage, })

