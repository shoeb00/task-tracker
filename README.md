# Task Tracker
Task Tracker application will keep track of your tasks with an option to set reminder. Task Tracker is build with the ReactJS at the front end and uses Json-Server to handle the backend. 

## Getting Started
### Dependencies
* Before moving forward make sure you have [Node](https://nodejs.org/en/) Installed on you computer.

### Installing
* All the dependencies are available in the project file at `package.json`
* To install all the dependencies run the following command:
```bash
$ npm install
```
### Running the application
* After installing all the dependencies run the following command to launch the application:
```bash
$ npm start
```
* This command will build the react application and run it on the default port `3000`
* To launch the Json-Server run the following command:
```bash
$ npm run server
```
* Json server will be started on the port `4000` to change the port, just open the package.json and inside scripts then server you will find the port and the command.
* Json server will create db.json file to store the database in the Json format.