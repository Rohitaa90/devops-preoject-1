@echo off
echo Building Frontend Image...
cd ../frontend
docker build -t portfolio-frontend:%1 .
docker tag portfolio-frontend:%1 portfolio-frontend:latest
echo Frontend build complete!
