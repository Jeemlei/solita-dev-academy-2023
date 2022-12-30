# Frontend
Run all the commands in the `frontend`-directory.
## Installation
Requires Node version 16+ and npm.

Install depedencies
```bash
npm install
```

### Development mode
Backend needs to be running.

Provide following environment variables in `.env`-file:
```
REACT_APP_BACKEND_URL=<Backend URL>
NODE_ENV='development'
```
Start frontend with:
```bash
npm start
```

### Production build
Create production build into backend static folder:
```bash
npm run build:full
```