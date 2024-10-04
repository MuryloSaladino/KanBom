export default class AppError extends Error {
    
    public statusCode:number;

    constructor(message:string, statusCode:number = 400) {
        super(message);
        this.statusCode = statusCode;
    }

    static throw(message:string, statusCode:number = 400) {
        throw new AppError(message, statusCode);
    }
}
