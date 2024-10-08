$SCRIPT_DIR = Split-Path -Parent $MyInvocation.MyCommand.Path 

# Set the password for PostgreSQL connection
$env:PGPASSWORD = $env:DB_PASSWORD

# Define the command to create a plain SQL dump
$pgDumpCommand = "pg_dump -U $env:DB_USERNAME -h $env:DB_HOST -Fp $env:DB_NAME"

# Execute the command and redirect output to a .sql file
Invoke-Expression "$pgDumpCommand > $SCRIPT_DIR\..\data.sql"

Write-Host "Database dump saved!"