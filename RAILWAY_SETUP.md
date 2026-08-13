# Railway Backend Deployment Checklist

## ✅ Step 1: Railway Environment Variables

Copy and paste these variables into your Railway dashboard:
**Path:** Railway Project → Django Service → Variables

```
DEBUG=False
SECRET_KEY=django-insecure-change-this-in-settings
ALLOWED_HOSTS=*.railway.app,yourdomain.com
CORS_ALLOWED_ORIGINS=https://yourvercel-project.vercel.app
EMAIL_BACKEND=django.core.mail.backends.smtp.EmailBackend
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USE_TLS=True
EMAIL_HOST_USER=your-email@gmail.com
EMAIL_HOST_PASSWORD=your-app-password
ANTHROPIC_API_KEY=sk-ant-your-api-key
DATABASE_URL=postgresql://... (automatically set by Railway PostgreSQL)
```

## ✅ Step 2: Database Setup

Run in Railway Logs tab or SSH:

```bash
cd quikimpo-backend/quikimpo-main
python manage.py migrate
python manage.py createsuperuser
python manage.py loaddata freight/fixtures/demo_shipments.json
```

## ✅ Step 3: Verify Backend

Your backend URL will be:
```
https://your-railway-project-name.up.railway.app
```

Test the API:
```
https://your-railway-project-name.up.railway.app/api/
```

## 🔑 Important: Get Your Railway Backend URL

You'll need this for the frontend deployment!
