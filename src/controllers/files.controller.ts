import { Request, Response } from "express";
import { Controller, HttpMethod, Middlewares } from "../decorators/api.decorators";
import FilesService from "../services/files.services";
import upload from "../middlewares/multer.middleware";

@Controller("/files")
export default class FilesController {

    private service = new FilesService();

    @HttpMethod("post")
    @Middlewares([upload.single("file")])
    public create = async (req: Request, res: Response) => {
        const file = await this.service.create({ 
            publicId: req.file?.filename,
            url: req.file?.path
        })
        return res.status(201).json(file)
    }
}