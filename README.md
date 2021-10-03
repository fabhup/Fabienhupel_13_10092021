# ARGENTBANK PROJECT

## General information

This project is the frontend of the **ArgentBank Project**.\
It has been developed in React.js by **Fabien HUPEL** for **OpenClassrooms FrontEnd Degree.**
Redux is used in this project for the state management.

The ArgentBank FrontEnd Project has to used the ArgentBank Backend Project so you have to forked it from here :\
`https://github.com/OpenClassrooms-Student-Center/Project-10-Bank-API`

## Prerequisites

-   [NodeJS (**version 12.18 or greater**)](https://nodejs.org/en/)
-   [**Install the ArgentBank Backend Project**](https://github.com/OpenClassrooms-Student-Center/Project-10-Bank-API)

## Dependecies

    Use of create-react-app
    - @fortawesome/fontawesome-svg-core: "^1.2.36"
    - @fortawesome/free-regular-svg-icons: "^5.15.4"
    - @fortawesome/free-solid-svg-icons: "^5.15.4"
    - @fortawesome/react-fontawesome: "^0.1.15"
    - @reduxjs/toolkit: "^1.6.1"
    - @testing-library/jest-dom: "^5.11.4"
    - @testing-library/react: "^11.1.0"
    - @testing-library/user-event: "^12.1.10"
    - axios: "^0.21.4"
    - eslint-config-prettier: "^8.3.0"
    - gh-pages: "^3.2.3"
    - jsonwebtoken: "^8.5.1"
    - msw: "^0.35.0"
    - react: "^17.0.2"
    - react-dom: "^17.0.2"
    - react-redux: "^7.2.5"
    - react-router-dom: "^5.3.0"
    - react-scripts: "4.0.3"
    - save-dev": ^0.0.1-security"
    - styled-components: "^5.3.1"
    - web-vitals: "^1.0.1"

## Install the ArgentBank FrontEnd

-   Fork this repository and clone it on your computer (in a new repository).
-   Open the front end project and run the command `npm install` in a new terminal to install all the dependencies.
-   If the backend is not active, launch it
-   **Only if the backend is launched on a port other than 3001** :
    > -   Open the file **/src/utils/config/config.js**
    > -   Replace the 3001 port in URL_API by the active port :  
    >     `const URL_API = 'http://localhost:newport'`
-   Run the frontend with `npm start` (or `yarn dev`)
-   If you have this message in your terminal :

    > -   `Something is already running on port 3001.`\
    >     `Would you like to run the app on another port instead? › (Y/n)`

    Press `Y` to run the frontEnd on another port than the backend (it will be probably launched on port 3001)

-   Open [http://localhost:3000](http://localhost:3000) to view the frontend in the browser.

-   The page will reload if you make edits.

## Running the frontEnd without backend (activate msw for mock Data)

For development it's possible to run the project without the backend
You can easily switch from backend calls to mockDATA calls for testing :

-   Just open the file .env.development
-   Set variable REACT_APP_API_MOCKING to "enabled" to activate msw
-   Restart the frontend with "npm start"
-   Check in the console of your devtools browser if you see the message
    "[MSW] Mocking enabled."
-   Set variable to "disabled" to desactivate msw and use the backend

## Users for test :

-   email: "tony@stark.com" / password:"password123"
-   email: "steve@rogers.com" / password:"password456"
