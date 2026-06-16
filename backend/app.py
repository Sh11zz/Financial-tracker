from flask import Flask, request, jsonify
from flask_jwt_extended import JWTManager
from flask_cors import CORS

from db import get_db

app = Flask(__name__)

CORS(app)

app.config["JWT_SECRET_KEY"] = "idinahuy"

jwt = JWTManager(app)

@app.route("/")
def index():
    return "hello world"

@app.route("/register", methods=["POST"])
def register():

    data = request.json

    conn = get_db()
    cursor = conn.cursor()

    try:

        cursor.execute("""
            INSERT INTO users(username, email, password)
            VALUES (%s, %s, %s)
            RETURNING id
        """, (
            data["username"],
            data["email"],
            data["password"]
        ))

        user_id = cursor.fetchone()[0]

        conn.commit()

        return {
            "message": "User created",
            "user_id": user_id
        }, 201

    except Exception as e:

        conn.rollback()

        return {
            "error": str(e)
        }, 400

    finally:

        cursor.close()
        conn.close()

@app.route("/login", methods=["POST"])
def login():

    data = request.json

    conn = get_db()
    cursor = conn.cursor()

    cursor.execute("""
        SELECT id, username
        FROM users
        WHERE username = %s
        AND password = %s
    """, (
        data["username"],
        data["password"]
    ))

    user = cursor.fetchone()

    cursor.close()
    conn.close()

    if not user:
        return {
            "error": "Invalid credentials"
        }, 401

    return {
        "message": "Login successful",
        "user_id": user[0],
        "username": user[1]
    }

@app.route("/transactions", methods=["POST"])
def add_transaction():

    data = request.json

    conn = get_db()
    cursor = conn.cursor()

    try:

        cursor.execute("""
            INSERT INTO transactions
            (
                user_id,
                type,
                name,
                amount,
                category
            )
            VALUES (%s, %s, %s, %s, %s)
            RETURNING id
        """, (
            data["user_id"],
            data["type"],
            data["name"],
            data["amount"],
            data.get("category")
        ))

        transaction_id = cursor.fetchone()[0]

        conn.commit()

        return {
            "message": "Transaction added",
            "transaction_id": transaction_id
        }, 201

    except Exception as e:

        conn.rollback()

        return {
            "error": str(e)
        }, 400

    finally:

        cursor.close()
        conn.close()

@app.route("/transactions/<int:user_id>")
def get_transactions(user_id):

    conn = get_db()
    cursor = conn.cursor()

    cursor.execute("""
        SELECT
            id,
            user_id,
            type,
            name,
            amount,
            category
        FROM transactions
        WHERE user_id = %s
        ORDER BY id DESC
    """, (user_id,))

    rows = cursor.fetchall()

    result = []

    for row in rows:

        result.append({
            "id": row[0],
            "user_id": row[1],
            "type": row[2],
            "name": row[3],
            "amount": float(row[4]),
            "category": row[5]
        })

    cursor.close()
    conn.close()

    return jsonify(result)

@app.route("/transactions/<int:id>", methods=["DELETE"])
def delete_transaction(id):

    conn = get_db()
    cursor = conn.cursor()

    cursor.execute(
        """
        DELETE FROM transactions
        WHERE id = %s
        """,
        (id,)
    )

    conn.commit()

    cursor.close()
    conn.close()

    return {
        "message": "Transaction deleted"
    }

@app.route("/user/<int:user_id>")
def get_user(user_id):

    conn = get_db()
    cursor = conn.cursor()

    cursor.execute("""
        SELECT id, username, email, password
        FROM users
        WHERE id = %s
    """, (user_id,))

    user = cursor.fetchone()

    cursor.close()
    conn.close()

    if not user:
        return {"error": "User not found"}, 404

    return {
        "id": user[0],
        "username": user[1],
        "email": user[2],
        "password": user[3]
    }

if __name__ == "__main__":
    app.run(
        debug=True,
        port=8000
    )