from flask import Flask, jsonify
from flask_jwt_extended import JWTManager

app = Flask(__name__)

@app.route("/")
def index():
    return "hello world"

app.config["JWT_SECRET_KEY"] = "idinahuy"  
jwt = JWTManager(app)

if __name__ == "__main__":
    app.run(debug=True, port="8000")


