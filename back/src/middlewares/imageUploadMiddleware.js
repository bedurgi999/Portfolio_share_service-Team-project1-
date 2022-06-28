import AWS from "aws-sdk";
import path from "path";
import multer from "multer";
import multerS3 from "multer-s3";
import dotenv from "dotenv";

dotenv.config();

const endpoint = new AWS.Endpoint('https://kr.object.ncloudstorage.com');
const region = 'kr-standard';
const access_key = process.env.NCP_ACCESS_KEY;
const secret_key = process.env.NCP_SECRET_KEY;


const S3 = new AWS.S3({
    endpoint: endpoint,
    region: region,
    credentials: {
        accessKeyId : access_key,
        secretAccessKey: secret_key
    }
});


const bucket_name = 'team3';

const upload = multer({
    storage: multerS3({
      s3: S3,
      bucket: bucket_name,
      acl: 'public-read',
      contentType: multerS3.AUTO_CONTENT_TYPE,
      key: function (req, file, cb) {
        cb(null, Date.now().toString() + path.extname(file.originalname))
      },
    }),
    limits: { fileSize: 5 * 1024 * 1024 },
  })

const deleteImg = async (req, res, next) => {
  let objectKey = null;
  if (req.body.prevImage) {
    objectKey = req.body.prevImage.split("/").slice(-1)[0];
  } else if (req.params.id) {
    objectKey = req.params.id;
    
  }
  
  objectKey = objectKey.indexOf("default") === -1 ? objectKey : null;

  if (objectKey !== null) {
    console.log("이전파일명", objectKey) 
    S3.deleteObject({
      Bucket : bucket_name,
      Key: objectKey,
    }, function(err, data){
      if (err) console.log(err);
    });
  }
  next();
}

export { upload, deleteImg };