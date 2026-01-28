# QUICK START GUIDE

## Step 1: Test Backend Locally (5 minutes)

```bash
cd backend
npm install
npm start
```

Open browser: http://localhost:4000/health
Should see: `{"status":"healthy","service":"contact-api"}`

## Step 2: Test Frontend Locally (5 minutes)

```bash
cd frontend
npm install
npm run dev
```

Open browser: http://localhost:3000
Fill contact form and submit (will fail - backend needs CORS fix for local dev)

## Step 3: Docker - Backend Only (10 minutes)

```bash
cd backend
docker build -t portfolio-backend .
docker run -p 4000:4000 portfolio-backend
```

Test: http://localhost:4000/health

## Step 4: Docker - Frontend Only (10 minutes)

```bash
cd frontend
docker build -t portfolio-frontend .
docker run -p 3000:3000 -e NEXT_PUBLIC_API_URL=http://localhost:4000 portfolio-frontend
```

Test: http://localhost:3000

## Step 5: Docker Compose - All Services (5 minutes)

```bash
# From project root
docker-compose up --build
```

Access:
- Frontend: http://localhost:3000
- Backend: http://localhost:4000
- Nginx: http://localhost:80

## Step 6: Jenkins Setup (30 minutes)

### Install Jenkins

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

### Configure Jenkins

1. Open http://localhost:8080
2. Enter initial password
3. Install suggested plugins
4. Create admin user
5. Create new Pipeline job
6. Point to your Git repo
7. Set Script Path: jenkins/Jenkinsfile
8. Save and Build Now

## Step 7: Test Full CI/CD (10 minutes)

1. Make a change in frontend/src/app/page.js
2. Commit and push to Git
3. Trigger Jenkins build
4. Watch pipeline stages execute
5. Verify deployment at http://localhost:3000

## Verification Checklist

- [ ] Backend runs locally
- [ ] Frontend runs locally
- [ ] Backend Docker image builds
- [ ] Frontend Docker image builds
- [ ] Docker Compose starts all services
- [ ] Contact form submits successfully
- [ ] Jenkins installed and accessible
- [ ] Jenkins pipeline runs successfully
- [ ] Automated deployment works

## Common Issues

**Issue**: Port 3000 already in use
**Fix**: `docker-compose down` or change port in docker-compose.yml

**Issue**: Jenkins can't build Docker images
**Fix**: Ensure Docker socket is mounted correctly

**Issue**: Contact form fails
**Fix**: Check NEXT_PUBLIC_API_URL environment variable

**Issue**: Nginx 502 Bad Gateway
**Fix**: Ensure frontend and backend containers are running

## Next Learning Steps

1. Modify portfolio content
2. Add new API endpoint
3. Trigger Jenkins build
4. Watch automated deployment
5. Add tests to pipeline
6. Implement rollback strategy
