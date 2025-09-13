# HackBeanpot Application Portal

This is the application portal for HackBeanpot hackathon, migrated to work with Node v24 and the turbo repo structure.

## Features

- User authentication with NextAuth.js
- Application form submission
- Admin dashboard for managing applicants
- Post-acceptance form handling
- MongoDB integration
- SCSS styling support

## Getting Started

1. Install dependencies:

   ```bash
   yarn install
   ```

2. Set up environment variables:

   ```bash
   cp .env.example .env.local
   ```

   Fill in the required environment variables in `.env.local`.

3. Start the development server:
   ```bash
   yarn dev
   ```

## Environment Variables

- `MONGODB_URI`: MongoDB connection string
- `NEXTAUTH_URL`: Your application URL
- `NEXTAUTH_SECRET`: Secret key for NextAuth
- `EMAIL_SERVER_*`: Email configuration for authentication
- `GOOGLE_CLOUD_*`: Optional Google Cloud Storage configuration
- `ROLLBAR_CLIENT_TOKEN`: Optional Rollbar error tracking

## Scripts

- `yarn dev`: Start development server
- `yarn build`: Build for production
- `yarn start`: Start production server
- `yarn lint`: Run ESLint
- `yarn type-check`: Run TypeScript type checking

## Migration Notes

This application has been migrated from the original application-portal repository to work with:

- Node v24
- Next.js 14 with App Router
- Turbo repo structure
- Updated dependencies for compatibility

The original functionality has been preserved while updating the codebase to work with modern tooling and the turbo repo architecture.
