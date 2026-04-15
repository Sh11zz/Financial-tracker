from flask import Flask, jsonify

app = Flask(__name__)

@app.route("/")
def index():
    return "hello world"

@app.route("/api/users", methods=['GET'])
def users():
    return jsonify(
        {
            "Users": [
                'user1',
                'user2',
                'user3'
            ]
        }
    )


if __name__ == "__main__":
    app.run(debug=True, port="8000")