import { compareSync } from "bcryptjs";
import AppDataSource from "../data-source";
import User from "../entities/User.entity";
import AppError from "../errors";
import { sign } from "jsonwebtoken";

interface ILoginPayload {
    email: string;
    password: string;
}

export default class LoginService {

    async login({ email, password }:ILoginPayload) {
        const repo = AppDataSource.getRepository(User);

        const user = await repo.findOne({
            where: { email },
            select: { id: true, email: true, password: true },
        });
        if(!user) throw new AppError("User not found", 404);
    
        if(!compareSync(password, user.password!))
            throw new AppError("Password does not match", 401)
    
        const token = sign( {},
            String(process.env.SECRET_KEY),
            {
                expiresIn: Number(process.env.EXPIRES_IN) * 1000,
                subject: user.id
            }
        )
        const fullUser = await repo.findOne({  
            where: { id: user.id },
            relations: { details: true }
        })
        return { token, user: fullUser }
    }
}
