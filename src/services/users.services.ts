import { hashSync } from "bcryptjs";
import AppDataSource from "../data-source";
import User from "../entities/User.entity";
import UserDetails from "../entities/UserDetails.entity";
import { TUserCreation } from "../types/users.types";
import dayjs from "dayjs";

export async function createUserService(payload:TUserCreation): Promise<User> {

    const detailsRepo = AppDataSource.getRepository(UserDetails);
    const userRepo = AppDataSource.getRepository(User);
    
    const details = detailsRepo.create(payload.details);
    details.birthdate = dayjs(details.birthdate).format("YYYY-MM-DD HH:mm:ss");
    
    const user = userRepo.create({
        password: payload.password,
        email: payload.email,
        details: details
    });

    return await userRepo.save(user);
}