import AppDataSource from "./data-source"
import app from "./app";

const serverFacade = async () => {
    
    await AppDataSource.initialize();
    console.log("\n\x1b[35mData source connected\x1b[0m");

    const PORT:number = Number(process.env.APP_PORT) || 3000;
    app.listen(PORT, () => {
        console.log(`\nServer executing on \x1b[32mhttp://localhost:${PORT}/\x1b[0m`)
        
        if(process.env.NODE_ENV == "dev") {
            console.log(`Access the docs at: \x1b[34mhttp://localhost:${PORT}/docs\x1b[0m`)
        }
    })
}

serverFacade()