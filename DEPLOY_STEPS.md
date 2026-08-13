# 🚀 QuikImpo Deployment - Step by Step Guide

Since you've already connected GitHub to Railway and Vercel, follow these steps:

---

## 📋 **STEP 1: Configure Railway Backend**

### 1.1 Open Railway Dashboard
- Go to [railway.app](https://railway.app)
- Open your project
- Click on the Django service

### 1.2 Add PostgreSQL Database
- Click "Add Service" → "PostgreSQL"
- Railway will auto-generate `DATABASE_URL` environment variable ✓

### 1.3 Set Environment Variables
In the Django service:
- Click "Variables" tab
- Add these variables (copy from `RAILWAY_SETUP.md`):

| Variable | Value |
|----------|-------|
| `DEBUG` | `False` |
| `SECRET_KEY` | Generate a secure key (see below) |
| `ALLOWED_HOSTS` | `*.railway.app,yourdomain.com` |
| `CORS_ALLOWED_ORIGINS` | `https://yourvercel-project.vercel.app` |
| `EMAIL_HOST_USER` | Your Gmail address |
| `EMAIL_HOST_PASSWORD` | Your Gmail app password |
| `ANTHROPIC_API_KEY` | Your Anthropic API key |

### 🔑 Generate Secure SECRET_KEY
Open a terminal and run:
```bash
python -c "import secrets; print(secrets.token_urlsafe(50))"
```
Copy the output and paste into Railway `SECRET_KEY`

### 1.4 Wait for Deployment
- Railway auto-deploys when you push to GitHub
- Watch the Logs tab for errors
- Once deployed, copy your Railway URL: `https://your-project-name.up.railway.app`

### 1.5 Run Database Migrations
In Railway Dashboard:
- Click "More" (three dots) → "Command"
- Run: `python manage.py migrate`
- Run: `python manage.py createsuperuser`
- Run: `python manage.py loaddata freight/fixtures/demo_shipments.json`

---

## 🎨 **STEP 2: Configure Vercel Frontend**

### 2.1 Open Vercel Dashboard
- Go to [vercel.com](https://vercel.com)
- Open your project

### 2.2 Set Environment Variables
- Click "Settings" → "Environment Variables"
- Add:

| Variable | Value |
|----------|-------|
| `VITE_API_BASE_URL` | `https://your-railway-url.up.railway.app/api` |

⚠️ Replace `your-railway-url` with your actual Railway project URL from Step 1.4

### 2.3 Redeploy
- Go to "Deployments" tab
- Click the latest deployment
- Click "Redeploy"
- Wait for build to complete

---

## 🧪 **STEP 3: Test Your Deployment**

### 3.1 Test Backend
Open in browser:
```
https://your-railway-url.up.railway.app/api/
```
You should see the Django REST Framework page ✓

### 3.2 Test Frontend
Open in browser:
```
https://yourvercel-project.vercel.app
```
You should see the QuikImpo homepage ✓

### 3.3 Test API Connection
1. Go to **Tracking** page
2. Enter any shipment tracking number
3. Should return results from backend ✓

---

## 🔄 **Continuous Deployment**

✅ **Auto-Deploy is Enabled!**

Every time you push to GitHub:
- Railway automatically redeploys backend ✓
- Vercel automatically rebuilds frontend ✓

No manual intervention needed!

```bash
git add .
git commit -m "Your changes"
git push origin main
# Auto-deploys to Railway and Vercel
```

---

## 📊 **Monitor Your Deployment**

### Railway
- **Logs:** Service → Logs tab
- **Metrics:** Project → Monitoring
- **Status:** Check service status indicator

### Vercel
- **Logs:** Deployments → click deployment → Logs
- **Analytics:** Project → Analytics
- **Errors:** check Function Logs

---

## 🔐 **Security Checklist**

- [ ] `SECRET_KEY` is strong (not hardcoded)
- [ ] `DEBUG=False` on production
- [ ] `CORS_ALLOWED_ORIGINS` matches Vercel URL
- [ ] Database `DATABASE_URL` is not in code
- [ ] API keys not committed to GitHub
- [ ] `.env` in `.gitignore` ✓

---

## 🆘 **Troubleshooting**

### Backend won't deploy
- Check Railway Logs for errors
- Verify `Procfile` exists
- Check `railway.json` has correct start command
- Ensure `requirements.txt` is valid

### Frontend won't build
- Check `npm run build` works locally
- Verify `VITE_API_BASE_URL` is set in Vercel
- Check `package.json` scripts are correct
- Look at Vercel build logs

### API Connection Error
- Verify `VITE_API_BASE_URL` in Vercel
- Verify Railway `CORS_ALLOWED_ORIGINS` includes Vercel URL
- Check backend is running: visit `https://your-railway-url.up.railway.app/api/`

### Database Errors
- Verify `DATABASE_URL` is set in Railway
- Run migrations: `python manage.py migrate`
- Check PostgreSQL service is running in Railway

---

## 📞 **Next Steps**

1. ✅ Follow steps above
2. ✅ Test frontend and backend
3. ✅ Monitor first deployments
4. ✅ Add custom domain (optional)
   - Railway: Project → Domains
   - Vercel: Settings → Domains
5. ✅ Set up monitoring alerts
6. ✅ Configure email notifications

---

## 📚 **Documentation**

- [Railway Docs](https://docs.railway.app)
- [Vercel Docs](https://vercel.com/docs)
- [Django Docs](https://docs.djangoproject.com)
- [React Docs](https://react.dev)

---

**Questions? Check the other setup files:**
- `RAILWAY_SETUP.md` - Railway-specific details
- `VERCEL_SETUP.md` - Vercel-specific details
- `DEPLOYMENT.md` - Full deployment guide
