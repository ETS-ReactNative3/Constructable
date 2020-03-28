from app import app
from flask_pymongo import PyMongo
from flask import jsonify, request, url_for, render_template
from bson import json_util

app.config["MONGO_URI"] = "mongodb+srv://Shaunak:construction@constructable-6isx0.mongodb.net/Users"
mongo = PyMongo(app)

@app.route("/getworker/<name>", methods = ["GET"])
def get_worker(name):
    worker = mongo.db.Workers.find({"name": name})
    worker_data = [d for d in worker]
    return json_util.dumps(worker_data)

@app.route("/addworker", methods = ["POST"])
def add_worker():
    worker = request.form.to_dict()
    worker['score'] = float(worker['score'])
    print("Added worker: " + worker)
    mongo.db.Workers.insert_one(request.form.to_dict())
    return "Worker Added!"


@app.route("/form")
def show_form():
    return render_template("newuser.html")
