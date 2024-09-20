import User from "../entities/User.entity";
import UserDetails from "../entities/UserDetails.entity";

export type TUserDetailsCreation = Omit<UserDetails, "id" | "createdAt" | "updatedAt" | "deletedAt">;

export type TUserCreation = {
    email: string;
    password: string;
    details: TUserDetailsCreation;
}

export type TUserUpdate = Partial<TUserDetailsCreation>;

export type TUserResponse = Omit<User, "password">;
