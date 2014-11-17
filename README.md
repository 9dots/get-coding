![getCoding](http://www.getcoding.io/apps/main/getCoding.png)

[ ![Codeship Status for 9dots/get-coding](https://codeship.com/projects/d2ee8420-4eb2-0132-80dc-1a7a8fd81b40/status)](https://codeship.com/projects/47774)

getCoding is a platform that makes it easy to create mini learning environments for coding.  Learning environments are composed of a **workspace** that produces student code and a **playspace** where student code is executed.

- [Features](#features)
- [Installation](#installation)
- [Getting Started](#getting-started)

## Features

  1. Create a custom environment by defining an app composed of a **workspace**, **playspace**, and set of levels.
  2. Create your own **playspace** by defining an API for your manipulatable space.
  3. **Playspaces** are automatically stepable and traceable.
  4. Pluggable **workspaces** makes it easy to ensure your app is age appropriate.

## Installation

```
$ git clone git@github.com:9dots/get-coding.git
$ cd get-coding
$ npm install
$ gulp dev
```

## Getting Started

You can contribute to getCoding by creating new apps, playspaces or workspaces.

### Making a new app

Check out `apps/space-man` for an example of an app.

1. Add a directory to `apps` with your app name.
2. Add a package.json to the app directory that defines a `name`, `title`, `description`, and `author` field.
3. Create an angular module in index.js that registers your app with the appsProvider. The appsProvider expects the metadata for the app, the template for the workspace, the template for the playspace and the list of levels.
4. Add your app to the list of dependenceis in `main/index.js`.

### Making a new playspace

Check out `lib/playspace-spaceman` for an example of a playspace.

1. Add a directory to `lib` with your playspace name prefixied by `playspace-`.
2. Define an angular directive in `index.js` of your new directory with the same name as the directory.
3. The controller for the directive must define the playspace interface and must be registered with the `App` controller, which can be found on the scope. Register the playspace ctrl by calling: `App.add(Playspace)`.
4. The playspace interface is composed of an activate method, which intitialises the space given the parameters `level`, and `speed`. Level is the data that defines a level and speed is the step speed. The interface must also define an `api` method which returns an object of student callable functions, and a finished and failed bool.
5. Incorporate the directive in the playspace template of any app and your good to go.





