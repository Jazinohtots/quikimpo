import os
from pathlib import Path
from dotenv import load_dotenv

load_dotenv()

BASE_DIR = Path(__file__).resolve().parent.parent

SECRET_KEY = os.getenv('SECRET_KEY', 'fallback-insecure-key-for-dev-only')

DEBUG = os.getenv('DEBUG', 'True') == 'True'

ALLOWED_HOSTS = ['*']

SECRET_KEY = os.getenv('SECRET_KEY', 'fallback-key-for-dev')
DEBUG = os.getenv('DEBUG', 'True') == 'True'
EMAIL_HOST_USER = os.getenv('EMAIL_HOST_USER')
EMAIL_HOST_PASSWORD = os.getenv('EMAIL_HOST_PASSWORD')
DEFAULT_FROM_EMAIL = EMAIL_HOST_USER








INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',

    'freight',
    'products',
    'sales',

    'rest_framework',
    'corsheaders',
]

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent

TEMPLATES[0]['DIRS'] = [BASE_DIR / 'templates']

STATIC_URL = '/static/'
STATICFILES_DIRS = [BASE_DIR / 'static']

MEDIA_URL = '/media/'
MEDIA_ROOT = BASE_DIR / 'media'

CORS_ALLOW_ALL_ORIGINS = True



# Email Configuration
EMAIL_BACKEND = 'django.freight.mail.backends.smtp.EmailBackend'
EMAIL_HOST = 'smtp.gmail.com'
EMAIL_PORT = 587
EMAIL_USE_TLS = True
EMAIL_HOST_USER = 'joashodhiamboreagan@gmail.com'       # ← your Gmail
EMAIL_HOST_PASSWORD = 'Jazinoh@19'    # ← Gmail App Password (not your login password)
DEFAULT_FROM_EMAIL = EMAIL_HOST_USER



# ── Email Configuration ──────────────────────────────────────
EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
EMAIL_HOST = 'smtp.gmail.com'
EMAIL_PORT = 587
EMAIL_USE_TLS = True
EMAIL_HOST_USER = os.getenv('EMAIL_HOST_USER')
EMAIL_HOST_PASSWORD = os.getenv('EMAIL_HOST_PASSWORD')
DEFAULT_FROM_EMAIL = EMAIL_HOST_USER

