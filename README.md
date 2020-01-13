# Here Maps in Angular 8
A demo application to show list of restaurants new user's location 

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.3.18.

## Prerequisites

Before you begin, make sure your development environment includes Node.js® and an npm package manager.

#### Node.js

Angular requires Node.js version 10.9.0 or later.

- To check your version, run ``` node -v ``` in a terminal/console window.

- To get Node.js, go to [nodejs.org](https://nodejs.org).

#### npm package manager
Angular, the Angular CLI, and Angular apps depend on features and functionality provided by libraries that are available as [npm packages](https://docs.npmjs.com/about-npm/index.html). To download and install npm packages, you must have an npm package manager.

I'm using [npm client](https://docs.npmjs.com/cli/install) command line interface, which is installed with Node.js by default.

To check that you have the npm client installed, run ``` npm -v ``` in a terminal/console window.

### Step 1: Install the Angular CLI
```bash
npm install -g @angular/cli
```
### Step 2: Download Project's Clone from github
```bash
git clone https://github.com/ahmadraza2012/here-maps-in-angular-8.git
```
### Step 3: Install Dependencies using npm
change directory to project directory using `cd here-maps-in-angular-8` and install dependencies using npm
```bash
npm install
```
### Step 4: Add API key to access hereMaps
open file `src/environments/environment.ts` and add API_KEY here.
```
_apykey: '{YOUR_API_KEY_HERE}'
```
Please create a new one from [developer.here.com/develop/javascript-api]('https://developer.here.com/develop/javascript-api') in case you don't have.

### Step 5: Run Development server
Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
