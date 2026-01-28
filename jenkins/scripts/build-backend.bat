@echo off
echo Building Backend Image...
cd ../backend
docker build -t portfolio-backend:%1 .
docker tag portfolio-backend:%1 portfolio-backend:latest
echo Backend build complete!
