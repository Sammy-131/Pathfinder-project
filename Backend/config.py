from dotenv import load_dotenv
import os

load_dotenv()  

DATABASE_URL = os.getenv("DATABASE_URL")

# Set USE_LOCAL_DB=1 in your own .env to use a local SQLite copy instead of Neon
# (much faster for testing). Run seed_local_db.py once to fill it with data.
LOCAL_DB_PATH = os.path.join(os.path.dirname(os.path.abspath(__file__)), "local.db")
LOCAL_DATABASE_URL = f"sqlite:///{LOCAL_DB_PATH}"

if os.getenv("USE_LOCAL_DB") == "1":
    DATABASE_URL = LOCAL_DATABASE_URL


# -------------------------
# ADMIN KEYS (Reports)
# -------------------------
ADMIN_KEY_REPORT = [
    k.strip()
    for k in os.getenv("ADMIN_KEY_REPORT", "").split(",")
    if k.strip()
]

# -------------------------
# BUILDING ADMIN KEYS
# -------------------------
ADMIN_KEY_BUILDING = [
    k.strip()
    for k in os.getenv("ADMIN_KEY_BUILDING", "").split(",")
    if k.strip()
]