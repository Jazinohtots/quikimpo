# cPanel Deployment Guide

## What to do with the current main-domain Python app

The Python application currently attached to `quikimpofreightlogistics.co.ke/` must **not** remain attached to the main domain. Stop or delete that application in **cPanel > Setup Python App** before deploying the frontend. The main domain will serve the React static files from `public_html`; a Passenger application there can take over the domain and prevent Apache from serving the React app.

Create or edit a separate Python application for the API subdomain only:

```text
App URI:  api.quikimpofreightlogistics.co.ke/
App Root: /home/quikimpo/quikimpo_backend
Status:   started (v3.13.15)
```

`started` means Passenger created a Python process. It does **not** prove that Django can import its settings, connect to the database, run migrations, or answer requests correctly. Complete the tests in this guide after the status becomes `started`.

## DNS Configuration

1. Point the root domain `quikimpofreightlogistics.co.ke` to the HostPinnacle hosting account.
2. Point `www.quikimpofreightlogistics.co.ke` to the same hosting account or configure it as an alias in cPanel.
3. Create an `api` DNS record for `api.quikimpofreightlogistics.co.ke` that points to the same HostPinnacle hosting account.
4. Wait until all three names resolve before creating SSL certificates or testing the sites.

HostPinnacle supplies the exact nameserver, IP address, or DNS-zone value. Use that value; it is not stored in this repository.

## cPanel Domain Configuration

1. In cPanel, ensure the main domain document root is `public_html`.
2. In **Setup Python App**, stop or remove the application whose App URI is the root domain. Do not attach a Python app to `/` or to `quikimpofreightlogistics.co.ke/`.
3. Create the `api` subdomain in **Domains** if cPanel has not created it automatically.
4. In **Setup Python App**, create the Django application with these exact values:

```text
Application URL: api.quikimpofreightlogistics.co.ke/
Application root: /home/quikimpo/quikimpo_backend
Startup file:     passenger_wsgi.py
Entry point:      application
Python version:   3.13.15, if that is the cPanel version shown
```

After saving, confirm the application listing shows the App URI, App Root, and `started (v3.13.15)` values above. `/home/quikimpo/quikimpo_backend` is the expected path from cPanel; confirm the username and path in your own cPanel before using terminal commands.

## Django Backend Deployment

### Upload backend files

Upload the contents of `quikimpo-backend/quikimpo-main` to:

```text
/home/quikimpo/quikimpo_backend
```

The application root must contain at least:

```text
manage.py
requirements.txt
passenger_wsgi.py
PROJECT_NAME/
    settings.py
```

`PROJECT_NAME` is a placeholder. Do not assume it is `quikimpo`: use File Manager or cPanel Terminal to locate `settings.py` first:

```bash
cd /home/quikimpo/quikimpo_backend
find . -path '*/settings.py' -not -path '*/venv/*'
```

For this repository, the command finds `./pos_system/settings.py`. Therefore the Django settings module is `pos_system.settings`, and `PROJECT_NAME` means `pos_system`. For another checkout, take the folder containing `settings.py` and append `.settings`.

### Passenger WSGI file

The generic `passenger_wsgi.py` template is:

```python
import os
import sys

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, BASE_DIR)

os.environ.setdefault(
    "DJANGO_SETTINGS_MODULE",
    "PROJECT_NAME.settings"
)

from django.core.wsgi import get_wsgi_application

application = get_wsgi_application()
```

Replace `PROJECT_NAME` with the actual folder name holding `settings.py`, without a slash. In this repository, use `pos_system`, so the line is:

```python
"DJANGO_SETTINGS_MODULE", "pos_system.settings"
```

The committed [passenger_wsgi.py](quikimpo-backend/quikimpo-main/passenger_wsgi.py) already uses that value. Do not add a cPanel username to this file.

### Install dependencies and initialize Django

In **cPanel > Terminal**, use the virtual-environment activation command displayed by **Setup Python App**. With the expected cPanel path, it is:

```bash
source /home/quikimpo/virtualenv/quikimpo_backend/3.13/bin/activate
cd /home/quikimpo/quikimpo_backend
pip install -r requirements.txt
python manage.py check
python manage.py migrate
python manage.py collectstatic --noinput
```

`/home/quikimpo/virtualenv/quikimpo_backend/3.13` is an expected path, not a value from this repository. Copy the exact activation command and version provided by cPanel when they differ.

Set environment variables in **Setup Python App**, never in Git:

```text
SECRET_KEY=<generate a strong Django secret>
DEBUG=False
ALLOWED_HOSTS=api.quikimpofreightlogistics.co.ke,quikimpofreightlogistics.co.ke,www.quikimpofreightlogistics.co.ke
CORS_ALLOWED_ORIGINS=https://quikimpofreightlogistics.co.ke,https://www.quikimpofreightlogistics.co.ke
CSRF_TRUSTED_ORIGINS=https://quikimpofreightlogistics.co.ke,https://www.quikimpofreightlogistics.co.ke,https://api.quikimpofreightlogistics.co.ke
SECURE_SSL_REDIRECT=True
DATABASE_URL=<the MySQL URL supplied from your cPanel database credentials>
EMAIL_HOST_USER=quikimpofreightlogistics@gmail.com
EMAIL_HOST_PASSWORD=<Gmail app password>
ANTHROPIC_API_KEY=<Anthropic API key>
```

Create the database and user in **MySQL Databases** first. `DATABASE_URL`, database username, password, and database name are cPanel values; obtain them there instead of inventing them.

### Restart and test the API

After changing files, packages, or environment variables, open **Setup Python App**, select the API application, and click **Restart**. If the page provides a `Restart Application` button, use that button.

Test these URLs after restart:

1. `https://api.quikimpofreightlogistics.co.ke/` may show a Django page, redirect, or a `404` depending on the configured root URL. A response from Django is the important result.
2. `https://api.quikimpofreightlogistics.co.ke/admin/` should show the Django admin login or an expected Django response.
3. Test a real API route after the frontend is deployed, for example through a quote, contact, tracking, FAQ, or chat request under `/api/`.

## React Frontend Deployment

This project is a Vite app. Its actual source reads `VITE_API_BASE_URL` and expects the `/api` suffix, so build it with:

```bash
cd quikimpo-frontend/quikimpo-frontend
npm install
VITE_API_BASE_URL=https://api.quikimpofreightlogistics.co.ke/api npm run build
```

Some Vite projects use the generic variable below, but this repository does **not** read it. Do not use it here unless the application code is changed deliberately:

```text
VITE_API_URL=https://api.quikimpofreightlogistics.co.ke
```

Similarly, a Create React App project would use:

```text
REACT_APP_API_URL=https://api.quikimpofreightlogistics.co.ke
```

Upload **only the contents** of `quikimpo-frontend/quikimpo-frontend/dist` to the main domain's `public_html`. Do not upload `src`, `node_modules`, `package.json`, or other React source files.

If React Router is used, place this `.htaccess` in `public_html`:

```apache
RewriteEngine On
RewriteBase /

RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^ index.html [L]
```

The frontend build already copies [public/.htaccess](quikimpo-frontend/quikimpo-frontend/public/.htaccess) into `dist`. Confirm it is uploaded with `index.html` so direct visits to routes such as `/services`, `/quote`, and `/tracking` work.

## SSL Configuration

1. In cPanel, open **SSL/TLS Status** or the HostPinnacle SSL tool.
2. Run AutoSSL for `quikimpofreightlogistics.co.ke`, `www.quikimpofreightlogistics.co.ke`, and `api.quikimpofreightlogistics.co.ke`.
3. Confirm each hostname opens with `https://` without a certificate warning.
4. Only then leave `SECURE_SSL_REDIRECT=True`; changing this before SSL works can lock the API into an unusable redirect.

## Troubleshooting

### API returns `500 Internal Server Error`

1. In **Setup Python App**, confirm the API app root, startup file, and entry point match the values above.
2. Restart the application after every configuration change.
3. Run `python manage.py check` in the activated virtual environment and correct the reported error.
4. Verify `DEBUG=False` and every required environment variable, especially `SECRET_KEY`, `DATABASE_URL`, `EMAIL_HOST_USER`, `EMAIL_HOST_PASSWORD`, and `ANTHROPIC_API_KEY` if the feature using it is tested.
5. Check cPanel’s **Errors** page and the Passenger application error log. HostPinnacle determines the exact log location.
6. Confirm migrations ran and the database credentials are valid.

### Passenger or WSGI error

1. Confirm `passenger_wsgi.py` is in `/home/quikimpo/quikimpo_backend`.
2. Confirm its settings module is derived from the real folder containing `settings.py`. This repository requires `pos_system.settings`.
3. Ensure the virtual environment has `django` and all packages from `requirements.txt` installed.
4. Check that the Python version selected in Setup Python App is the one used to install the packages.
5. Read the cPanel Passenger error log; it will show the missing module or import path when one exists.

### Frontend reports CORS errors

1. Confirm the frontend was built with `VITE_API_BASE_URL=https://api.quikimpofreightlogistics.co.ke/api`.
2. Confirm `CORS_ALLOWED_ORIGINS` includes exactly `https://quikimpofreightlogistics.co.ke` and, if used, `https://www.quikimpofreightlogistics.co.ke`. Do not add paths such as `/api` to the CORS origins.
3. Restart the Python app after changing environment variables.
4. Confirm the API certificate works. A browser may surface SSL or failed-network issues as CORS errors.
5. Inspect the browser Network tab: the request must go to `https://api.quikimpofreightlogistics.co.ke/api/...`, not to `localhost`.
