# ArurHub V2

Premium Roblox Script Service — built with Next.js, React, and TypeScript.

## Getting Started

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the development server with live reload |
| `npm run build` | Build the app for production |
| `npm start` | Start the production server |
| `npm run lint` | Run ESLint |

## Project Structure

```
arursite/
├── components/     # Reusable React components
├── pages/          # Next.js pages (each file = a route)
│   ├── _app.tsx    # Global app wrapper
│   ├── _document.tsx
│   └── index.tsx   # Homepage (/)
├── public/         # Static assets (images, fonts, etc.)
├── styles/         # CSS modules and global styles
├── next.config.js
├── tsconfig.json
└── package.json
```

## Deployment

This project is deployed on [Vercel](https://vercel.com). Every push to `main` triggers an automatic rebuild and deployment.
