import AppDataSource from "./data-source"
import app from "./app";
import User from "./entities/User.entity";
import { UserRole } from "./enums/UserRole";

const serverFacade = async () => {
    
    await AppDataSource.initialize();
    console.log("\nData source connected.");

    const PORT:number = Number(process.env.APP_PORT) || 3000;
    app.listen(PORT, () => {
        console.log(`\nServer executing on http://localhost:${PORT}/`)
    })

    const user = new User()
    user.email = "email"
    user.role = UserRole.ADMIN
    const repo = AppDataSource.getRepository(User)
    const creation = repo.create(user)
    await repo.save(creation) 
}

serverFacade()