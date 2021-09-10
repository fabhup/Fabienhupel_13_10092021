# ARGENTBANK PROJECT

## General information

This project is the frontend of the **ArgentBank Project**.\
It has been developed in React.js by **Fabien HUPEL** for **OpenClassrooms FrontEnd Degree.**
Redux is used in this project for the state management.

The ArgentBank FrontEnd Project has to used the ArgentBank Backend Project so you have to forked it from here :\
`https://github.com/OpenClassrooms-Student-Center/Project-10-Bank-API`

## Prerequisites

- [NodeJS (**version 12.18 or greater**)](https://nodejs.org/en/)
- [**Install the ArgentBank Backend Project**](https://github.com/OpenClassrooms-Student-Center/Project-10-Bank-API)

## Install the ArgentBank FrontEnd
- Fork this repository and clone it on your computer (in a new repository).
- Open the front end project and run the command `npm install` in a new terminal to install all the dependencies. 
- If the backend is not active, launch it
- **Only if the backend is launched on a port other than 3001** :
    >- Open the file **/src/constants/routesAPI.js**
    >- Replace the 3001 port in URL_API by the active port :  
    >`const URL_API = 'http://localhost:newport'` 
- Run the frontend with `npm start` (or `yarn dev`)
- If you have this message in your terminal :

    >- `Something is already running on port 3001.`\
    >`Would you like to run the app on another port instead? › (Y/n)`

  Press `Y` to run the frontEnd on another port than the backend (it will be probably launched on port 3001) 

- Open [http://localhost:3000](http://localhost:3000) to view the frontend in the browser.

- The page will reload if you make edits.
