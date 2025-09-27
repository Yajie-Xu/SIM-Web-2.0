import io
import os
from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse, JSONResponse
from processors.week1_wordfreq import wordfreq_csv

from core.config import settings # core.config


ALLOWED = {".txt"}

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.ALLOWED_ORIGINS, allow_credentials=True,
    allow_methods=["*"], allow_headers=["*"],
)

@app.get("/health")
async def health():
    return {"ok": True}

@app.post("/process")
async def process(file: UploadFile = File(...)):
    name = file.filename or "upload.txt"
    _, ext = os.path.splitext(name.lower())
    if ext not in ALLOWED:
        raise HTTPException(400, detail="Only .txt files are allowed")
    try:
        text = (await file.read()).decode("utf-8")
    except UnicodeDecodeError:
        raise HTTPException(400, detail="File must be UTF-8 encoded")

    csv_bytes = wordfreq_csv(text)  # bytes
    filename = name.rsplit(".", 1)[0] + "_wordfreq.csv"
    return StreamingResponse(io.BytesIO(csv_bytes), media_type="text/csv",
                             headers={"Content-Disposition": f"attachment; filename={filename}"})


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)