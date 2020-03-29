from app import app
from flask_pymongo import PyMongo
from flask import jsonify, request, url_for, render_template, make_response
from bson import json_util
import bson
from gridfs import GridFS
from twilio.rest import Client
import json


app.config["MONGO_URI"] = "mongodb+srv://Shaunak:construction@constructable-6isx0.mongodb.net/AppData"
mongo = PyMongo(app)
fs = GridFS(mongo.db)

#get json given first_name
@app.route("/getworker", methods = ["GET"])
def get_worker():
    name = request.args.get('first_name')
    worker = mongo.db.Workers.find_one_or_404({"first_name": name})
    return json_util.dumps(worker)

#get role given employee id
@app.route("/getrole", methods = ["GET"])
def get_role():
    employee_id = bson.objectid.ObjectId(request.args.get('employee_id'))
    worker = mongo.db.Workers.find_one_or_404({"_id": employee_id})
    return worker['role']

#get tasks given employee id
@app.route("/gettasks", methods = ["GET"])
def worker_tasks():
    employee_id = bson.objectid.ObjectId(request.args.get('employee_id'))
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
    project_ids = list(set([task['project_id'] for task in current_tasks]))
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
    project['completion time'] = int(project['completion time'])
    projectStr = str(project).replace("'", '"')
    new_project = json_util.loads(projectStr)
    new_project['supervisor'] = supervisor_id
    if (len(list(request.files.to_dict().values())) != 0):
        file = list(request.files.to_dict().values())[0]
        pic_id = fs.put(file, content_type=file.content_type, filename=file.filename)
        new_project['pic_id'] = pic_id
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
    if (len(list(request.files.to_dict().values())) != 0):
        file = list(request.files.to_dict().values())[0]
        pic_id = fs.put(file, content_type=file.content_type, filename=file.filename)
        worker['pf'] = pic_id
    mongo.db.Workers.insert_one(worker)
    return "Worker Added!"

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
    post['views'] = 0
    post['comments'] = []
    postStr = str(post).replace("'", '"')
    print("Added post: " + postStr)
    new_post = json_util.loads(postStr)
    new_post['user_id'] = employee_id
    if (len(list(request.files.to_dict().values())) != 0):
        file = list(request.files.to_dict().values())[0]
        pic_id = fs.put(file, content_type=file.content_type, filename=file.filename)
        new_post['pic_id'] = pic_id
    mongo.db.Posts.insert_one(new_post)
    return "Post added!"

#Creates a new comment on a post given post id and user id
@app.route("/addcomment", methods = ["POST"])
def add_comment():
    post_id = bson.objectid.ObjectId(request.args.get('post_id'))
    employee_id = bson.objectid.ObjectId(request.args.get('employee_id'))
    comment = request.form.to_dict()
    comment['comment_id'] = bson.objectid.ObjectId()
    comment['user_id'] = employee_id
    post = mongo.db.Posts.find_one_or_404({"_id": post_id})
    post['comments'].append(comment)
    mongo.db.Posts.update({"_id": post_id}, post)
    return "Added comment!"

#get picture by post id
@app.route("/getpostpic", methods = ["GET"])
def get_post_pic():
    post_id = bson.objectid.ObjectId(request.args.get('post_id'))
    post = mongo.db.Posts.find_one_or_404({"_id": post_id})
    pic_id = post['pic_id']
    file = fs.get(pic_id)
    response = make_response(file.read())
    response.mimetype = file.content_type
    return response

#get picture by project id
@app.route("/getprojectpic", methods = ["GET"])
def get_project_pic():
    project_id = bson.objectid.ObjectId(request.args.get('project_id'))
    project = mongo.db.Projects.find_one_or_404({"_id": project_id})
    pic_id = project['pic_id']
    file = fs.get(pic_id)
    response = make_response(file.read())
    response.mimetype = file.content_type
    return response


#returns all posts if no id specified, one worker's posts if id is specified
@app.route("/getpostdata", methods = ["GET"])
def all_post_data():
    if (request.args.get('employee_id') == None):
        return json_util.dumps(mongo.db.Posts.find())
    employee_id = bson.objectid.ObjectId(request.args.get('employee_id'))
    all_posts = mongo.db.Posts.find({"user_id": employee_id})
    return json_util.dumps(all_posts)



task_status_options = ['about to start', 'about a quarter through', 'halfway through', 'almost done with', 'done']

@app.route("/updateTask", methods = ["GET"])
def updateTask():
    #JUST FOR TESTING THIS INDIVIDUAL FUNCTINO I HARDCODED THE EMPLOYEE ID
    employee_id = "5e7f92951c9d4400000534f3"
    #just iterate here possbily if doesn't work
    worker = mongo.db.Workers.find_one_or_404({"_id": bson.objectid.ObjectId(employee_id)})
    task_id = bson.objectid.ObjectId(request.args.get("task_id"))
    project_id = None
    for current_task in worker['tasks']['current']:
        if(current_task['task_id'] == task_id):
            project_id = current_task['project_id']
            break
    project = mongo.db.Projects.find_one_or_404({"_id": project_id})
    task_index = -1
    for i in range(len(project['tasks'])):
        if(project['tasks'][i]['task_id'] == task_id):
            task_index = i
            break


    #task_status query should be a value between 0 and 4
    task_status = task_status_options[int(request.args.get("task_status"))]

    if(task_status == "done"):
        #putting list around is potentially unnecessary
        for worker in list(mongo.db.Workers.find({})):
            worker_employee_id = str(worker["_id"])
            current_tasks = worker['tasks']['current']
            for i in range(len(current_tasks)):
                if(current_tasks[i]['task_id'] == task_id):
                    worker['tasks']['previous'].append(current_tasks[i])
                    #swap i with 0th position to cleanly "pop" off an element off the current_tasks
                    temp = current_tasks[0]
                    current_tasks[0] = current_tasks[i]
                    current_tasks[i] = temp
                    current_tasks.pop()
                    break
            mongo.db.Workers.update({"_id": worker_employee_id}, worker)

    project['tasks'][task_index]['status'] = task_status
    mongo.db.Projects.update({"_id":project_id}, project)
    worker_name = worker['first_name'] + " " + worker['last_name']
    project_name = project['tasks'][task_index]['name']
    updateMessage = "Hey, its Constructable!" + "\n" + "One of your workers just sent an update! " + "\n" + \
                    worker_name + " is " + task_status + " with the task " + project_name + "!"
    supervisor = mongo.db.Workers.find_one_or_404({"_id": worker['supervisor']});
    print(updateMessage)
    updateSupervisor(supervisor, updateMessage)
    return updateMessage


def updateSupervisor(reciever, updateMessage):
    assert reciever != None
    account_sid = "ACbadbbced8bbd777af7ad7897d80e46d3"
    auth_token = "4213c0a03fdc74e044b5e87d58724b6e"
    client = Client(account_sid, auth_token)
    client.messages.create(from_='18563452912', to=reciever['phone'], body=updateMessage)


@app.route("/comments", methods = ["GET"])
def comments():
    post_id = bson.objectid.ObjectId(request.args.get("post_id"))
    post = mongo.db.Posts.find_one_or_404({"_id" : post_id})
    comments = post['comments']
    print("hi")
    output_comments = []
    for comment in comments:
        user_id = comment['user_id']
        worker = mongo.db.Workers.find_one_or_404({"_id": user_id})
        user_name = worker['first_name'] +  " " + worker['last_name']
        pf = None
        if 'pf' in worker:
            pf = worker['pf']
        message = comment['message']
        output_comments.append({"user_name":user_name,"user_id": user_id, "profilePic":pf, "message":message})
    return output_comments

@app.route("/views", methods = ["GET"])
def views():
    post_id = bson.objectid.ObjectId(request.args.get("post_id"))
    post = mongo.db.Projects.find_one_or_404({"_id" : post_id})
    post['views'] += 1
    mongo.db.Posts.update({"_id": post_id}, post)

@app.route("/userInfo", methods = ["GET"])
def userInfo():
    employee_id = bson.objectid.ObjectId(request.args.get("user_id"))
    worker = mongo.db.Workers.find_one_or_404({"_id": user_id})
    user_name = worker['first_name'] +  " " + worker[last_name]

    impact_score = impact_score()
    pf = None
    if 'pf' in worker:
        pf = worker['pf']
    user_info = {}
    if(worker['role'] == 'worker'):
        num_comp_tasks = len(worker['tasks']['previous'])
        user_info = {"user_name": user_name, "impact_score": impact_score, "projects": num_comp_tasks, "profilePic": pf}
    elif(worker['role'] == 'supervisor'):
        num_comp_projs = len(worker['projects']['previous'])
        user_info = {"user_name": user_name, "impact_score": impact_score, "projects": num_comp_projs, "profilePic": pf}
    return user_info

def impact_score():
    return 3
