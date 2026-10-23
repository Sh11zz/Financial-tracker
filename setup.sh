#!/usr/bin/env bash
# Local development setup (no Docker)
set -euo pipefail

echo "Setting up backend..."
python3 -m venv .venv
source .venv/bin/activate
pip install --upgrade pip
pip install -r requirements.txt

echo "Setting up frontend..."
(cd frontend && npm ci)

[ -f .env ] || cp .env.example .env

echo ""
echo "Done. Run:"
echo "  backend:  source .venv/bin/activate && cd backend && python init_db.py && python app.py"
echo "  frontend: cd frontend && npm run dev"
