export enum UserRole {
    ADMIN,
    NUTRICIONIST,
    TRAINER,
    CLIENT
}

export function stringToRole(value:string): UserRole {
    switch(value) {
        case "ADMIN":
            return UserRole.ADMIN;
        case "NUTRICIONIST":
            return UserRole.NUTRICIONIST;
        case "TRAINER":
            return UserRole.TRAINER;
        case "CLIENT":
            return UserRole.CLIENT;
        default:
            throw new Error("Invalid role")
    }
}