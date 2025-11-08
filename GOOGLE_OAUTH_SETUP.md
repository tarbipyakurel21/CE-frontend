# Google OAuth 2.0 Setup Guide

This guide will help you set up Google OAuth 2.0 authentication for the Cloud Crust platform.

## Step 1: Create a Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Click on the project dropdown at the top
3. Click "New Project"
4. Enter project name: "Cloud Crust Education" (or your preferred name)
5. Click "Create"

## Step 2: Enable Google+ API

1. In the Google Cloud Console, go to "APIs & Services" → "Library"
2. Search for "Google+ API"
3. Click on it and click "Enable"

## Step 3: Configure OAuth Consent Screen

1. Go to "APIs & Services" → "OAuth consent screen"
2. Choose "External" user type
3. Click "Create"
4. Fill in the required information:
   - **App name**: Cloud Crust Continuing Education
   - **User support email**: your-email@example.com
   - **Developer contact email**: your-email@example.com
5. Click "Save and Continue"
6. Skip "Scopes" (click "Save and Continue")
7. Add test users (your email for testing)
8. Click "Save and Continue"

## Step 4: Create OAuth 2.0 Credentials

1. Go to "APIs & Services" → "Credentials"
2. Click "Create Credentials" → "OAuth client ID"
3. Choose "Web application"
4. Configure:
   - **Name**: Cloud Crust Web Client
   - **Authorized JavaScript origins**:
     - `http://localhost:3000` (for development)
     - `https://yourdomain.com` (for production)
   - **Authorized redirect URIs**:
     - `http://localhost:3000/api/auth/callback/google` (for development)
     - `https://yourdomain.com/api/auth/callback/google` (for production)
5. Click "Create"
6. Copy the **Client ID** and **Client Secret**

## Step 5: Add Credentials to Your Project

1. Open your `.env.local` file
2. Add the credentials:
   \`\`\`env
   GOOGLE_CLIENT_ID=your-client-id-here.apps.googleusercontent.com
   GOOGLE_CLIENT_SECRET=your-client-secret-here
   \`\`\`

## Step 6: Test the Integration

1. Start your development server:
   \`\`\`bash
   npm run dev
   \`\`\`

2. Go to `http://localhost:3000/login`
3. Click "Continue with Google"
4. Sign in with your Google account
5. You should be redirected to the dashboard

## Troubleshooting

### Error: redirect_uri_mismatch

**Solution**: Make sure the redirect URI in Google Cloud Console exactly matches:
- `http://localhost:3000/api/auth/callback/google` (no trailing slash)

### Error: Access blocked: This app's request is invalid

**Solution**: Make sure you've:
1. Enabled Google+ API
2. Configured the OAuth consent screen
3. Added your email as a test user

### Users can't log in (not test users)

**Solution**: 
1. Go to OAuth consent screen
2. Click "Publish App" to make it available to all users
3. Or add specific users to the test users list

## Production Deployment

When deploying to production:

1. Add your production domain to "Authorized JavaScript origins":
   \`\`\`
   https://yourdomain.com
   \`\`\`

2. Add your production callback URL to "Authorized redirect URIs":
   \`\`\`
   https://yourdomain.com/api/auth/callback/google
   \`\`\`

3. Update your production environment variables in Vercel/your hosting platform

4. Consider publishing your OAuth consent screen for public access

## Security Best Practices

1. Never commit your `.env.local` file to Git
2. Use different OAuth credentials for development and production
3. Regularly rotate your client secrets
4. Monitor OAuth usage in Google Cloud Console
5. Set up proper scopes (only request what you need)

## Additional Resources

- [NextAuth.js Google Provider Documentation](https://next-auth.js.org/providers/google)
- [Google OAuth 2.0 Documentation](https://developers.google.com/identity/protocols/oauth2)
- [Google Cloud Console](https://console.cloud.google.com/)
