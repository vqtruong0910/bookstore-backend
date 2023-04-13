const multer = require("multer");
const path  = require('path');
const fs = require('fs-extra');
const  multerStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    let arr = req.originalUrl.split('/');
    let dest = "";
    for(element of arr){{
      if(element === "avatar" || element === "product"){
        dest = `./public/${element}`;
      }
    }}
    fs.mkdirsSync(dest);
    cb(null, dest)
  },
  filename: function (req, file, cb) {
    const ext = file.mimetype.split("/")[1];
    cb(null, `${file.fieldname}-${Date.now()}.${ext}`);
  }
});
const fileFilter = (req,file,cb)=>{
  if(file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg"){
    cb(null,true);
  }else{
    cb(null,false);
    return cb(new Error('Only .png, jpg and .peg format allowed!'));
  }
}
var upload = multer({
  storage : multerStorage,
  fileFilter: fileFilter,
  limits:{fileSize: 1024 * 1024 * 5}
});
module.exports = upload;