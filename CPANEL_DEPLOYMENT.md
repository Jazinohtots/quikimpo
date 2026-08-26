# cPanel Deployment Guide

This project is deployed as two applications on HostPinnacle cPanel:

- The React website at `https://quikimpofreightlogistics.co.ke`
- The Django API at `https://api.quikimpofreightlogistics.co.ke`

Using an API subdomain keeps the React static files and the Django Passenger app independent. Do not upload the React source or `node_modules` to `public_html`; upload the generated `dist` contents only.

## 1. DNS and SSL

1. Point the root domain and `www` record to the HostPinnacle hosting account.
2. In cPanel, create the `api` subdomain. Its document root is managed by the Python application in the next step.
3. Enable AutoSSL for the root, `www`, and `api` hostnames before enabling the production settings below.

## 2. Create the Django API

1. Upload or clone `quikimpo-backend/quikimpo-main` outside `public_html`, for example at `/home/CPANEL_USER/quikimpo-api`.
2. Open **Setup Python App** in cPanel and create an application using the latest Python version cPanel provides (Python 3.11 or newer where available).
3. Select the `api.quikimpofreightlogistics.co.ke` application URL and use `/home/CPANEL_USER/quikimpo-api` as the application root.
4. Set the startup file to `passenger_wsgi.py` and the application entry point to `application`.
5. Activate the virtual environment command shown by cPanel, then run these commands from the application root:

```bash
pip install -r requirements.txt
python manage.py migrate
python manage.py collectstatic --noinput
```

Create a cPanel MySQL database and user if data must persist. Set `DATABASE_URL` to the MySQL connection string supported by `dj-database-url`, for example:

```text
mysql://DATABASE_USER:DATABASE_PASSWORD@localhost/DATABASE_NAME
```

If the hosting Python environment does not provide a MySQL driver, install `mysqlclient` in the virtual environment before running migrations.

## 3. Configure the Django Environment

In **Setup Python App** environment variables, set the following. Do not commit a real `.env` file or email/app passwords.

```text
SECRET_KEY=<generate a new long random Django secret>
DEBUG=False
ALLOWED_HOSTS=api.quikimpofreightlogistics.co.ke,quikimpofreightlogistics.co.ke,www.quikimpofreightlogistics.co.ke
CORS_ALLOWED_ORIGINS=https://quikimpofreightlogistics.co.ke,https://www.quikimpofreightlogistics.co.ke
CSRF_TRUSTED_ORIGINS=https://quikimpofreightlogistics.co.ke,https://www.quikimpofreightlogistics.co.ke,https://api.quikimpofreightlogistics.co.ke
SECURE_SSL_REDIRECT=True
DATABASE_URL=mysql://DATABASE_USER:DATABASE_PASSWORD@localhost/DATABASE_NAME
EMAIL_HOST_USER=quikimpofreightlogistics@gmail.com
EMAIL_HOST_PASSWORD=<Gmail app password>
ANTHROPIC_API_KEY=<Anthropic API key>
```

Restart the Python application in cPanel after changing environment variables, installing packages, or deploying new backend code.

## 4. Build and Upload the React Website

On a development machine or in cPanel Terminal with Node.js available:

```bash
cd quikimpo-frontend/quikimpo-frontend
npm ci
VITE_API_BASE_URL=https://api.quikimpofreightlogistics.co.ke/api npm run build
```

Upload the **contents** of `dist` to the root domain's `public_html` directory. The build includes `.htaccess`, which makes React routes such as `/services`, `/quote`, and `/tracking` load correctly when opened directly.

## 5. Verify

1. Open `https://quikimpofreightlogistics.co.ke` and navigate to each page.
2. Open `https://api.quikimpofreightlogistics.co.ke/admin/`; it should show the Django admin login rather than an application error.
3. Submit a quote or contact request and verify the network request succeeds against `https://api.quikimpofreightlogistics.co.ke/api/`.
4. Confirm static assets, email delivery, and the AI chat after the environment variables have been configured.

## Updating Later

1. Pull/upload the backend changes, rerun `pip install -r requirements.txt` when requirements change, then restart the Python app.
2. Rebuild the frontend with the production `VITE_API_BASE_URL` and replace the files in `public_html` with the new `dist` contents.