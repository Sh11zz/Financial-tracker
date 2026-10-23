FROM python:3.12-slim

ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY backend/ .

RUN useradd --no-create-home app
USER app

EXPOSE 8000

# Create tables (idempotent), then serve the Flask app
CMD ["sh", "-c", "python init_db.py && gunicorn --bind 0.0.0.0:8000 --workers 2 --access-logfile - app:app"]
