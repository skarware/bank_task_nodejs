# bank_task_nodejs
## About

One of home/job tasks I got while looking for my first job as a web developer; Application made using <b><i>JavaScript(ES6+), Node.js, npm and node-fetch</i></b> module for fetching remote API.

Project developed using Node.js v14.3.0, but tested to work with v12.18.0 with some warning about ESM module loader being experimental.

Made a decent effort to make code [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript) compatible.

Tried to write OOP code to my Date.now() best understanding, like separation of concerns and encapsulation of internal workings of the class/module to hide details from outside while providing a simple interface to work with a class or module and there should be no to little pain adding new functionality.

For more look into source code, dare to say it is well commented to get a good idea of what I was trying to achieve.  
    
## Project setup

Open terminal and use <i>git clone</i> command to download the remote GitHub repository to your computer:
```
git clone https://github.com/skarware/bank_task_nodejs.git
```
It will create a new folder with same name as GitHub repository "bank_task_nodejs". All the project files and git data will be cloned into it. 
After cloning complete change directories into that new folder:
```
cd bank_task_nodejs
``` 
Install the dependencies for the project in the local node_modules folder.
```
npm install
```
## How to run the app
To run the program change directories into src folder and using node execute app.js with input.json argument for data input: 
```
cd src
node app.js input.json
```
For a moment it will fetch some configuration data from remote API and then do calculations for you. If all went well you should see following lines printed to stdout:
```
skarware@citadel:~bank_task_nodejs/src# node app.js input.json
0.06
0.90
87.00
3.00
0.30
0.30
5.00
0.00
0.00
```
