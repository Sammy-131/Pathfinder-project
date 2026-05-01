from fastapi import Header, HTTPException
from config import REPORT_ADMIN_KEYS, BUILDING_ADMIN_KEYS


def verify_admin(resource: str):
    def checker(x_admin_key: str = Header(...)):

        if resource == "report":
            keys = REPORT_ADMIN_KEYS
        elif resource == "building":
            keys = BUILDING_ADMIN_KEYS
        else:
            raise HTTPException(status_code=400, detail="Invalid resource")

        if x_admin_key not in keys:
            raise HTTPException(
                status_code=403,
                detail="Not authorized"
            )

        return True

    return checker