import matplotlib.pyplot as plt
import numpy as np
import matplotlib.font_manager

#Some example values to work with
num_of_workers = 5
projects_surveyed = 3
worker_names = ['Akshat Jain', 'Mahatrapata', 'Chingchi', 'Sister Piggie', 'Krishnomoy']
worker1 = [32, 24, 42, 56, 87] # worker 1's last 5 projects' impact scores
worker2 = [2, 34, 54, 65]
worker3 = [32,32, 12, 32, 43, 43, 54, 53]
worker4 = [61, 62, 63,70, 88, 23.5]
worker5 = [12, 34, 20]
workers = [worker1, worker2, worker3, worker4, worker5]
values_example = [worker[len(worker)-projects_surveyed:] for worker in workers]

def graph_impact_score(values):
    values_average = [sum(values)/projects_survered for values in values_example]
    plt.figure()
    #plt.rcParams['font.family'] = 'sans-serif'
    plt.rcParams['font.sans-serif'] = 'Helvetica'
    plt.title('Overview of workers\' performance for past {0} projects'.format(projects_surveyed))
    plt.bar(worker_names, values_average,0.45, alpha=0.5, align='edge', color='green')
    # alpha is the opcaity and the value in front of alpha is the width of each bar
    plt.xlabel('List of workers', size=20, color='blue')
    plt.show()

    """ there are ways to improve the fonting of the analysis but it
    takes time to look for the font and a bunch of stuff I don't
    really understand, but it says 'Helvetica' font is a really good
    one
    """
