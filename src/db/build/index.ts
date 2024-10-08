import { exec } from 'child_process';
import "dotenv/config"

// Function to check if bash is available
const checkBash = (): Promise<boolean> => new Promise((resolve) => {
    exec('bash --version', (error) => resolve(!error));
});


// Function to run the PowerShell script
const runPowerShellScript = () => exec(
    `powershell.exe -ExecutionPolicy Bypass -File ${__dirname}/build.ps1`, 
    (error, stdout, stderr) => {
        if (error) {
            console.error(`Error executing PowerShell script: ${stderr}`);
        } else console.log(stdout);
    }
);


const main = async () => {
    const isBashAvailable = await checkBash();

    if (isBashAvailable) {
        exec(
            `bash ${__dirname}/build.sh`, 
            (error, stdout, stderr) => {
                if(error) {
                    console.error(`Error executing bash script: ${stderr}`);
                } else console.log(stdout);
            }
        );
    } else {
        runPowerShellScript();
    }
};

main();