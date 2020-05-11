# Constructable
## Inspiration
The city of Los Angeles is immersed in construction. For the past 10 years, there has been a steady rise in city construction development, and coupled with major projects such as the creation of the 2024 Superbowl Stadium, there is a large market present. This large, but outdated, market is currently at the forefront of innovation, and we at Construtable aim to impact this innovating industry with a revolutionary product that increases productivity, collaboration, and management. No company at this time offers a productivity and local collaboration application that can be used by any employee in any construction company (even though it is needed in order to ensure city wide productivity and safety), and we aim to fill this large gap. 


## What it does

Constructable aims to impact the construction industry in two major ways. First, we have created a social media-esque dashboard aimed to increase collaboration within the whole industry, regardless of company. This local activity section allows for anyone to post pictures of their worksite progress or post color coded status updates about current construction situations(such as dangers or cautions about certain areas). This directly improves collaboration between construction crews of the whole city, which results in a decrease of city congestion while masking the chaos of construction to Los Angeles tourists and residents.  

Constructable also introduces a task manager that revolutionizes the way construction projects are handled. Supervisors can create a project and create subtasks within each project which they can automatically assign to any of their workers through the app. With the aid of analytical trends, supervisors can gauge their project’s impact to the city in regards to efficiency and safety and workers can gauge their impact to the project as a whole. Through the use of Twilio, supervisors and workers are able to send each other real time notifications right to their phone regarding any urgent updates on tasks or projects. This effective communication system increases collaboration within a project as both parties are able to quickly and easily communicate, in real time, through the app. 

In order to assure that we have active participation within the app’s social media and management communication aspects, Constructable calculates each individual user's “impact score.” A user’s impact score is calculated using a precise formula that takes everything from views per post, number of posts, timely task completion, and effective communication as factors. This score is public to anyone, and can help gauge the user’s productivity. This impact score can be shared with government officials as well as other construction project contractors to help them gauge who to give construction contracts too(the higher a group’s impact score, the more resourceful and sustainable they are in their work). As a result, users are motivated into using more of Constructable’s features in order to increase their impact score and get assigned to more projects in the future.

With a clean and easy to follow user interface coupled with an innovative data-driven approach for construction in regards to productivity, collaboration, and management, Constructable prospers to completely revolutionize the local and global construction industry. 

 
## How we built it

We built Constructable with a very careful design methodology in mind. We wanted to utilize the full analytical power of Python while also harnessing the strength of cross-platform web-like development in React Native. 

To start off, we wanted a modern user interface that would be easy to use and appealing to the eye. For this, we decided to create our own full fledged UI Kit using Adobe XD. By creating mockups for every page, we were able to implement seamless designs into every page of our application.  To ensure that these seamless designs get carried through to their full potential, we learned best Material Design practices.

We decided to proceed with React Native for the frontend, Python (Flask) as it’s API and MongoDB Atlas for the database. The easy image caching, scalability and No-SQL structure made us fall in love with MongoDB.

For the backend, we used Flask to set up a server through Python, and we utilized “routing” functions that would be called using queries on the React Native JS front end of this application. For testing, we developed data schema through the Mongo DB, and we also used Postman to create test queries (for the backend team to use while front end was being developed).

We create analytics because we believe data  driven methodologies will allow both the clients of the application as well as us developers to better optimize and improve overrall productivty. We didn’t have enough time to actually integrate this with the front end application, but we were able to create the backend Python script that develops the analytics.

A great tool that we used for this hackathon was Twilio’s beautiful, developer-friendly API which let us urgently notify a supervisor about something without sending a notification that will probably be ignored anyways! The supervisors and the workers both need to register their phone numbers on sign up, which allows for people to utilize their daily communication tools to beautifully interact with the application. Twilio greatly helps our application as we use it to increase communication and collaboration within users.

In addition, we are currently in the process of deploying our server to a Google App Engine instance to improve upon the shortcomings of Flask’s development environment. As another nice advantage, this provides some added scalability to our application.


## Challenges we ran into

At the beginning, it was a huge challenge to get everybody onto the same page and understand all the different perspectives of this idea that we wanted to build. There was so much to do and such little time! A lot of our initial time was spent technically planning each and every step - something we thought was essential, especially in a virtual setting like this one. 

Technically we encountered some challenges in the database design when, for one of the first times in our lives, we were forced to think non-relationally so that our API and FrontEnd code could properly utilize the full extent of its power. It was definitely some adjustment over the traditional SQl but nonetheless taught us a lot about different methods of database design thinking.

## Accomplishments that we're proud of

Throughout our journey of building this project, we had many moments that made us especially proud. Around the beginning of the hackathon, before we made significant progress on the backend, we were able to test out Twilio’s API with great success. This allowed us to easily implement Twilio notifications in our Constructable app. When we started working on the rest of the backend, it was exciting when we were able to get data from and post to our database, despite the fact that none of us had considerable prior experience with Flask or MongoDB. We were also thrilled when we implemented several routes to upload, store, and access photos, because that easily allowed us to implement profile pictures and pictures in the posts.  We’re also proud of how skillfully we utilized data structures to efficiently manage the data.

Additionally, in the UI/UX side, we are all really proud to finish all the designs to perfection and make sure we pay attention to 


## What we learned

We learned a lot about how to utilize databases for a backend implementation, and the advantages of a non-relational database over a standard relational system. Additionally, we learned standard server functions and how to use Flask. We also gained practical experience in  dealing with and converting with unique data types such as ObjectId’s, which although we had learned in an academic setting, working on it practically was a more enriching experience. In our organizational process, we learned how beneficial it is to start planning before getting to work, and we saw the benefits of creating an Adobe XD mockup before proceeding with the UI and integration. We also learned how important communication is, as we had to frequently call to make sure that we were on the same page, which was key in making sure the different parts of our project integrate together.

## What’s next for Constructable

Construable is coming to the market in a time when it is needed the most. Though our first version is practically ready for heavy industry use, we would love to push new features onto our app to increase productivity. For starters we will implement a clock in/out feature within our task manager. This feature will motivate workers to take 3 pictures of their worksites every day they work: one for the current state of construction site before working, the state of the construction site midway through the day, and the final progress for the day on the construction site. This feature will enable more effective communication between workers and supervisors, as well as allow for others to see local updates on projects in their area. Constructable will look to see if an employee successfully checks in during these times of the day, and increase/decrease their impact score depending on the situation. We will also push out an update where we introduce a rewards feature. As an employee works on numerous tasks, they will start to accumulate “reward points” as well. In this page, a supervisor can view current prizes and upload a picture / title / cost of a new prize. A worker can view all prizes, view their current points and spend their points towards the supervisor prizes. When a worker cashes in on a prize, a post will be shared on the ‘Dashboard’. We have this update in mind to increase worker productivity through a gamified incentive.



