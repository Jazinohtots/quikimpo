# Render Backend Deployment Checklist

## ✅ Step 1: Create a Render Account

1. Go to [render.com](https://render.com)
2. Sign up with GitHub (easiest method)
3. Link your GitHub account

---

## ✅ Step 2: Create a New Service

1. Click **"New +"** → **"Web Service"**
2. Select your **quikimpo** repository
3. Configure:
   - **Name:** `quikimpo-backend`
   - **Runtime:** Python 3
   - **Build Command:** `pip install -r quikimpo-backend/quikimpo-main/requirements.txt`
   - **Start Command:** `cd quikimpo-backend/quikimpo-main && python -m gunicorn pos_system.wsgi:application --log-file - --bind 0.0.0.0:$PORT`
   - **Instance Type:** Free tier (or upgrade as needed)

4. Click **"Create Web Service"**

---

## ✅ Step 3: Add PostgreSQL Database

1. On your Render dashboard, click **"New +"** → **"PostgreSQL"**
2. Configure:
   - **Name:** `quikimpo-db`
   - **Database:** `quikimpo_db`
   - **User:** `quikimpo_user`
   - **Region:** Same as your web service
   - **PostgreSQL Version:** 15

3. Click **"Create Database"**

---

## ✅ Step 4: Set Environment Variables on Web Service

In Render Dashboard → Your Web Service → **Environment**

Add these variables:

```
DEBUG=False
SECRET_KEY=your-secret-key-here
ALLOWED_HOSTS=your-render-url.onrender.com
CORS_ALLOWED_ORIGINS=https://yourvercel-url.vercel.app
EMAIL_BACKEND=django.core.mail.backends.smtp.EmailBackend
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USE_TLS=True
EMAIL_HOST_USER=your-email@gmail.com
EMAIL_HOST_PASSWORD=your-app-password
ANTHROPIC_API_KEY=sk-ant-your-key-here
DATABASE_URL=(Render will auto-populate this from PostgreSQL service)
```

⚠️ **IMPORTANT:** 
- After creating the PostgreSQL database, Render automatically adds `DATABASE_URL` 
- Just copy it and paste it as an env var if not auto-added
- For `SECRET_KEY`, use a strong random string (at least 50 characters)

---

## ✅ Step 5: Run Database Migrations

1. On your Web Service, go to **"Shell"** tab (or SSH)
2. Run these commands:

```bash
cd quikimpo-backend/quikimpo-main
python manage.py migrate
python manage.py createsuperuser
python manage.py loaddata freight/fixtures/demo_shipments.json
```

3. Create an admin account when prompted

---

## ✅ Step 6: Get Your Backend URL

Your backend will be at:
```
https://quikimpo-backend.onrender.com
```

Test it:
```
https://quikimpo-backend.onrender.com/api/
```

---

## ✅ Step 7: Update Frontend (Vercel)

1. Go to **Vercel Dashboard** → Your Project → **Settings** → **Environment Variables**
2. Update:
   ```
   VITE_API_BASE_URL=https://quikimpo-backend.onrender.com/api
   ```
3. Redeploy your frontend

---

## ✅ Step 8: Update CORS

Back in Render Dashboard → Web Service → Environment:

Update `CORS_ALLOWED_ORIGINS` to include your Vercel URL:
```
https://your-frontend-url.vercel.app
```

---

## 🚀 Deployment Complete!

Your live site:
```
https://your-frontend-url.vercel.app
```

Backend API:
```
https://quikimpo-backend.onrender.com/api
```

---

## 📋 Troubleshooting

### Build Fails
- Check build logs in Render dashboard
- Ensure `requirements.txt` exists in the path
- Verify all dependencies are listed

### Database Connection Error
- Ensure `DATABASE_URL` is set
- Check PostgreSQL service is running
- Run migrations in Shell tab

### CORS Errors
- Update `CORS_ALLOWED_ORIGINS` with correct Vercel URL
- Ensure frontend and backend are properly connected

### Cold Start Delays
- Free tier services on Render spin down after 15 min of inactivity
- First request will be slow (~30 seconds)
- Upgrade to paid tier for persistent uptime

---

## 💾 Render Free Tier Limits

- ✅ 750 compute hours/month per service
- ✅ 100 GB bandwidth
- ❌ Services spin down after 15 min of inactivity
- ✅ PostgreSQL: 90 days retention on free tier

**Recommendation:** Upgrade to Starter ($7/month) for reliable deployment
