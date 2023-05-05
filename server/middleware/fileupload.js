// Config cloudinary
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');


// Configuration 
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'alaya-challenge',
        public_id: (req, file) => uuidv4()
    },
});

const parser = multer({ storage: storage });

// attachImages = async (req) => {

//     const form = Formidable();

//     form.parse(req, (err, fields, files) => {

//         console.log("Fields:", fields);
//         console.log("Files:", files);
//         console.log("Body:", req.body);
//         files.map(file => {
//             console.log(file.filePath);
//         })
//         // console.log("Req:",req);
//         //     cloudinary.uploader.upload(files.file.filepath).then((result)=>{
//         //         console.log("Cloudinary result:",result);
//         //     })
//     })
// }


module.exports = parser;