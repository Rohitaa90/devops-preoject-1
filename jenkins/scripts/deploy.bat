@echo off
echo Stopping existing containers...
docker-compose down

echo Starting new containers...
docker-compose up -d

echo Waiting for services to start...
timeout /t 10 /nobreak

echo Verifying deployment...
curl http://localhost:4000/health
curl http://localhost:3000

echo Deployment complete!
