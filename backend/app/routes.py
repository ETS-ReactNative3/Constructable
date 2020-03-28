from app import app
from flask_pymongo import PyMongo
from flask import jsonify, request, url_for, render_template
from bson import json_util
import bson

app.config["MONGO_URI"] = "mongodb+srv://Shaunak:construction@constructable-6isx0.mongodb.net/AppData"
mongo = PyMongo(app)

employee_id = None
project_id = None

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

@app.route("/selectproject")
def select_project():
    global project_id
    name = request.args.get('name')
    project = mongo.db.Workers.find_one_or_404({"name": name})
    project_id = project['_id']
    return "Selected project " + name
    

@app.route("/gettasks", methods = ["GET"])
def worker_tasks():
    if (employee_id == None):
        return "No employee selected"
    worker = mongo.db.Workers.find_one_or_404({"_id": employee_id})
    current_tasks = worker['tasks']['current']
    output = []
    for task in current_tasks:
        project = mongo.db.Projects.find_one_or_404({"_id": task['project_id']})
        task_full = [t for t in project['tasks'] if t['task_id'] == task['task_id']]
        output.extend(task_full)
    return json_util.dumps(output)

#add current worker to project specified
@app.route("/addproject")
def add_project():
    if (employee_id == None):
        return "No employee selected"
    project_name = request.args.get('name')
    project = mongo.db.Projects.find_one_or_404({"name": project_name})
    project['workers'].append(employee_id)
    mongo.db.Projects.update({"name": project_name}, project)
    print("Added worker to " + project_name)

@app.route("/newproject", methods = ["POST"])
def new_project():
    project = request.form.to_dict()
    project['type'] = project['type'].split() #type entered as words with single space in between
    project['workers'] = []
    project['tasks'] = []
    projectStr = str(project).replace("'", '"')
    print("Added project: " + projectStr)
    mongo.db.Projects.insert_one(json_util.loads(projectStr))
    return "Project Added!"
    

@app.route("/addworker", methods = ["POST"])
def add_worker():
    worker = request.form.to_dict()
    workerStr = str(worker).replace("'", '"')
    print("Added worker: " + workerStr)
    mongo.db.Workers.insert_one(json_util.loads(workerStr))
    return "Worker Added!"
