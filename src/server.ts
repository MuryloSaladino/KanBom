import AppDataSource from "./data-source"
import app from "./app";
import CloudinaryStorage from "./integrations/cloudinary";

const serverFacade = async () => {
    
    await AppDataSource.initialize();
    console.log("\n[SERVER]: \x1b[35mData source connected.\x1b[0m");

    CloudinaryStorage.configure()
    console.log("[SERVER]: \x1b[35mCloudinary services configured.\x1b[0m");

    const PORT:number = Number(process.env.APP_PORT) || 3000;
    app.listen(PORT, () => {
        console.log(`[SERVER]: Executing on \x1b[32mhttp://localhost:${PORT}/\x1b[0m`)
        
        if(process.env.NODE_ENV == "dev") {
            console.log(`[SERVER]: Access the docs at: \x1b[34mhttp://localhost:${PORT}/docs\x1b[0m`)
        }
    })
}

serverFacade()