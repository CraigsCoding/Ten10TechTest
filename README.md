<h1>Ten10 Tech Test</h1>

<h2>Overview</h2>
This project is designed to demonstrate my test automation ability within the 2 hour time constraint required. I used playwright and typescript due to its popularity and powerful tooling for testing against web apps. 

I designed the project to try and encapulate what I consider to be the best approach, It is by no means perfect due to the constraints of the assignment, and there are plenty of things I would consider refactoring if i was given more time. I have provided below an overview of the project, as well as instructions on how to run it: 

<h2>Installation</h2>
To install and run locally, please clone this repository and run the command 
<i>npm install</i>
within the cloned repository to install all the neccessary dependencies (please ensure you have NPM already installed, details can be found here: <i>https://docs.npmjs.com/about-npm)</i><br>
after installation, please add a .env file to the root folder of the projects directory. Inside add your credentials for logging into the web app in the following format: <br>
<i>EMAIL=youremail@example.com <br>
PASSWORD=supersecretpasswordyoushoulddefinitelynotstoreinyourgitremoterepository</i>

<h2>Run Tests</h2>
Playwright provides multiple options for running tests. the fastest and most basic is the command <i>'npx playwright test'</i> <br> which when ran at the root level of your projects directory, will run all the tests in the project. It will do this in parallel by default unless changed in config. 
The other option is a graphical component, this makes it easiser to get an overview of the tests, run them independently, observe the output etc. you can open this by running <i>'npx playwright test --ui' </i> <br>

Please note when running tests that 2 of the tests are currently failing due to the website not meeting the stakeholders requirements. Both tests have a comment above indicating this. 
