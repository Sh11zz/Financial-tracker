echo "Сеттинг ап хуйню эту финтраковскую"

# ----------------------------
# Backend setup (Flask)
# ----------------------------
echo "Ставлю бэкенд (кто не сделает коммит, тот пидорас)"

python3 -m venv .venv
source .venv/bin/activate

pip install --upgrade pip
pip install -r requirements.txt

# ----------------------------
# Frontend setup (React + Vite)
# ----------------------------
echo "Тут моя хуйня фронтендерская"

cd frontend
npm install
npm install react-router-dom
npm install react-icons
cd ..

echo "Все готово. Здоровья погибшим"
echo ""
echo "Вот так вот запустить бэкенд:"
echo "  source .venv/bin/activate"
echo "  cd backend"
echo "  python app.py"
echo ""
echo "Вот так вот запустить фронтенд:"
echo "  cd frontend"
echo "  npm run dev"
