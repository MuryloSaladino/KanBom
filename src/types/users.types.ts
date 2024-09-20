import User from "../entities/User.entity";

export type TUserCreation = {
    email: string;
    password: string;
    details: TUserDetailsCreation;
}

export type TUserDetailsCreation = {
    birthdate: string;
    firstName: string;
    lastName: string;
    profilePicture?: string | null;
}

export type TUserUpdate = Partial<TUserDetailsCreation>;

export type TUserResponse = Omit<User, "password">;
