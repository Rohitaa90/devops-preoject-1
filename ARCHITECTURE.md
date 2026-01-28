# ARCHITECTURE DIAGRAM

## System Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                         USER BROWSER                             │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             │ HTTP Request
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│                    NGINX REVERSE PROXY                           │
│                         (Port 80)                                │
│                                                                  │
│  Routes:                                                         │
│  • /api/*  → Backend Service                                    │
│  • /*      → Frontend Service                                   │
└──────────────────┬─────────────────────┬────────────────────────┘
                   │                     │
        ┌──────────▼──────────┐   ┌─────▼──────────┐
        │  FRONTEND SERVICE   │   │ BACKEND SERVICE │
        │     (Next.js)       │   │   (Express)     │
        │    Port 3000        │   │   Port 4000     │
        │                     │   │                 │
        │  • Portfolio UI     │   │  • REST API     │
        │  • Contact Form     │   │  • Validation   │
        │  • Client Routing   │   │  • Data Storage │
        └─────────────────────┘   └────────┬────────┘
                                           │
                                           │ File I/O
                                           ▼
                                  ┌────────────────┐
                                  │ contacts.json  │
                                  │ (File Storage) │
                                  └────────────────┘
```

## Docker Network Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                    portfolio-network (Bridge)                    │
│                                                                  │
│  ┌──────────────┐      ┌──────────────┐      ┌──────────────┐ │
│  │   nginx      │      │  frontend    │      │   backend    │ │
│  │ Container    │◄────►│  Container   │      │  Container   │ │
│  │              │      │              │◄────►│              │ │
│  └──────┬───────┘      └──────┬───────┘      └──────┬───────┘ │
│         │                     │                     │          │
└─────────┼─────────────────────┼─────────────────────┼──────────┘
          │                     │                     │
          │ Port 80             │ Port 3000           │ Port 4000
          │                     │                     │
┌─────────▼─────────────────────▼─────────────────────▼──────────┐
│                         HOST MACHINE                             │
│                      (Windows/Mac/Linux)                         │
└─────────────────────────────────────────────────────────────────┘
```

## CI/CD Pipeline Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                         DEVELOPER                                │
│                                                                  │
│  1. Write Code                                                   │
│  2. Commit & Push                                                │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│                      GIT REPOSITORY                              │
│                    (GitHub/GitLab)                               │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             │ Webhook/Poll
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│                    JENKINS PIPELINE                              │
│                                                                  │
│  Stage 1: Checkout                                               │
│  ├─ Clone repository                                             │
│  └─ Checkout branch                                              │
│                                                                  │
│  Stage 2: Build (Parallel)                                       │
│  ├─ Build Frontend Image ──┐                                    │
│  ├─ Build Backend Image  ──┼─► Docker Images                    │
│  └─ Build Nginx Image    ──┘                                    │
│                                                                  │
│  Stage 3: Test                                                   │
│  ├─ Start test containers                                        │
│  ├─ Run health checks                                            │
│  └─ Stop test containers                                         │
│                                                                  │
│  Stage 4: Deploy                                                 │
│  ├─ Stop old containers                                          │
│  ├─ Start new containers                                         │
│  └─ Verify deployment                                            │
│                                                                  │
│  Stage 5: Cleanup                                                │
│  └─ Remove old images                                            │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│                   RUNNING CONTAINERS                             │
│                    (Production/Local)                            │
└─────────────────────────────────────────────────────────────────┘
```

## Data Flow - Contact Form Submission

```
┌─────────────┐
│    USER     │
│  fills form │
└──────┬──────┘
       │
       │ 1. Submit Form
       ▼
┌─────────────────┐
│   FRONTEND      │
│  (ContactForm)  │
│                 │
│  • Validate     │
│  • Show loading │
└──────┬──────────┘
       │
       │ 2. POST /api/contact
       │    {name, email, message}
       ▼
┌─────────────────┐
│     NGINX       │
│  Reverse Proxy  │
│                 │
│  Route: /api/*  │
└──────┬──────────┘
       │
       │ 3. Forward to backend:4000
       ▼
┌─────────────────────┐
│     BACKEND         │
│  (Express API)      │
│                     │
│  • Validate data    │
│  • Generate ID      │
│  • Add timestamp    │
└──────┬──────────────┘
       │
       │ 4. Write to file
       ▼
┌─────────────────────┐
│  contacts.json      │
│  [                  │
│    {                │
│      id: 123,       │
│      name: "...",   │
│      email: "...",  │
│      message: "..." │
│    }                │
│  ]                  │
└──────┬──────────────┘
       │
       │ 5. Return success
       ▼
┌─────────────────────┐
│     FRONTEND        │
│  • Show success     │
│  • Clear form       │
└─────────────────────┘
```

## Docker Image Build Process

```
FRONTEND (Multi-stage)
┌─────────────────────────────────────────┐
│ Stage 1: Builder                        │
│ ┌─────────────────────────────────────┐ │
│ │ node:18-alpine                      │ │
│ │ • npm install (all deps)            │ │
│ │ • npm run build                     │ │
│ │ • Generate .next folder             │ │
│ └─────────────────────────────────────┘ │
│              │                          │
│              │ Copy artifacts           │
│              ▼                          │
│ Stage 2: Runner                         │
│ ┌─────────────────────────────────────┐ │
│ │ node:18-alpine                      │ │
│ │ • Copy only build output            │ │
│ │ • No dev dependencies               │ │
│ │ • Smaller final image               │ │
│ └─────────────────────────────────────┘ │
└─────────────────────────────────────────┘
         │
         ▼
   Final Image (~150MB)


BACKEND (Single-stage)
┌─────────────────────────────────────────┐
│ node:18-alpine                          │
│ • npm install --production              │
│ • Copy source code                      │
│ • Simple & fast                         │
└─────────────────────────────────────────┘
         │
         ▼
   Final Image (~120MB)
```

## Service Communication

```
Internal (Docker Network)
┌─────────────────────────────────────────┐
│  frontend:3000 ◄──► backend:4000        │
│       │                   │              │
│       └──────┬────────────┘              │
│              │                           │
│         nginx:80                         │
└─────────────────────────────────────────┘

External (Host Machine)
┌─────────────────────────────────────────┐
│  localhost:3000 → frontend              │
│  localhost:4000 → backend               │
│  localhost:80   → nginx                 │
└─────────────────────────────────────────┘
```

## File Structure Mapping

```
Project Root
│
├── frontend/
│   ├── Dockerfile ────────► Frontend Image
│   ├── src/ ──────────────► Application Code
│   └── package.json ──────► Dependencies
│
├── backend/
│   ├── Dockerfile ────────► Backend Image
│   ├── src/ ──────────────► API Code
│   └── package.json ──────► Dependencies
│
├── nginx/
│   ├── Dockerfile ────────► Nginx Image
│   └── nginx.conf ────────► Routing Rules
│
├── jenkins/
│   ├── Jenkinsfile ───────► Pipeline Definition
│   └── scripts/ ──────────► Build Scripts
│
└── docker-compose.yml ────► Orchestration
```

## Deployment States

```
State 1: Development
┌─────────────────────────────────────────┐
│  • Run services individually            │
│  • Hot reload enabled                   │
│  • Debug mode                           │
│  • Volume mounts for code               │
└─────────────────────────────────────────┘

State 2: Docker Compose (Local)
┌─────────────────────────────────────────┐
│  • All services in containers           │
│  • Isolated network                     │
│  • Production-like setup                │
│  • Easy testing                         │
└─────────────────────────────────────────┘

State 3: Jenkins CI/CD
┌─────────────────────────────────────────┐
│  • Automated builds                     │
│  • Automated tests                      │
│  • Automated deployment                 │
│  • Version control                      │
└─────────────────────────────────────────┘
```

## Key Design Decisions

```
┌─────────────────────────────────────────────────────────────┐
│ Decision              │ Reason                              │
├───────────────────────┼─────────────────────────────────────┤
│ Next.js (Frontend)    │ • Production optimized              │
│                       │ • Built-in routing                  │
│                       │ • Easy to containerize              │
├───────────────────────┼─────────────────────────────────────┤
│ Express (Backend)     │ • Minimal & simple                  │
│                       │ • Focus on DevOps, not backend      │
│                       │ • Easy to understand                │
├───────────────────────┼─────────────────────────────────────┤
│ File Storage          │ • No database complexity            │
│                       │ • Focus on Docker/Jenkins           │
│                       │ • Easy to inspect                   │
├───────────────────────┼─────────────────────────────────────┤
│ Nginx Proxy           │ • Production-like routing           │
│                       │ • Learn reverse proxy               │
│                       │ • Single entry point                │
├───────────────────────┼─────────────────────────────────────┤
│ Docker Compose        │ • Multi-container orchestration     │
│                       │ • No Kubernetes complexity          │
│                       │ • Perfect for learning              │
└───────────────────────┴─────────────────────────────────────┘
```
