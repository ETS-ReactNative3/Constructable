from app import app
from flask_pymongo import PyMongo
from flask import jsonify, request, url_for, render_template
from bson import json_util
import bson

app.config["MONGO_URI"] = "mongodb+srv://Shaunak:construction@constructable-6isx0.mongodb.net/Users"
mongo = PyMongo(app)

employee_id = 0

@app.route("/getworker", methods = ["GET"])
def get_worker():
    name = request.args.get('first_name')
    worker = mongo.db.Workers.find_one_or_404({"first_name": name})
    return json_util.dumps(worker)

@app.route("/addworker", methods = ["POST"])
def add_worker():
    worker = request.form.to_dict()
    worker['score'] = float(worker['score'])
    workerStr = str(worker).replace("'", '"')
    print("Added worker: " + workerStr)
    mongo.db.Workers.insert_one(json_util.loads(workerStr))
    return "Worker Added!"


@app.route("/form")
def show_form():
    return render_template("newuser.html")
