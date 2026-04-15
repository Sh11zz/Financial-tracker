echo "🔧 Setting up FinTrack project..."

# ----------------------------
# Backend setup (Flask)
# ----------------------------
echo "📦 Setting up backend..."

python3 -m venv .venv
source .venv/bin/activate

pip install --upgrade pip
pip install -r requirements.txt

# ----------------------------
# Frontend setup (React + Vite)
# ----------------------------
echo "⚛️ Setting up frontend..."

cd frontend
npm install
cd ..

echo "✅ Setup complete!"
echo ""
echo "To run the backend:"
echo "  source .venv/bin/activate"
echo "  cd backend"
echo "  python app.py"
echo ""
echo "To run the frontend:"
echo "  cd frontend"
echo "  npm run dev"