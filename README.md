# Welcome to Content Platform!

Content platform project based on a modern, production-ready template for building full-stack React applications using React Router powered by Vite.

Content platform is a web application featuring dynamic photo search, infinite scrolling, and an optimized user experience.

## Features
- 🔍 Image Search – Search for high-quality images from Pexels dynamically.
- 🖼 Virtualized Masonry Grid – Responsive and optimized image grid layout - without external libraries.
- 📸 Photo Details View – View large images with metadata, including photographer info.
- 📡 Infinite Scrolling – Seamless image loading for an uninterrupted browsing experience.
- 🛠 Error Handling – Graceful error boundaries for better UX.
- 🚀 Fast & Lightweight – Optimized with modern React best practices.

## Techical details

- Server-side rendering
- Styled components
- Hot Module Replacement (HMR)
- Asset bundling and optimization
- Data loading and mutations
- TypeScript by default
- Styled Components for styling
- [React Router docs](https://reactrouter.com/)

## Getting Started

### Installation

Install the dependencies:

```bash
npm install
```

### Development

Start the development server with HMR:

```bash
npm run dev
```

Your application will be available at `http://localhost:5173`.

## Building for Production

Create a production build:

```bash
npm run build
```

## Deployment

### Docker Deployment

This template includes three Dockerfiles optimized for different package managers:

- `Dockerfile` - for npm
- `Dockerfile.pnpm` - for pnpm
- `Dockerfile.bun` - for bun

To build and run using Docker:

```bash
# For npm
docker build -t my-app .

# For pnpm
docker build -f Dockerfile.pnpm -t my-app .

# For bun
docker build -f Dockerfile.bun -t my-app .

# Run the container
docker run -p 3000:3000 my-app
```

The containerized application can be deployed to any platform that supports Docker, including:

- AWS ECS
- Google Cloud Run
- Azure Container Apps
- Digital Ocean App Platform
- Fly.io
- Railway

---

Built by Sergei Almazov
