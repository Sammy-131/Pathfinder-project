"""Copy the data from the shared Neon database into local.db for fast local testing.

Usage (from the Backend folder):  python seed_local_db.py
Re-run any time you want a fresh copy. It overwrites local.db only, never Neon.
"""
import os
from dotenv import load_dotenv
from sqlalchemy import create_engine
from config import LOCAL_DATABASE_URL, LOCAL_DB_PATH
from database.session import Base
from models import building, room, report  # registers the tables on Base

load_dotenv()

# always read from Neon, even if USE_LOCAL_DB=1 is set
remote = create_engine(os.environ["DATABASE_URL"], connect_args={"connect_timeout": 10})

if os.path.exists(LOCAL_DB_PATH):
    os.remove(LOCAL_DB_PATH)
local = create_engine(LOCAL_DATABASE_URL)
Base.metadata.create_all(bind=local)

# sorted_tables puts buildings before rooms/reports (foreign keys)
with remote.connect() as src, local.begin() as dst:
    for table in Base.metadata.sorted_tables:
        rows = [dict(r._mapping) for r in src.execute(table.select())]
        if rows:
            dst.execute(table.insert(), rows)
        print(f"{table.name}: copied {len(rows)} rows")

print(f"Done -> {LOCAL_DB_PATH}")
