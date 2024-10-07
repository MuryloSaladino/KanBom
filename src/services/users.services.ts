import AppDataSource from "../data-source";
import User from "../entities/User.entity";
import UserDetails from "../entities/UserDetails.entity";
import { TUserCreation, TUserUpdate } from "../types/users.types";
import AppError from "../errors";

export async function createUserService({ password, email, ...payloadDetails }:TUserCreation) {

    const detailsRepo = AppDataSource.getRepository(UserDetails);
    const userRepo = AppDataSource.getRepository(User);
    
    const details = detailsRepo.create(payloadDetails);
    const user = userRepo.create({ password, email, details });

    await userRepo.save(user);
    user.password = undefined;
    return user;
}

export async function getUserService(id:string) {
    
    const user = await AppDataSource.getRepository(User).findOne({ 
        relations: { details: true },
        where: { id }, 
    })
    if(!user) throw new AppError("User not found", 404);

    return user;
}

export async function updateUserDetailsService(id:string, { password, email, ...payloadDetails }:TUserUpdate) {
    
    const repo = AppDataSource.getRepository(User);

    const user = await repo.findOne({ 
        relations: { details: true }, 
        where: { id }, 
    })
    if(!user) throw new AppError("User not found", 404);

    user.details = { ...user.details, ...payloadDetails }
    if(email) user.email = email;
    if(password) user.password = password;

    return await repo.save(user);
}

export async function deleteUserService(id:string) {
    
    const repo = AppDataSource.getRepository(User);

    const user = await repo.findOneBy({ id })
    if(!user) throw new AppError("User not found", 404);

    await repo.softRemove(user);
}
