#!/bin/bash
TAG=v1
DOCKER_HUB=rachata14/l03-fastapi-redis:$TAG 

# คำสั่ง Build Image จาก Dockerfile ในโฟลเดอร์ปัจจุบัน
docker build -t $DOCKER_HUB . 

# คำสั่ง Push Image ไปยัง Docker Hub
docker push $DOCKER_HUB
