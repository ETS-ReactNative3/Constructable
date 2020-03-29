from app import app
from flask_pymongo import PyMongo
from flask import jsonify, request, url_for, render_template
from bson import json_util
import bson

app.config["MONGO_URI"] = "mongodb+srv://Shaunak:construction@constructable-6isx0.mongodb.net/AppData"
mongo = PyMongo(app)

#get json given first_name
@app.route("/getworker", methods = ["GET"])
def get_worker():
    name = request.args.get('first_name')
    worker = mongo.db.Workers.find_one_or_404({"first_name": name})
    return json_util.dumps(worker)
    
#get tasks given employee id
@app.route("/gettasks", methods = ["GET"])
def worker_tasks():
    employee_id = bson.objectid.ObjectId(request.args.get('id'))
    worker = mongo.db.Workers.find_one_or_404({"_id": employee_id})
    current_tasks = worker['tasks']['current']
    output = []
    for task in current_tasks:
        project = mongo.db.Projects.find_one_or_404({"_id": task['project_id']})
        task_full = [t for t in project['tasks'] if t['task_id'] == task['task_id']]
        output.extend(task_full)
    return json_util.dumps(output)

#assign task to employee given employee id, project id, task id
@app.route("/assigntask")
def assign_task():
    employee_id = bson.objectid.ObjectId(request.args.get('employee_id'))
    project_id = bson.objectid.ObjectId(request.args.get('project_id'))
    task_id = bson.objectid.ObjectId(request.args.get('task_id'))
    project = mongo.db.Projects.find_one_or_404({"_id": project_id})
    for task in project['tasks']:
        if task['task_id'] == task_id:
            if employee_id not in task['workers']:
                task['workers'].append(employee_id)
            break
    if employee_id not in project['workers']:
        project['workers'].append(employee_id)
    mongo.db.Projects.update({"_id": project_id}, project)
    employee = mongo.db.Workers.find_one_or_404({"_id": employee_id})
    employee['supervisors'].extend(project['supervisors'])
    employee['supervisors'] = list(set(employee['supervisors']))
    mongo.db.Workers.update({"_id": employee_id}, employee)
    return "Task assigned to " + employee['first_name']

#creates new project given supervisor id and form data
@app.route("/newproject", methods = ["POST"])
def new_project():
    supervisor_id = bson.objectid.ObjectId(request.args.get('supervisor_id'))
    project = request.form.to_dict()
    project['type'] = project['type'].split(',') #type entered as words with commas in between
    project['workers'] = []
    project['tasks'] = []
    project['supervisors'] = []
    projectStr = str(project).replace("'", '"')
    new_project = json_util.loads(projectStr)
    new_project['supervisors'].append(supervisor_id)
    print("Added project: " + str(new_project))
    mongo.db.Projects.insert_one(new_project)
    return "Project Added!"

#creates new task in project given project id and form data
@app.route("/newtask", methods = ["POST"])
def new_task():
    project_id = bson.objectid.ObjectId(request.args.get('project_id'))
    task = request.form.to_dict()
    task['task_id'] = bson.objectid.ObjectId()
    task['workers'] = []
    project = mongo.db.Projects.find_one_or_404({"_id": project_id})
    project['tasks'].append(task)
    mongo.db.Projects.update({"_id": project_id}, project)
    return "Task added!"

#add worker from form data
@app.route("/addworker", methods = ["POST"])
def add_worker():
    worker = request.form.to_dict()
    worker['supervisors'] = []
    worker['tasks'] = []
    #skills and personality traits entered as words with commas in between
    worker['skills'] = worker['skills'].split(',')
    worker['personality_traits'] = worker['personality_traits'].split(',')
    workerStr = str(worker).replace("'", '"')
    print("Added worker: " + workerStr)
    mongo.db.Workers.insert_one(json_util.loads(workerStr))
    return "Worker Added!"
