# Environment Variables Setup

The `.env*` files are gitignored for security. Create these files manually in the project root.

## .env.example

Create `.env.example` with the following content:

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

## .env.local

Create `.env.local` with your actual values (do not commit this file):

```env
# Database
DATABASE_URL="postgresql://your_user:your_password@localhost:5432/bookflow"

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

## Getting Clerk Keys

1. Go to [Clerk Dashboard](https://dashboard.clerk.com/)
2. Create a new application or select existing one
3. Copy API Keys from the API Keys section
4. Set up webhook in Clerk Dashboard pointing to `https://your-domain.com/api/webhooks/clerk`
5. Copy the webhook secret

## Database Setup

1. Install PostgreSQL
2. Create database: `createdb bookflow`
3. Update `DATABASE_URL` in `.env.local`
4. Run migrations: `npx prisma migrate dev`
5. Seed database: `npx prisma db seed`
