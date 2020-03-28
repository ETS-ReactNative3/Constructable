from app import app
from flask_pymongo import PyMongo

app.config["MONGO_URI"] = "mongodb+srv://Shaunak:construction@constructable-6isx0.mongodb.net/Users"
mongo = PyMongo(app)

@app.route("/")
def hello():
    return "i like pie"

@app.route("/main")
def main():
    return "this is the main page"

@app.route("/get")
def get_score():
    score = mongo.db.Workers.find({"name": "Bob"})
    return str(score[0]["score"])
