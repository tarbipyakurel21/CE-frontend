# Cloud Crust Continuing Education Platform

A modern contractor continuing education platform built with Next.js, MongoDB, NextAuth (OAuth 2.0), and Stripe payments.

## Features

- NextAuth v5 authentication with Google OAuth 2.0
- MongoDB database with native driver
- Stripe payment integration
- Course management system
- User dashboard with progress tracking
- Certificate generation
- State-specific courses (MS & AL)
- Social login (Google) and traditional email/password authentication

## Getting Started

### Prerequisites

- Node.js 18+ installed
- MongoDB Atlas account or local MongoDB instance
- Stripe account for payments
- Google OAuth 2.0 credentials (optional, for social login)

### Installation

1. Clone the repository:
\`\`\`bash
git clone https://github.com/cloudcrust25-creator/Continuing-Education-.git
cd Continuing-Education-
\`\`\`

2. Install dependencies:
\`\`\`bash
npm install
\`\`\`

3. Set up environment variables:
\`\`\`bash
cp .env.local.example .env.local
\`\`\`

Then edit `.env.local` with your actual values.

### Environment Variables Setup

#### MongoDB Configuration

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster (free tier available)
3. Get your connection string and add it to `MONGODB_URI`

#### Google OAuth 2.0 Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable Google+ API
4. Go to "Credentials" → "Create Credentials" → "OAuth client ID"
5. Choose "Web application"
6. Add authorized redirect URIs:
   - `http://localhost:3000/api/auth/callback/google` (development)
   - `https://yourdomain.com/api/auth/callback/google` (production)
7. Copy the Client ID and Client Secret to your `.env.local`:
   \`\`\`
   GOOGLE_CLIENT_ID=your-client-id.apps.googleusercontent.com
   GOOGLE_CLIENT_SECRET=your-client-secret
   \`\`\`

#### NextAuth Secret

Generate a secure random string for `NEXTAUTH_SECRET`:
\`\`\`bash
openssl rand -base64 32
\`\`\`

#### Stripe Configuration

1. Go to [Stripe Dashboard](https://dashboard.stripe.com/)
2. Get your API keys from Developers → API keys
3. Add them to your `.env.local`
4. For webhooks, install Stripe CLI and run:
   \`\`\`bash
   stripe listen --forward-to localhost:3000/api/webhooks/stripe
   \`\`\`

### Initialize the Database

1. Start the development server:
\`\`\`bash
npm run dev
\`\`\`

2. Visit `http://localhost:3000/admin/setup` and click "Run Database Setup"

3. This will create all necessary collections and seed sample courses

### Running the Application

\`\`\`bash
npm run dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `MONGODB_URI` | MongoDB connection string | Yes |
| `MONGODB_DB_NAME` | Database name (default: cloud_crust) | Yes |
| `NEXTAUTH_URL` | Application URL for NextAuth | Yes |
| `NEXTAUTH_SECRET` | Secret key for NextAuth session encryption | Yes |
| `GOOGLE_CLIENT_ID` | Google OAuth 2.0 Client ID | No (for OAuth) |
| `GOOGLE_CLIENT_SECRET` | Google OAuth 2.0 Client Secret | No (for OAuth) |
| `JWT_SECRET` | Secret key for JWT token signing | Yes |
| `NEXT_PUBLIC_APP_URL` | Public application URL | Yes |
| `STRIPE_SECRET_KEY` | Stripe secret key | Yes |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Stripe publishable key | Yes |
| `STRIPE_WEBHOOK_SECRET` | Stripe webhook signing secret | Yes |

## Authentication

The platform supports two authentication methods:

1. **Email/Password**: Traditional signup with email and password
2. **Google OAuth 2.0**: One-click signup/login with Google account

Both methods use NextAuth v5 for session management and MongoDB for user storage.

## Tech Stack

- **Framework**: Next.js 16 with App Router and Turbopack
- **Database**: MongoDB with native driver
- **Authentication**: NextAuth v5 (Auth.js) with Google OAuth 2.0
- **Payments**: Stripe
- **UI**: Tailwind CSS v4 + shadcn/ui
- **Language**: TypeScript

## Project Structure

\`\`\`
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   │   ├── auth/          # NextAuth routes
│   │   ├── courses/       # Course API
│   │   └── webhooks/      # Stripe webhooks
│   ├── dashboard/         # User dashboard
│   ├── course/            # Course pages
│   ├── login/             # Login page
│   └── signup/            # Signup page
├── components/            # React components
│   ├── auth/              # Auth forms
│   └── ui/                # shadcn/ui components
├── lib/                   # Utilities and models
│   ├── models/           # MongoDB models
│   ├── auth/             # Auth configuration
│   ├── auth.ts           # NextAuth setup
│   └── mongodb.ts        # Database connection
└── public/               # Static assets
\`\`\`

## Features Overview

### For Students
- Browse courses by state (MS, AL)
- Add courses to cart
- Secure payment via Stripe
- Access purchased courses
- Track course progress
- Download certificates upon completion

### For Administrators
- Database setup and seeding
- Course management
- User enrollment tracking
- Payment processing via Stripe webhooks

## Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Import repository to Vercel
3. Add environment variables in Vercel dashboard
4. Update Google OAuth redirect URIs with production URL
5. Deploy

### Important Production Steps

1. Generate new secrets for production:
   \`\`\`bash
   openssl rand -base64 32
   \`\`\`

2. Update `NEXTAUTH_URL` to your production domain

3. Add production redirect URI to Google OAuth:
   \`\`\`
   https://yourdomain.com/api/auth/callback/google
   \`\`\`

4. Set up Stripe webhook endpoint:
   - Go to Stripe Dashboard → Webhooks
   - Add endpoint: `https://yourdomain.com/api/webhooks/stripe`
   - Select events: `checkout.session.completed`
   - Copy webhook secret to `STRIPE_WEBHOOK_SECRET`

## Support

For issues or questions, please open an issue on GitHub.

## License

MIT
