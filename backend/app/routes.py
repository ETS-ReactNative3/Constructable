from app import app
from flask_pymongo import PyMongo
from flask import jsonify, request, url_for, render_template, make_response
from bson import json_util
import bson
import datetime
from gridfs import GridFS

app.config["MONGO_URI"] = "mongodb+srv://Shaunak:construction@constructable-6isx0.mongodb.net/AppData"
mongo = PyMongo(app)
fs = GridFS(mongo.db)

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
    if worker['role'] == 'supervisor':
        output = {}
        for proj in worker['projects']['current']:
            project_id = proj['project_id']
            project = mongo.db.Projects.find_one_or_404({"_id": project_id})
            output[project["name"]] = project["tasks"]
        return json_util.dumps(output)
    #else if role is worker
    current_tasks = worker['tasks']['current']
    output = []
    for task in current_tasks:
        project = mongo.db.Projects.find_one_or_404({"_id": task['project_id']})
        task_full = [t for t in project['tasks'] if t['task_id'] == task['task_id']]
        output.extend(task_full)
    return json_util.dumps(output)

#get current projects given employee id
@app.route("/getprojects", methods = ["GET"])
def worker_projects():
    employee_id = bson.objectid.ObjectId(request.args.get('id'))
    worker = mongo.db.Workers.find_one_or_404({"_id": employee_id})
    if worker['role'] == 'supervisor':
        output = []
        for proj in worker['projects']['current']:
            project_id = proj['project_id']
            project = mongo.db.Projects.find_one_or_404({"_id": project_id})
            output.append(project)
        return json_util.dumps(output)
    #else if role is worker
    current_tasks = worker['tasks']['current']
    output = []
    project_ids = list(set([task['project_id' for task in current_tasks])))
    for pid in project_ids:
        project = mongo.db.Projects.find_one_or_404({"_id": pid})
        output.append(project)
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
    employee = mongo.db.Workers.find({"_id": employee_id})
    employee['supervisor'] = project['supervisor']
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
    projectStr = str(project).replace("'", '"')
    new_project = json_util.loads(projectStr)
    new_project['supervisor'] = supervisor_id
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
    return json_util.dumps({"task_id": task['task_id']})

#add worker from form data
@app.route("/addworker", methods = ["POST"])
def add_worker():
    worker = request.form.to_dict()
    worker['tasks'] = []
    #skills and personality traits entered as words with commas in between
    worker['skills'] = worker['skills'].split(',')
    worker['personality_traits'] = worker['personality_traits'].split(',')
    workerStr = str(worker).replace("'", '"')
    print("Added worker: " + workerStr)
    mongo.db.Workers.insert_one(json_util.loads(workerStr))
    return "Worker Added!"

#add profile pic to employee given employee id and file upload
@app.route("/addprofile", methods = ["POST"])
def add_pf():
    employee_id = bson.objectid.ObjectId(request.args.get('employee_id'))
    file = list(request.files.to_dict().values())[0]
    pic_id = fs.put(file, content_type=file.content_type, filename=file.filename)
    employee = mongo.db.Workers.find_one_or_404({"_id": employee_id})
    employee['pf'] = pic_id
    mongo.db.Workers.update({"_id": employee_id}, employee)
    print(pic_id)
    return "added picture with id " + str(pic_id)

#get profile pic given employee id
@app.route("/getprofile", methods = ["GET"])
def get_pf():
    employee_id = bson.objectid.ObjectId(request.args.get('employee_id'))
    employee = mongo.db.Workers.find_one_or_404({"_id": employee_id})
    pic_id = employee['pf']
    file = fs.get(pic_id)
    response = make_response(file.read())
    response.mimetype = file.content_type
    return response

#Creates a new post given form data and employee id
@app.route("/newpost", methods = ["POST"])
def new_post():
    employee_id = bson.objectid.ObjectId(request.args.get('employee_id'))
    post = request.form.to_dict()
    post['likes'] = 0
    post['views'] = 0
    post['comments'] = []
    post['timestamp'] = datetime.datetime.now()
    postStr = str(post).replace("'", '"')
    print("Added post: " + postStr)
    new_post = json_util.loads(postStr)
    new_post['user_id'] = employee_id
    mongo.db.Posts.insert_one(new_post)
    return "Post added!"
