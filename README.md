# SOMSA
![Somsa logo](https://cdn.discordapp.com/attachments/733447389393977406/780950213497847869/Account.jpg)
Somsa is a social media sentiment analyzer created with the purpose of understanding how people feel and respond to specific topics. SOMSA  retrieves information about trending topics from Reddit and Twitter and returns the general sentiment about the topic as well as a confidence interval.

# Procedure
1. Retrieve data from Twitter and Reddit using Scrapy and Selenium Python libraries.
2. Push Retireved data through the sentiment analyzer, which was built with TensorFlow and Keras, to determine whether different sentences were positive or negative.
3. The data is then sent to our MySQL database using Node.js and Sequelize, where is can be sent out by Axios, a JavaScipt library, via an API call made by our React JS front end.

# Tech and Framework Used
* Back End:
  * [Node.js](https://github.com/nodejs)
  * [Express](https://github.com/expressjs/express)
  * [MySQL Database](https://github.com/mysql/mysql-server)
  * [Python](https://github.com/python)
  * [Scrapy](https://github.com/scrapy/scrapy)
  * [Selenium](https://github.com/SeleniumHQ/selenium)
  * [Jupiter Notebooks](https://github.com/jupyter/notebook)
  * [Tensor Flow](https://github.com/tensorflow/tensorflow)
  * [Keras](https://github.com/keras-team/keras)
  * [Kaggle](https://www.kaggle.com/docs/datasets)
  * [Docker](https://github.com/docker/compose)
* Front End:
  * [React JS](https://github.com/reactjs/reactjs.org)
  * CSS
  * HTML
  * [Axios](https://github.com/axios/axios)
      
# Features
* Once fully implemented our project allows a user to view a web application featuring
  1. A trending topic
  2. A sentiment and confidence interval for that topic
  3. The ability to view and search different trending topic sentiments with or without logging in
  4. The ability to create an account and track a sentiment over time
  
# Getting Started
## Prerequisites
* [npm](https://github.com/npm/cli)

  `npm install npm@latest -g`
* [Docker](https://github.com/docker/compose)

 Instructions to install Docker Desktop for Windows can be found [here](https://hub.docker.com/editions/community/docker-ce-desktop-windows)
 Once insalled, open powershell as administrator
 `#Display version of Docker installed:
 docker version
 #Pull, create, and run "Hello World" in one command:
 docker run hello-world`
 ## Installation
 ### Demo Video
 [![Demo Video](https://j.gifs.com/81Rgwg.gif)](https://www.youtube.com/watch?v=JzmBxDfEr7E&feature=youtu.be)
 1. Clone the Repository
 
 `git clone https://github.com/Vincent-Acocella/SOMSA`
 2. Change directory to SOMSA
 `cd Somsa`
 3. Run Docker
 `docker-compose up --build -d`
  
