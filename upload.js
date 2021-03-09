const env = require("./env_setup");
const aws = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");

const s3Config = new aws.S3({
    accessKeyId: env.aws_user_key,
    secretAccessKey: env.aws_secret_access_key,
    Bucket: env.aws_bucket_name,
});


const fileFilter = (req, file, cb) => {
    if(file.mimetype == 'image/jpeg' || file.mimetype == 
    'image/png'){
        cb(null, true);
    }else{
        cb(null, false);
    }
}

//Where to upload the file locally
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads'); //which folder the uploaded files will be stored
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname); //save file as original file name
    }
});


const multerS3Config = multerS3({
    s3: s3Config,
    bucket: env.aws_bucket_name,
    metadata: function(req, file, cb){
        cb(null, {fieldName: file.fieldname});
    },
    key: function(req, file, cb){
       cb(null, file.originalname);
    }
});




//Middleware
const upload = multer({
    storage: multerS3Config,
     fileFilter: fileFilter
});

module.exports = upload;

