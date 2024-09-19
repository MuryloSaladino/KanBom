export enum Role {
    OWNER,
    EDITOR,
    READER
}

export function roleToString(role:Role): string {
    switch (role) {
        case Role.OWNER:
            return "Owner";
        case Role.EDITOR:
            return "Editor";
        case Role.READER:
            return "Reader";
    }
}

export function stringToRole(string:string): Role {
    switch (string) {
        case "Owner":
            return Role.OWNER;
        case "Editor":
            return Role.EDITOR;
        default:
            return Role.READER;
    }
} 