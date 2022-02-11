"""
--------------------------------------------------------------------------------
Description: [DESCRIBE WHAT FILE DOES HERE.]

Written by [AUTHOR NAME] [<AUTHOR EMAIL HERE>], [DATE HERE]
[PROJECT LICENCSE HERE]
--------------------------------------------------------------------------------
"""
from fastapi import FastAPI

# --------------------------- CONSTANT DECLARATION -----------------------------
app = FastAPI()


# --------------------------- STATEFUL OBJECTS -----------------------------

# ------------------------------ GENERIC UTILITY -------------------------------
@app.get("/echo/{ret_string}")
async def echo(ret_string: str):
    return {
        "message": f"{ret_string}",
    }
