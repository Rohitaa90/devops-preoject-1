# 🚀 COMMAND CHEAT SHEET

## Quick Reference for Common Tasks

---

## 🏃 Quick Start Commands

### Run Everything (Fastest Way)
```bash
docker-compose up --build
```

### Run in Background
```bash
docker-compose up -d
```

### Stop Everything
```bash
docker-compose down
```

---

## 🐳 Docker Commands

### Build Images
```bash
# Backend
docker build -t portfolio-backend ./backend

# Frontend
docker build -t portfolio-frontend ./frontend

# Nginx
docker build -t portfolio-nginx ./nginx
```

### Run Containers
```bash
# Backend
docker run -p 4000:4000 portfolio-backend

# Frontend
docker run -p 3000:3000 portfolio-frontend

# Nginx
docker run -p 80:80 portfolio-nginx
```

### View Running Containers
```bash
docker ps
```

### View All Containers (including stopped)
```bash
docker ps -a
```

### View Logs
```bash
# Specific container
docker logs portfolio-backend

# Follow logs (live)
docker logs -f portfolio-backend

# Last 100 lines
docker logs --tail 100 portfolio-backend
```

### Stop Containers
```bash
docker stop portfolio-backend
docker stop portfolio-frontend
docker stop portfolio-nginx
```

### Remove Containers
```bash
docker rm portfolio-backend
docker rm portfolio-frontend
docker rm portfolio-nginx
```

### Remove Images
```bash
docker rmi portfolio-backend
docker rmi portfolio-frontend
docker rmi portfolio-nginx
```

### Clean Up Everything
```bash
# Remove stopped containers
docker container prune

# Remove unused images
docker image prune

# Remove everything (CAREFUL!)
docker system prune -a
```

---

## 🎼 Docker Compose Commands

### Start Services
```bash
# Build and start
docker-compose up --build

# Start without building
docker-compose up

# Start in background
docker-compose up -d

# Start specific service
docker-compose up frontend
```

### Stop Services
```bash
# Stop all
docker-compose down

# Stop and remove volumes
docker-compose down -v

# Stop and remove images
docker-compose down --rmi all
```

### View Logs
```bash
# All services
docker-compose logs

# Specific service
docker-compose logs backend

# Follow logs
docker-compose logs -f

# Last 50 lines
docker-compose logs --tail 50
```

### Restart Services
```bash
# Restart all
docker-compose restart

# Restart specific service
docker-compose restart backend
```

### Rebuild Services
```bash
# Rebuild all
docker-compose build

# Rebuild specific service
docker-compose build frontend

# Rebuild without cache
docker-compose build --no-cache
```

### Execute Commands in Container
```bash
# Open shell
docker-compose exec backend sh

# Run command
docker-compose exec backend npm install
```

---

## 💻 Local Development Commands

### Backend
```bash
cd backend
npm install          # Install dependencies
npm start           # Start server (port 4000)
npm run dev         # Development mode
```

### Frontend
```bash
cd frontend
npm install          # Install dependencies
npm run dev         # Development mode (port 3000)
npm run build       # Production build
npm start           # Start production server
```

---

## 🔧 Jenkins Commands

### Install Jenkins (Docker)
```bash
docker run -d -p 8080:8080 -p 50000:50000 ^
  -v jenkins_home:/var/jenkins_home ^
  -v //var/run/docker.sock:/var/run/docker.sock ^
  --name jenkins ^
  jenkins/jenkins:lts
```

### Get Initial Password
```bash
docker exec jenkins cat /var/jenkins_home/secrets/initialAdminPassword
```

### View Jenkins Logs
```bash
docker logs jenkins
docker logs -f jenkins
```

### Restart Jenkins
```bash
docker restart jenkins
```

### Stop Jenkins
```bash
docker stop jenkins
```

### Remove Jenkins
```bash
docker stop jenkins
docker rm jenkins
```

---

## 🧪 Testing Commands

### Test Backend API
```bash
# Health check
curl http://localhost:4000/health

# Get all contacts
curl http://localhost:4000/api/contact

# Submit contact (POST)
curl -X POST http://localhost:4000/api/contact ^
  -H "Content-Type: application/json" ^
  -d "{\"name\":\"Test\",\"email\":\"test@example.com\",\"message\":\"Hello\"}"
```

### Test Frontend
```bash
# Open in browser
start http://localhost:3000

# Or use curl
curl http://localhost:3000
```

### Test Nginx
```bash
curl http://localhost:80
```

---

## 🔍 Debugging Commands

### Check Port Usage
```bash
# Windows
netstat -ano | findstr :3000
netstat -ano | findstr :4000
netstat -ano | findstr :80

# Kill process by PID
taskkill /PID <PID> /F
```

### Inspect Container
```bash
docker inspect portfolio-backend
```

### View Container Stats
```bash
docker stats
```

### Check Docker Networks
```bash
docker network ls
docker network inspect portfolio-network
```

### Check Docker Volumes
```bash
docker volume ls
docker volume inspect jenkins_home
```

### Enter Container Shell
```bash
# Alpine-based (backend, frontend)
docker exec -it portfolio-backend sh

# Debian-based
docker exec -it container-name bash
```

### View Container Processes
```bash
docker top portfolio-backend
```

---

## 📦 Build & Deploy Workflow

### Full Workflow
```bash
# 1. Make code changes
# 2. Test locally
cd backend
npm run dev

# 3. Build Docker images
docker-compose build

# 4. Test in containers
docker-compose up

# 5. Verify
curl http://localhost:4000/health
curl http://localhost:3000

# 6. Commit changes
git add .
git commit -m "Your message"
git push

# 7. Trigger Jenkins build (manual or automatic)
```

---

## 🎯 Common Workflows

### Workflow: Fresh Start
```bash
docker-compose down
docker system prune -f
docker-compose up --build
```

### Workflow: Update Backend Only
```bash
docker-compose stop backend
docker-compose build backend
docker-compose up -d backend
```

### Workflow: Update Frontend Only
```bash
docker-compose stop frontend
docker-compose build frontend
docker-compose up -d frontend
```

### Workflow: View All Logs
```bash
docker-compose logs -f
```

### Workflow: Clean Everything
```bash
docker-compose down --rmi all -v
docker system prune -a -f
```

---

## 🚨 Emergency Commands

### Everything Broken? Nuclear Option
```bash
# Stop all containers
docker stop $(docker ps -aq)

# Remove all containers
docker rm $(docker ps -aq)

# Remove all images
docker rmi $(docker images -q)

# Remove all volumes
docker volume rm $(docker volume ls -q)

# Start fresh
docker-compose up --build
```

### Port Already in Use?
```bash
# Find and kill process
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Or change port in docker-compose.yml
```

### Out of Disk Space?
```bash
docker system prune -a -f
docker volume prune -f
```

---

## 📊 Monitoring Commands

### Check Resource Usage
```bash
docker stats
```

### Check Disk Usage
```bash
docker system df
```

### Check Container Health
```bash
docker ps --format "table {{.Names}}\t{{.Status}}"
```

---

## 🎓 Learning Commands

### Explore Container Filesystem
```bash
docker exec -it portfolio-backend sh
ls -la
cat /app/src/index.js
```

### Compare Image Sizes
```bash
docker images --format "table {{.Repository}}\t{{.Size}}"
```

### View Build History
```bash
docker history portfolio-frontend
```

---

## 💡 Pro Tips

### Alias for Common Commands (Add to .bashrc or .zshrc)
```bash
alias dcu="docker-compose up"
alias dcd="docker-compose down"
alias dcb="docker-compose build"
alias dcl="docker-compose logs -f"
alias dps="docker ps"
alias dpa="docker ps -a"
```

### One-Liner to Restart Everything
```bash
docker-compose down && docker-compose up --build -d && docker-compose logs -f
```

### Quick Health Check
```bash
curl http://localhost:4000/health && curl http://localhost:3000 && echo "All services healthy!"
```

---

## 📱 Quick Access URLs

```
Frontend:  http://localhost:3000
Backend:   http://localhost:4000
Nginx:     http://localhost:80
Jenkins:   http://localhost:8080

Backend Health:  http://localhost:4000/health
Backend API:     http://localhost:4000/api/contact
```

---

## 🎯 Daily Development Commands

### Morning Routine
```bash
docker-compose up -d
docker-compose logs -f
```

### During Development
```bash
# Make changes
# Test locally
npm run dev

# Build and test in Docker
docker-compose build service-name
docker-compose up service-name
```

### End of Day
```bash
docker-compose down
```

---

## 🏆 Mastery Checklist

- [ ] Can run all services without looking at docs
- [ ] Can debug container issues using logs
- [ ] Can rebuild specific services
- [ ] Can clean up Docker resources
- [ ] Can test APIs using curl
- [ ] Can inspect running containers
- [ ] Can modify and redeploy quickly

---

**Print this file and keep it handy! 📄**
