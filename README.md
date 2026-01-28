# Portfolio Microservices - DevOps Learning Project

A microservices-based portfolio website for learning Docker, Jenkins, and CI/CD pipelines.

## Architecture

```
User → Nginx (Port 80) → Frontend (Port 3000)
                       → Backend (Port 4000)
```

## Services

- **Frontend**: Next.js portfolio SPA
- **Backend**: Express REST API for contact form
- **Nginx**: Reverse proxy for routing

## Prerequisites

- Docker Desktop installed
- Node.js 18+ (for local development)
- Jenkins (optional, for CI/CD)
- Git

## Quick Start

### 1. Local Development (Without Docker)

**Backend:**
```bash
cd backend
npm install
npm start
# Runs on http://localhost:4000
```

**Frontend:**
```bash
cd frontend
npm install
npm run dev
# Runs on http://localhost:3000
```

### 2. Docker Development

```bash
# Build and run all services
docker-compose up --build

# Access:
# - Frontend: http://localhost:3000
# - Backend: http://localhost:4000
# - Nginx: http://localhost:80
```

### 3. Production Build

```bash
docker-compose -f docker-compose.yml up --build -d
```

## Testing the Application

1. Open http://localhost:3000
2. Scroll to contact form
3. Fill in details and submit
4. Check backend: http://localhost:4000/api/contact

## Jenkins Setup

### Install Jenkins (Docker)

```bash
docker run -d -p 8080:8080 -p 50000:50000 \
  -v jenkins_home:/var/jenkins_home \
  -v /var/run/docker.sock:/var/run/docker.sock \
  --name jenkins \
  jenkins/jenkins:lts
```

### Configure Pipeline

1. Access Jenkins: http://localhost:8080
2. Create New Item → Pipeline
3. Pipeline Definition: Pipeline script from SCM
4. SCM: Git
5. Repository URL: [Your Git URL]
6. Script Path: jenkins/Jenkinsfile
7. Save and Build

## Project Structure

```
portfolio-microservices/
├── frontend/              # Next.js service
│   ├── src/
│   ├── Dockerfile
│   └── package.json
├── backend/               # Express API service
│   ├── src/
│   ├── Dockerfile
│   └── package.json
├── nginx/                 # Reverse proxy
│   ├── nginx.conf
│   └── Dockerfile
├── jenkins/
│   ├── Jenkinsfile       # CI/CD pipeline
│   └── scripts/
└── docker-compose.yml
```

## Learning Checkpoints

### ✅ Checkpoint 1: Docker Basics
- Build individual Dockerfiles
- Run containers manually
- Understand port mapping

### ✅ Checkpoint 2: Docker Compose
- Multi-container orchestration
- Service networking
- Volume management

### ✅ Checkpoint 3: Jenkins Setup
- Install Jenkins
- Create pipeline job
- Understand pipeline stages

### ✅ Checkpoint 4: CI/CD Pipeline
- Automated builds
- Parallel execution
- Health checks

### ✅ Checkpoint 5: Deployment
- Automated deployment
- Container orchestration
- Verification steps

## Useful Commands

```bash
# View running containers
docker ps

# View logs
docker logs portfolio-frontend
docker logs portfolio-backend

# Rebuild specific service
docker-compose up --build frontend

# Stop all services
docker-compose down

# Remove all images
docker-compose down --rmi all

# View backend data
cat backend/src/data/contacts.json
```

## API Endpoints

### Backend (Port 4000)

- `GET /health` - Health check
- `POST /api/contact` - Submit contact form
- `GET /api/contact` - Get all contacts

### Example Request

```bash
curl -X POST http://localhost:4000/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"John","email":"john@example.com","message":"Hello"}'
```

## Troubleshooting

**Port already in use:**
```bash
docker-compose down
netstat -ano | findstr :3000
```

**Container won't start:**
```bash
docker logs [container-name]
docker-compose up --build
```

**Jenkins can't access Docker:**
- Ensure Docker socket is mounted
- Run Jenkins with Docker group permissions

## Next Steps

1. Add database service (PostgreSQL)
2. Implement authentication
3. Add monitoring (Prometheus/Grafana)
4. Deploy to cloud (AWS/Azure)
5. Add Kubernetes orchestration

## License

MIT - Learning Project
