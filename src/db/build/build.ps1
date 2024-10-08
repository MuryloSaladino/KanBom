$SCRIPT_DIR = Split-Path -Parent $MyInvocation.MyCommand.Path

# Set the password for PostgreSQL connection
$env:PGPASSWORD = $env:DB_PASSWORD

# Define the path to the .sql dump file
$sqlFile = "$SCRIPT_DIR\..\data.sql"

# Define the command to restore the database from the SQL file
$psqlCommand = "psql -U $env:DB_USERNAME -h $env:DB_HOST -d $env:DB_NAME -f $sqlFile"

# Execute the command to restore the database
Invoke-Expression $psqlCommand

Write-Host "Database populated successfully!"