import multer from "multer";
import CloudinaryStorage from "../integrations/cloudinary";

const upload = multer({
    storage: new CloudinaryStorage(),
    fileFilter: (_req, file, callback) => {
        const allowedMimeTypes = ["image/jpeg", "image/png", "image/gif"];
        if (allowedMimeTypes.includes(file.mimetype)) {
            callback(null, true);
        } else {
            callback(new Error("Invalid image format"));
        }
    },
    limits: {
        fileSize: 5 * 1024 * 1024,
    },
});

export default upload