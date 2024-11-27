import { StorageEngine } from "multer";
import { v2 as cloudinary } from "cloudinary";
import streamifier from "streamifier";
import AppError from "../errors";
import { getEnv } from "../extensions/env.extensions";

export default class CloudinaryStorage implements StorageEngine {

    public static configure() {
        cloudinary.config({ 
            cloud_name: getEnv("CLOUDNARY_NAME"), 
            api_key: getEnv("CLOUDNARY_KEY"), 
            api_secret: getEnv("CLOUDNARY_SECRET"),
        });
    }

    _handleFile(_req: any, file: Express.Multer.File, callback: (error?: any, info?: Partial<Express.Multer.File>) => void) {
        const chunks: Buffer[] = [];

        file.stream.on("data", (chunk) => {
            chunks.push(chunk);
        });

        file.stream.on("end", async () => {
            const fileBuffer = Buffer.concat(chunks);

            const uploadStream = cloudinary.uploader.upload_stream(
                { folder: "uploads" },
                (error: any, result: any) => {
                    if (error) {
                        callback(new AppError("Error during the upload", 409));
                    } else {
                        callback(null, {
                            path: result.secure_url,
                            filename: result.public_id,
                        });
                    }
                }
            );
            streamifier.createReadStream(fileBuffer).pipe(uploadStream);
        });

        file.stream.on("error", (err) => {
            callback(err);
        });
    }

    _removeFile(_req: any, file: Express.Multer.File, callback: (error: Error | null) => void) {
        cloudinary.uploader.destroy(file.filename, (error, _) => {
            if (error) throw new AppError("Error during the deletion", 409);
            callback(null);
        });
    }
}
