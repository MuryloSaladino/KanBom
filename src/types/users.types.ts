import User from "../entities/User.entity";

export type TUserCreation = {
    email: string;
    password: string;
    birthdate: string;
    firstName: string;
    lastName: string;
    picture: string | null;
}

export type TUserUpdate = Partial<TUserCreation>;

export type TUserResponse = Omit<User, "password">;
