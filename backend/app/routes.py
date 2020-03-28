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

@app.route("/get/<name>")
def get_score(name):
    result = 0 # default value
    score = mongo.db.Workers.find({"name": name})
    for s in score:
        result = s['score']
    return str(result)
