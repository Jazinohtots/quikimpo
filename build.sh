#!/bin/bash
set -e

echo "Installing dependencies..."
cd quikimpo-backend/quikimpo-main
pip install -r requirements.txt

echo "Running migrations..."
python manage.py migrate

echo "Creating static files..."
python manage.py collectstatic --noinput

echo "Loading fixtures..."
python manage.py loaddata freight/fixtures/demo_shipments.json || echo "Fixtures already loaded"

echo "Build complete!"
