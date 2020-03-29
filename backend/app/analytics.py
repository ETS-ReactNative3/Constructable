import matplotlib.pyplot as plt
import datetime
import numpy as np
import matplotlib.font_manager



class Worker:
    def __init__(self, name, id, curr_pro, title, work_history=[]):
        self.name = name
        self.id = id
        self.work_history = work_history
        self.current_project = curr_pro
        self.title = title

    def finish_work(self):
        self.work_history += self.current_project
        self.current_project = None


class Supervisor(Worker):
    def __init__(self, name, id, curr_pro, title, workers_list, work_history=[]):
        Worker.__init__(self, name, id, curr_pro, title, work_history)
        self.workers_list = workers_list


class Project:
    List_of_work_types = ["Boilermaker", "Carpenter", "Carpet Installer", "Cement & Concrete Finisher",
                          "Dredge Operator", "Electrician/Technician"]

    def __init__(self, supervisor, workers, location, type):
        self.supervisor = supervisor
        self.workers = workers
        self.location = location
        self.type = type


class Location:
    def __init__(self, descrip, long, lati):
        self.description = descrip
        self.longitude = long
        self.latitude = lati

# Some example values to work with
num_of_workers = 5
projects_surveyed = 3
names_example = ['Akshat Jain', 'Mahatrapata', 'Chingchi', 'Sister Piggie', 'Krishnomoy']
worker1 = [32, 24, 42, 56, 87]  # worker 1's last 5 projects' impact scores
worker2 = [2, 34, 54, 65]
worker3 = [32, 32, 12, 32, 43, 43, 54, 53]
worker4 = [61, 62, 63, 70, 88, 23.5]
worker5 = [12, 34, 20]
workers_example = [worker1, worker2, worker3, worker4, worker5]
values_example = [worker[len(worker) - projects_surveyed:] for worker in workers_example]


def graph_impact_score(worker_names, values, past_projects_viewed):
    """Give an overview of how the workers performed by showing their impact
    scores in the number of
    @param worker_names: a list of workers' names
    @param values: a list of lists of all the impact scores associated with each
    worker in the current project
    @param past_projects_viewed: number of projects the supervisor wants to evaluate
    @return: None, a graph representing the relationship
    """
    if len(worker_names) != len(values):
        raise Exception("The ")
    values = [value[len(value) - projects_surveyed:] for value in values]
    values_average = [sum(value) / past_projects_viewed for value in values]
    plt.figure()
    plt.rcParams['font.sans-serif'] = 'Helvetica'
    plt.title('Overview of workers\' performance for past {0} projects'.format(projects_surveyed), size=20)
    plt.bar(worker_names, values_average, 0.45, alpha=0.5, align='edge', color='green')
    # alpha is the opcaity and the value in front of alpha is the width of each bar
    plt.xlabel('List of workers', size=20, color='blue')
    plt.show()


graph_impact_score(names_example, values_example, 3)


Worker_date_examples = ["Pranay Hashinadier", "Pranav Karth", "Justin Lancelot"]
w1_d1 = datetime.datetime(2018, 5, 17)
w1_d2 = datetime.datetime(2018, 7, 4)
w1_d3 = datetime.datetime(2018, 9, 6)
w1_d = [w1_d1, w1_d2, w1_d3]
w2_d1 = datetime.datetime(2019, 1, 11)
w2_d2 = datetime.datetime(2019, 1, 25)
w2_d3 = datetime.datetime(2019, 5, 30)
w2_d = [w2_d1, w2_d2, w2_d3]
w3_d1 = datetime.datetime(2017, 12, 25)
w3_d2 = datetime.datetime(2018, 3, 15)
w3_d3 = datetime.datetime(2018, 5, 15)
w3_d = [w3_d1, w3_d2, w3_d3]
Date_example = [w1_d, w2_d, w3_d]


"Can't really figure out how to implement the time of the past projects a worker " \
 "has done."
def past_worker_time_records(Dates):
    plt.figure()


locations_example = [0, 4, 6, 7, 8, 3, 3, 2, 5, 6, 7]
impact_score_example = [54, 65, 76, 43, 69, 69, 69, 55, 90, 35, 56]
name_example = "Jiju Kahassa"
keys = {0: "Central", 1: "North", 2: "Northeast", 3: "East", 4: "Southeast",
        5: "South", 6: "Southwest", 7: "West", 8: "Northwest"}


def graph_location_relation(name, locations, imp_scores):
    """Analyze the relationship between location and the worker's performance.
    :param locations: a list of values 0-8 representing different locations in a city
    0 representing the central area, and 1-8 representing 8 directions on a map
    going clockwise, with 1 being the North direction, 4 the Southeast direction
    and 8 the Northwest direction.
    :param imp_scores: a list of impact scores this worker earned in the past projects
    at corresponding locations.
    """
    if len(locations) != len(imp_scores):
        raise Exception("number of location not match with number of impact scores")
    locations = [keys[location] for location in locations]
    plt.figure()
    plt.scatter(locations, imp_scores, s=80, c='g', marker='s', alpha=0.6)
    plt.xlabel('Locations in the city', size=20, color='cyan')
    plt.ylabel("Impact Scores", size=20, color='r')
    plt.title("{0}'s performance according to locations".format(name), size=20)
    plt.show()


graph_location_relation(names_example, locations_example, impact_score_example)


gender_example = ["male", "male", "male", "female"]


def female_male_ratio(gender):
    """draw a pie chart indicating the ratio between males and females under
    the supervisor.
    :param gender: a list of strings of females and males
    """
    plt.figure()
    num_male = gender.count("male")
    num_female = len(gender) - num_male
    ratio = [num_male / len(gender), num_female / len(gender)]
    labels = ["male", "female"]
    plt.pie(ratio, labels=labels, colors=['c', 'red'], autopct='%1.1f%%', shadow=True, startangle=90)
    plt.show()


female_male_ratio(gender_example)

