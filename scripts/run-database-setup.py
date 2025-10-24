import os
import subprocess

print("[v0] Starting database setup...")

# Get the Supabase connection string
db_url = os.environ.get('SUPABASE_POSTGRES_URL')

if not db_url:
    print("[v0] Error: SUPABASE_POSTGRES_URL environment variable not found")
    exit(1)

print("[v0] Found database URL")

# Read and execute the SQL files
sql_files = [
    'scripts/01-create-tables.sql',
    'scripts/02-seed-courses.sql'
]

for sql_file in sql_files:
    print(f"[v0] Executing {sql_file}...")
    
    with open(sql_file, 'r') as f:
        sql_content = f.read()
    
    # Use psql to execute the SQL
    process = subprocess.run(
        ['psql', db_url, '-c', sql_content],
        capture_output=True,
        text=True
    )
    
    if process.returncode == 0:
        print(f"[v0] ✓ Successfully executed {sql_file}")
    else:
        print(f"[v0] ✗ Error executing {sql_file}:")
        print(process.stderr)
        exit(1)

print("[v0] Database setup complete!")
