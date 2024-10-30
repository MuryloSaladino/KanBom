import { ZodSchema } from "zod";
import BaseEntity from "../entities/common/BaseEntity.entity";
import { Request, Response } from "express";

export default abstract class CRUDController {

    private validator:ZodSchema;
    private entity:BaseEntity;

    public constructor(validator:ZodSchema, entity:BaseEntity) {
        this.validator = validator;
        this.entity = entity;
    }

    public async create(req:Request, res:Response) {

    }
}