# Vercel Frontend Deployment Checklist

## ✅ Step 1: Vercel Environment Variables

In your Vercel dashboard:
**Path:** Settings → Environment Variables

Add this variable:

```
VITE_API_BASE_URL=https://your-railway-project-name.up.railway.app/api
```

⚠️ **IMPORTANT:** Replace `your-railway-project-name` with your actual Railway project URL

## ✅ Step 2: Verify Build Settings

**Build Command:** `npm run build`
**Output Directory:** `dist`
**Install Command:** `npm install`

These should be auto-detected. If not, set them manually.

## ✅ Step 3: Redeploy After Setting Variables

1. After setting `VITE_API_BASE_URL`, go to Deployments
2. Click on the latest deployment
3. Click "Redeploy"
4. Wait for build to complete

## ✅ Step 4: Verify Frontend

Your frontend will be at:
```
https://yourproject.vercel.app
```

## ✅ Step 5: Test API Connection

Open the frontend and:
1. Go to "Tracking" page
2. Try searching for shipments
3. Check browser console for any API errors

If you see CORS errors, update Railway's `CORS_ALLOWED_ORIGINS` variable.

## 📋 Troubleshooting

**API Connection Fails:**
- Check `VITE_API_BASE_URL` is correct in Vercel
- Check Railway `CORS_ALLOWED_ORIGINS` includes Vercel URL

**Build Fails:**
- Check Node version compatibility
- Ensure all dependencies are in `package.json`
- Check for TypeScript errors with `npm run build` locally
