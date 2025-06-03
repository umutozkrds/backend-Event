const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
require('dotenv').config();

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_KEY,
    api_secret: process.env.CLOUD_SECRET
});

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'event_images',
        format: async (req, file) => {
            if (file.mimetype === 'image/png') return 'png';
            if (file.mimetype === 'image/jpeg') return 'jpg';
            if (file.mimetype === 'image/jpg') return 'jpg';
            return 'png';
        },
        public_id: (req, file) => {
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
            const filename = file.originalname.split('.')[0];
            return filename + '-' + uniqueSuffix;
        }
    }
});

module.exports = { cloudinary, storage };
