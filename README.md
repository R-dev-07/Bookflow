# BookFlow

A modern event booking platform built with Next.js, Clerk authentication, Prisma ORM, and PostgreSQL.

## Features

- **User Dashboard**: Browse venues and services, create bookings, manage shortlists
- **Provider Dashboard**: Manage listings, handle booking requests, communicate with clients
- **Admin Dashboard**: Moderate content, manage users, resolve disputes
- **Real-time Messaging**: Built-in messaging between users and providers
- **Review System**: Rate and review venues and services
- **Role-based Access**: USER, PROVIDER, and ADMIN roles with appropriate permissions

## Tech Stack

- **Frontend**: Next.js 16, React 19, TypeScript
- **Styling**: Tailwind CSS v4 with custom design system
- **Authentication**: Clerk
- **Database**: PostgreSQL with Prisma ORM
- **Animations**: Framer Motion
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL 14+
- Clerk account (for authentication)

### Installation

1. Clone the repository
2. Install dependencies:
```bash
npm install
```

### Environment Setup

Create a `.env.local` file in the project root with the following variables:

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/bookflow"

# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="your_clerk_publishable_key"
CLERK_SECRET_KEY="your_clerk_secret_key"
NEXT_PUBLIC_CLERK_SIGN_IN_URL="/sign-in"
NEXT_PUBLIC_CLERK_SIGN_UP_URL="/sign-up"
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL="/dashboard"
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL="/dashboard"

# Clerk Webhook
CLERK_WEBHOOK_SECRET="your_clerk_webhook_secret"

# Application
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

See `ENV_SETUP.md` for detailed instructions on getting Clerk keys and setting up the database.

### Database Setup

1. Create a PostgreSQL database:
```bash
createdb bookflow
```

2. Run Prisma migrations:
```bash
npx prisma migrate dev
```

3. Seed the database with sample data:
```bash
npm run db:seed
```

### Running the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── app/
│   ├── (marketing)/     # Public marketing pages
│   ├── (user)/          # User dashboard and booking pages
│   ├── (provider)/      # Provider dashboard and management
│   ├── (admin)/         # Admin dashboard and moderation
│   ├── actions/         # Server actions for database operations
│   └── api/             # API routes (webhooks, etc.)
├── components/
│   ├── ui/              # Reusable UI components
│   └── layout/          # Layout components (navbar, footer, sidebars)
├── lib/
│   ├── auth.ts          # Authentication helpers
│   ├── prisma.ts        # Prisma client singleton
│   └── utils.ts         # Utility functions
└── middleware.ts        # Next.js middleware for route protection
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm run db:seed` - Seed database with sample data

## Design System

BookFlow uses a custom dark theme design system:
- **Primary Color**: Electric Emerald (#10b981)
- **Background**: Obsidian (#0a0a0a)
- **Surface**: Various shades of dark gray
- **Accent**: Vibrant green for CTAs and highlights

See `globals.css` and `tailwind.config.ts` for design tokens.

## License

MIT
