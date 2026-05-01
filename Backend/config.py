from dotenv import load_dotenv
import os

load_dotenv()  

DATABASE_URL = os.getenv("DATABASE_URL")


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