# Deploy Smart Recipe Generator to Render

This guide will help you deploy your Smart Recipe Generator application to Render.

## Prerequisites

1. A GitHub account with your code pushed to a repository
2. A Render account (sign up at [render.com](https://render.com))

## Deployment Steps

### Step 1: Push Your Code to GitHub

If you haven't already, push your code to a GitHub repository:

```bash
# Initialize git repository (if not already done)
git init

# Add all files
git add .

# Commit your changes
git commit -m "Initial commit with Render deployment config"

# Add your GitHub repository as remote (replace with your actual repo URL)
git remote add origin https://github.com/yourusername/smart-recipe-generator.git

# Push to GitHub
git push -u origin main
```

### Step 2: Deploy to Render

1. **Log in to Render**
   - Go to [render.com](https://render.com)
   - Sign in or create a new account

2. **Create a New Web Service**
   - Click "New +" in the top navigation
   - Select "Web Service"

3. **Connect Your Repository**
   - Choose "Build and deploy from a Git repository"
   - Connect your GitHub account if not already connected
   - Select your `recipe-generator` repository

4. **Configure Your Service**
   - **Name**: `smart-recipe-generator` (or any name you prefer)
   - **Region**: Choose the region closest to your users
   - **Branch**: `main` (or your default branch)
   - **Runtime**: `Node`
   - **Build Command**: `cd frontend && npm install && npm run build`
   - **Start Command**: `cd frontend && npm run start`
   - **Instance Type**: `Free` (for testing) or `Starter` (for production)

5. **Environment Variables**
   - No additional environment variables are needed for this application
   - The app uses local data and doesn't require external APIs

6. **Deploy**
   - Click "Create Web Service"
   - Render will automatically build and deploy your application
   - The build process typically takes 2-5 minutes

### Step 3: Verify Deployment

1. **Check Build Logs**
   - Monitor the build logs in the Render dashboard
   - Ensure the build completes successfully

2. **Test Your Application**
   - Once deployed, you'll get a URL like `https://your-app-name.onrender.com`
   - Visit the URL to test all features:
     - Recipe search and filtering
     - Image classification
     - Meal planning
     - Shopping list generation

### Step 4: Custom Domain (Optional)

If you want to use a custom domain:

1. Go to your service settings in Render
2. Navigate to "Custom Domains"
3. Add your domain
4. Follow the DNS configuration instructions

## Configuration Files

The following files have been created/updated for Render deployment:

- `render.yaml` - Render service configuration
- `frontend/package.json` - Updated with production start script

## Troubleshooting

### Common Issues

1. **Build Fails**
   - Check that all dependencies are listed in `package.json`
   - Ensure Node.js version compatibility (18.17.0)

2. **Application Not Loading**
   - Verify the start command is correct
   - Check that the build output is in the `dist` folder

3. **Static Assets Not Loading**
   - Ensure the build command creates the `dist` folder
   - Check that all assets are properly referenced

### Build Commands Reference

- **Build**: `cd frontend && npm install && npm run build`
- **Start**: `cd frontend && npm run start`
- **Output Directory**: `frontend/dist`

## Performance Optimization

For better performance on Render:

1. **Enable Static Site Generation** (if applicable)
2. **Use CDN** for static assets
3. **Optimize Images** before deployment
4. **Enable Gzip Compression** (usually enabled by default)

## Monitoring

- Monitor your application through the Render dashboard
- Set up alerts for downtime
- Check build logs for any issues

## Support

- Render Documentation: [render.com/docs](https://render.com/docs)
- Render Community: [community.render.com](https://community.render.com)

---

Your Smart Recipe Generator should now be live on Render! 🚀
