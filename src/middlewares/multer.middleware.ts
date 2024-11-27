import multer from "multer";
import AppError from "../errors";
import CloudinaryStorage from "../integrations/cloudinary";

const upload = multer({
    storage: new CloudinaryStorage(),
    fileFilter: (_req, file, callback) => {
        const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/gif'];
        if (allowedMimeTypes.includes(file.mimetype)) {
            callback(null, true);
        } else {
            throw new AppError("Invalid image format");
        }
    }
})

export default upload