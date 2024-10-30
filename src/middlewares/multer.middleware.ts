import multer from "multer";
import { v4 as uuid } from "uuid";
import AppError from "../errors";

const storage = multer.diskStorage({
    destination: (_req, _file, callback) => callback(null, 'uploads/'),
    filename: (_req, file, callback) => callback(
        null, `${uuid()}${file.originalname.substring(file.originalname.indexOf("."))}`
    ),
});

const upload = multer({
    storage,
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