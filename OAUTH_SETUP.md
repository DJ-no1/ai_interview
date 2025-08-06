# OAuth Configuration Guide

## Current Status

OAuth authentication (Google and GitHub) is currently **disabled** in the application to avoid configuration errors. Users can register and login using email/password or OTP.

## To Enable OAuth (Optional)

If you want to enable Google and GitHub OAuth authentication, follow these steps:

### 1. Configure Supabase OAuth Settings

1. Go to your [Supabase Dashboard](https://supabase.com/dashboard)
2. Select your project
3. Navigate to **Authentication** > **Settings**
4. Go to **Auth Providers** section

### 2. Enable Google OAuth

1. In Auth Providers, find **Google**
2. Toggle it **ON**
3. Add your Google OAuth credentials:
   - **Client ID**: Get from [Google Cloud Console](https://console.cloud.google.com/)
   - **Client Secret**: Get from Google Cloud Console
4. Add your redirect URL: `https://your-project-ref.supabase.co/auth/v1/callback`

### 3. Enable GitHub OAuth

1. In Auth Providers, find **GitHub**
2. Toggle it **ON**
3. Add your GitHub OAuth credentials:
   - **Client ID**: Get from [GitHub Developer Settings](https://github.com/settings/developers)
   - **Client Secret**: Get from GitHub Developer Settings
4. Add your callback URL: `https://your-project-ref.supabase.co/auth/v1/callback`

### 4. Enable OAuth in Code

Once your Supabase OAuth providers are configured:

1. In `src/components/auth/RegisterForm.tsx`, change:

   ```tsx
   {false && (
   ```

   to:

   ```tsx
   {true && (
   ```

2. In `src/components/auth/LoginForm.tsx`, make the same change

### 5. Test OAuth Flow

1. Restart your development server
2. Try registering/logging in with Google or GitHub
3. Verify the auth flow works correctly

## Alternative: Email-Only Authentication

The current setup with email/password and OTP authentication is fully functional and production-ready. OAuth is optional for enhanced user experience.
