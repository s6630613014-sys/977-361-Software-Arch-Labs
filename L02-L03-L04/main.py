from typing import Optional
from fastapi import FastAPI
from redis import Redis

  app = FastAPI()

# เชื่อมต่อกับ Redis โดยใช้ชื่อเซอร์วิส "redis" เป็น Hostname
redis_client = Redis(host='redis', port=6379)

# Endpoint หลักที่ Frontend (index.html) จะเรียกใช้ผ่าน /api
@app.get("/")
def read_root():
    # 1. เพิ่มค่าตัวนับใน Redis
    try:
        # ใช้ incr เพื่อเพิ่มค่า และรับค่าใหม่ (เป็น bytes)
        count_bytes = redis_client.incr('counter_key')
        
        # แปลงค่าจาก bytes เป็น integer
        count = int(count_bytes)
        
    except Exception as e:
        # กรณีที่เชื่อมต่อ Redis ไม่ได้ (เช่น Redis ยังไม่พร้อม)
        return {"error": f"Redis connection failed: {e}", "count": 0}

    # 2. ส่งค่าตัวนับใหม่กลับไปยัง Frontend

    return {"message": "V2: This response is from the master branch.", "count": count}

    return {"message": "V2: This response is from the feature branch.", "count": count}

read_root()

# Endpoint สำหรับ Health Check
@app.get("/health")
def health_check():
    return {"status": "ok"}
    

