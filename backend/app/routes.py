from app import app
from flask_pymongo import PyMongo
from flask import jsonify, request, url_for, render_template
from bson import json_util
import bson

app.config["MONGO_URI"] = "mongodb+srv://Shaunak:construction@constructable-6isx0.mongodb.net/AppData"
mongo = PyMongo(app)

employee_id = None

@app.route("/getworker", methods = ["GET"])
def get_worker():
    name = request.args.get('first_name')
    worker = mongo.db.Workers.find_one_or_404({"first_name": name})
    return json_util.dumps(worker)

@app.route("/login")
def login():
    global employee_id
    name = request.args.get('first_name')
    worker = mongo.db.Workers.find_one_or_404({"first_name": name})
    employee_id = worker['_id']
    return "Logged in as worker " + name
    

@app.route("/gettasks", methods = ["GET"])
def worker_tasks():
    if (employee_id == None):
        return "No employee selected"
    worker = mongo.db.Workers.find_one_or_404({"_id": employee_id})
    current_tasks = worker['tasks']['previous']
    output = []
    for task in current_tasks:
        project = mongo.db.Projects.find_one_or_404({"_id": task['project_id']})
        task_full = [t for t in project['tasks'] if t['task_id'] == task['task_id']]
        output.extend(task_full)
    return json_util.dumps(output)


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
