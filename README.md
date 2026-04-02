# arursite

A Next.js website built with TypeScript.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or later recommended)
- npm (comes with Node.js)

### Installation

1. Clone the repository:

```bash
git clone https://github.com/auraarurski-byte/arursite.git
cd arursite
```

2. Install dependencies:

```bash
npm install
```

### Running Locally

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the site.

The page auto-updates as you edit files (hot module reloading).

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Build the app for production |
| `npm start` | Start the production server |
| `npm run lint` | Run ESLint to check code quality |

## Project Structure

```
arursite/
├── pages/
│   ├── _app.tsx       # App wrapper component
│   ├── _document.tsx  # HTML document setup
│   └── index.tsx      # Homepage
├── public/            # Static assets (images, favicon, etc.)
├── styles/
│   ├── globals.css    # Global styles
│   └── Home.module.css # Homepage styles
├── next.config.js     # Next.js configuration
├── tsconfig.json      # TypeScript configuration
└── package.json       # Dependencies and scripts
```

## Customization

- **Edit the homepage**: Modify `pages/index.tsx`
- **Add new pages**: Create new `.tsx` files in the `pages/` directory
- **Change styles**: Edit files in the `styles/` directory
- **Add static assets**: Place files in the `public/` directory

## Deployment

The easiest way to deploy is using [Vercel](https://vercel.com/), the platform from the creators of Next.js:

1. Push your code to GitHub
2. Import your repository at [vercel.com/new](https://vercel.com/new)
3. Vercel will detect Next.js and configure the build automatically

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Learn Next.js](https://nextjs.org/learn)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
