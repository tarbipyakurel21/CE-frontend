# Cloud Crust Continuing Education Platform

A modern contractor continuing education platform built with Next.js, MongoDB, and JWT authentication.

## Features

- JWT-based authentication
- MongoDB database with Mongoose ODM
- Stripe payment integration
- Course management system
- User dashboard with progress tracking
- Certificate generation
- State-specific courses (MS & AL)

## Getting Started

### Prerequisites

- Node.js 18+ installed
- MongoDB Atlas account or local MongoDB instance
- Stripe account for payments

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

Then edit `.env.local` with your actual values:
- `MONGODB_URI`: Your MongoDB connection string
- `JWT_SECRET`: A secure random string for JWT signing
- `STRIPE_SECRET_KEY`: Your Stripe secret key
- `STRIPE_PUBLISHABLE_KEY`: Your Stripe publishable key

4. Initialize the database:
\`\`\`bash
npm run dev
\`\`\`

Visit `http://localhost:3000/admin/setup` and click "Run Database Setup"

5. Start the development server:
\`\`\`bash
npm run dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Environment Variables

| Variable | Description |
|----------|-------------|
| `MONGODB_URI` | MongoDB connection string |
| `MONGODB_DB_NAME` | Database name (default: cloud_crust) |
| `JWT_SECRET` | Secret key for JWT token signing |
| `NEXT_PUBLIC_APP_URL` | Application URL for redirects |
| `STRIPE_SECRET_KEY` | Stripe secret key |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Stripe publishable key |
| `STRIPE_WEBHOOK_SECRET` | Stripe webhook signing secret |

## Tech Stack

- **Framework**: Next.js 16 with App Router
- **Database**: MongoDB with native driver
- **Authentication**: JWT (JSON Web Tokens)
- **Payments**: Stripe
- **UI**: Tailwind CSS + shadcn/ui
- **Language**: TypeScript

## Project Structure

\`\`\`
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   ├── auth/              # Auth pages
│   ├── dashboard/         # User dashboard
│   └── course/            # Course pages
├── components/            # React components
├── lib/                   # Utilities and models
│   ├── models/           # MongoDB models
│   ├── auth/             # JWT utilities
│   └── mongodb.ts        # Database connection
└── public/               # Static assets
\`\`\`

## License

MIT
