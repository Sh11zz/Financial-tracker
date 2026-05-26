from flask import Flask, request, jsonify
from flask_cors import CORS
import sqlite3
import hashlib

app = Flask(__name__)
CORS(app)

DB_PATH = "finance.db"

@app.route('/')
def home():
    return "Backend is running"

# ---------------- DATABASE ----------------
def create_tables():
    with sqlite3.connect(DB_PATH) as conn:
        cursor = conn.cursor()

        cursor.execute("""
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT,
            password TEXT
        )
        """)

        cursor.execute("""
        CREATE TABLE IF NOT EXISTS income (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER,
            amount REAL
        )
        """)

        cursor.execute("""
        CREATE TABLE IF NOT EXISTS expenses (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER,
            amount REAL,
            category TEXT
        )
        """)

        conn.commit()

create_tables()

# ---------------- AUTH (SIMPLE, NO JWT) ----------------
@app.route("/register", methods=["POST"])
def register():
    data = request.json

    with sqlite3.connect(DB_PATH) as conn:
        cursor = conn.cursor()
        cursor.execute(
            "INSERT INTO users (username, password) VALUES (?, ?)",
            (data["username"], data["password"])
        )
        conn.commit()

    return jsonify({"message": "User created"})

@app.route("/login", methods=["POST"])
def login():
    data = request.json

    with sqlite3.connect(DB_PATH) as conn:
        cursor = conn.cursor()

        user = cursor.execute(
            "SELECT * FROM users WHERE username=? AND password=?",
            (data["username"], data["password"])
        ).fetchone()

    if user:
        return jsonify({
            "success": True,
            "user_id": user[0]
        })

    return jsonify({"success": False}), 401

# ---------------- CRUD ----------------
@app.route("/income", methods=["POST"])
def add_income():
    data = request.json

    with sqlite3.connect(DB_PATH) as conn:
        cursor = conn.cursor()
        cursor.execute(
            "INSERT INTO income (user_id, amount) VALUES (?, ?)",
            (data["user_id"], data["amount"])
        )
        conn.commit()

    return jsonify({"message": "Income added"})

@app.route("/expense", methods=["POST"])
def add_expense():
    data = request.json

    with sqlite3.connect(DB_PATH) as conn:
        cursor = conn.cursor()
        cursor.execute(
            "INSERT INTO expenses (user_id, amount, category) VALUES (?, ?, ?)",
            (data["user_id"], data["amount"], data["category"])
        )
        conn.commit()

    return jsonify({"message": "Expense added"})

# ---------------- STATS ----------------
@app.route("/stats/<int:user_id>", methods=["GET"])
def stats(user_id):

    with sqlite3.connect(DB_PATH) as conn:
        cursor = conn.cursor()

        income = cursor.execute(
            "SELECT COALESCE(SUM(amount),0) FROM income WHERE user_id=?",
            (user_id,)
        ).fetchone()[0]

        expenses = cursor.execute(
            "SELECT COALESCE(SUM(amount),0) FROM expenses WHERE user_id=?",
            (user_id,)
        ).fetchone()[0]

    return jsonify({
        "income": income,
        "expenses": expenses,
        "balance": income - expenses
    })

# ---------------- SEARCH / FILTER / PAGINATION ----------------
@app.route("/expenses", methods=["GET"])
def get_expenses():

    user_id = request.args.get("user_id")
    category = request.args.get("category")
    limit = int(request.args.get("limit", 10))
    offset = int(request.args.get("offset", 0))

    with sqlite3.connect(DB_PATH) as conn:
        cursor = conn.cursor()

        query = "SELECT * FROM expenses WHERE user_id=?"
        params = [user_id]

        if category:
            query += " AND category=?"
            params.append(category)

        query += " LIMIT ? OFFSET ?"
        params.extend([limit, offset])

        data = cursor.execute(query, params).fetchall()

    return jsonify(data)

# ---------------- ABOUT (REQUIRED) ---------------
@app.route("/about", methods=["GET"])
def about():
    return jsonify({
        "project": "Financial Tracker",
        "description": "System for tracking income and expenses",
        "version": "1.0"
    })

# ---------------- HASH (REQUIRED) ----------------
@app.route("/api/hash/<string:value>", methods=["GET"])
def hash_value(value):
    result = hashlib.sha256(value.encode()).hexdigest()

    return jsonify({
        "request": value,
        "result": result
    })

# ---------------- DASHBOARD (REQUIRED) ----------------
@app.route("/dashboard")
def dashboard():
    return """
    <html>
    <head>
        <title>Dashboard</title>
    </head>
    <body>
        <h2>Financial Dashboard</h2>
        <canvas id="chart"></canvas>

        <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
        <script>
        fetch('/stats/1')
        .then(res => res.json())
        .then(data => {
            new Chart(document.getElementById('chart'), {
                type: 'bar',
                data: {
                    labels: ['Income', 'Expenses'],
                    datasets: [{
                        data: [data.income, data.expenses]
                    }]
                }
            });
        });
        </script>
    </body>
    </html>
    """

# ---------------- START ----------------
if __name__ == "__main__":
    app.run(debug=True)