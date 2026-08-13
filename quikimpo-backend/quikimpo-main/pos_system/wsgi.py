"""
WSGI config for the QuikImpo project.

Exposes the WSGI callable as a module-level variable named ``application``.
"""
import os

from django.core.wsgi import get_wsgi_application

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'pos_system.settings')

application = get_wsgi_application()