export function getEnv(envName:string): string {
    const envValue = process.env[envName];
    
    if(!envValue) 
        throw new Error("Missing env variable: " + envName);

    return envValue;
}