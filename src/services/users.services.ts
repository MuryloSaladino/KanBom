import AppDataSource from "../data-source";
import User from "../entities/User.entity";
import UserDetails from "../entities/UserDetails.entity";
import { TUserCreation, TUserResponse, TUserUpdate } from "../types/users.types";
import dayjs from "dayjs";
import AppError from "../errors";

export async function createUserService(payload:TUserCreation): Promise<TUserResponse> {

    const detailsRepo = AppDataSource.getRepository(UserDetails);
    const userRepo = AppDataSource.getRepository(User);
    
    const details = detailsRepo.create(payload.details);
    details.birthdate = dayjs(details.birthdate).format("YYYY-MM-DD HH:mm:ss");
    
    const user = userRepo.create({
        password: payload.password,
        email: payload.email,
        details: details
    });

    await userRepo.save(user);
    user.password = undefined;
    return user;
}

export async function getUserService(id:string): Promise<TUserResponse> {
    
    const repo = AppDataSource.getRepository(User);
    const user = await repo.findOne({ 
        where: { id }, 
        relations: { details: true },
    })

    if(!user) throw new AppError("User not found", 404);
    return user;
}

export async function updateUserDetailsService(id:string, payload:TUserUpdate): Promise<TUserResponse> {
    
    const repo = AppDataSource.getRepository(User);

    const user = await repo.findOne({ where: { id }, relations: { details: true } })
    if(!user) throw new AppError("User not found", 404);

    user.details = { ...user.details, ...payload }

    return await repo.save(user);
}

export async function deleteUserService(id:string): Promise<void> {
    
    const repo = AppDataSource.getRepository(User);
    
    if(!await repo.exists({ where: { id } }))
        throw new AppError("User not found", 404);

    await repo.softDelete({ id });
}
