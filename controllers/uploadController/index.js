const { S3Client } = require("@aws-sdk/client-s3");
const multer = require("multer");
const multerS3 = require("multer-s3");

let s3 = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    },
    sslEnabled: false,
    s3ForcePathStyle: true,
    signatureVersion: "v4"
});

const upload = multer({
    storage: multerS3({
        s3: s3,
        acl: "public-read",
        bucket: process.env.BUCKET_NAME,
        key: (req, file, cb) => {
            console.log(file);
            const fullPath = `review-images/${file.originalname}`;
            cb(null, fullPath);
        }
    })
});

module.exports = {
    upload: upload.single("writeFile"),
    handleUpload: (req, res) => {
        console.log(req.file);
        if (req.file.location.length > 0 || req.file.location.length <= 255) {
            console.log("File url length is: " + req.file.location.length);
        } else {
            console.log("File url has exceeded or does not meet the length requirements.");
            return res.status(400).json("File URL is invalid");
        }
        res.send({
            message: "Image uploaded successfully",
            url: req.file.location,
            name: req.file.key,
            type: req.file.mimetype,
            size: req.file.size
        });
    }
};