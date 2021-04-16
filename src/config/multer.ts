import multer from 'multer';
import path from 'path';
import multerS3 from 'multer-s3';
import aws from 'aws-sdk';
import crypto from 'crypto';
import dotenv from "dotenv";
dotenv.config();

const storageTypes = {
    local: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, path.resolve(__dirname, '..', '..', 'tmp', 'uploads'))
        },
        filename: (req, file, cb) => {
            crypto.randomBytes(16, (err, hash) =>{
                if(err) cb(err, file.filename);

                 file.filename = `${hash.toString('hex')}-${file.originalname}`;

                cb(null, file.filename);
            });
        }
    }),

    s3: multerS3({
        s3: new aws.S3(),
        bucket: 'upload-node-react',
        contentType: multerS3.AUTO_CONTENT_TYPE,
        acl: 'public-read',
        key: (req,file,cb) => {
            crypto.randomBytes(16, (err, hash) =>{
                if(err) cb(err);

                const fileName = `${hash.toString('hex')}-${file.originalname}`;

                cb(null, fileName);
            });
        }
    }),
}


export default {
    dest: path.resolve(__dirname, '..', '..', 'tmp', 'uploads'),
    storage: storageTypes[process.env.STORAGE_TYPE] ,
    limits: {
        fileSize: 2 * 1024 * 10024,
    },  
    fileFilter: (req, file, cb) => {
        const allowedMimes = [
            'image/jpeg',
            'image/jpg',
            'image/pjpeg',
            'image/gif',
            'image/png'
        ];

        if(allowedMimes.includes(file.mimetype)){
            cb(null, true);
        }else{
            cb(new Error("Invalid file Type"));
        }
    },
};