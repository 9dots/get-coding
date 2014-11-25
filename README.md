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
$ git clone https://github.com/9dots/get-coding.git
$ cd get-coding
$ npm install
$ gulp dev
```

Note: gulp dev requires node v0.11

## Getting Started

You can contribute to getCoding by creating new apps, playspaces or workspaces.

### Making a new app

```
gulp create-app
```

#### Sample Answers

```
name: space-man
playspace: spaceman
workspace: ace
title: Space Man
description: Introduction to programming with space man.
author: Josh Taylor
```

Check out `apps/space-man` for an example of an app.


### Making a new playspace

```
gulp create-playspace
```

Check out `lib/playspace-spaceman` for an example of a playspace.


### Making a new workspace

```
gulp create-workspace
```

Check out `lib/workspace-ace` for an example of a workspace.








