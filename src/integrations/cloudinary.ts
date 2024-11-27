import { StorageEngine } from "multer";
import { v2 as cloudinary } from "cloudinary";
import streamifier from "streamifier";
import AppError from "../errors";

class CloudinaryStorage implements StorageEngine {
    _handleFile(_req: any, file: Express.Multer.File, callback: (error?: any, info?: Partial<Express.Multer.File>) => void) {
        const uploadStream = cloudinary.uploader.upload_stream(
            { folder: "uploads" }, 
            (error: any, result: any) => {
                if(error) throw new AppError("Error during the upload", 409);
                callback(null, { path: result.secure_url, filename: result.public_id });
            }
        );
        streamifier.createReadStream(file.buffer).pipe(uploadStream);
    }

    _removeFile(_req: any, file: Express.Multer.File, callback: (error: Error | null) => void) {
        cloudinary.uploader.destroy(file.filename, (error, _) => {
            if (error) throw new AppError("Error during the deletion", 409);
            callback(null);
        });
    }
}

export default CloudinaryStorage;