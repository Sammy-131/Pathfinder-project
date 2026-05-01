from fastapi import Header, HTTPException
from config import ADMIN_KEY_REPORT, ADMIN_KEY_BUILDING


def verify_admin(resource: str):
    def checker(x_admin_key: str = Header(...)):

        if resource == "report":
            keys = ADMIN_KEY_REPORT
        elif resource == "building":
            keys = ADMIN_KEY_BUILDING
        else:
            raise HTTPException(status_code=400, detail="Invalid resource")

        if x_admin_key not in keys:
            raise HTTPException(
                status_code=403,
                detail="Not authorized"
            )

        return True

    return checker