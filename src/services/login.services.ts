import { compareSync } from "bcryptjs";
import AppDataSource from "../data-source";
import User from "../entities/User.entity";
import AppError from "../errors";
import { sign } from "jsonwebtoken";

interface ILoginPayload {
    email: string;
    password: string;
}

export const loginService = async ({ email, password }:ILoginPayload) => {

    const repo = AppDataSource.getRepository(User);

    const user = await repo.findOne({
        select: {  },
        where: { email },
        relations: { details: true }
    });
    if(!user) throw new AppError("User not found", 404);
    if(!user.password) throw new AppError("Invalid user", 409);

    if(!compareSync(password, user.password))
        throw new AppError("Password does not match", 401)

    const token = sign( {},
        String(process.env.SECRET_KEY),
        {
            expiresIn: Number(process.env.EXPIRES_IN) * 1000,
            subject: user.id
        }
    )
    return { token, user: { ...user, password: undefined } }
}