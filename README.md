# MERN Recipe App | BACKEND

Node Express Recipe API that allows users to create and manage recipes.

### Recipe App | Frontend

[https://github.com/Lspacedev/online-recipe-app/tree/api](https://github.com/Lspacedev/online-recipe-app/tree/api)

## Prerequisites

- Nodejs

## Installation

1. Clone the repository

```bash
git@github.com:Lspacedev/recipe-app-api.git
```

2. Navigate to the project folder

```bash
cd recipe-app-api
```

3. Navigate to branch

```bash
git checkout auth
```

4. Install all dependencies

```bash
npm install
```

5. Create an env file and add the following:

```bash
PORT="Specify your port here"
MONGO_URI="MongoDb database uri"

```

6. Run the project

```bash
node app
```

## Usage

1. The server should run on PORT 8000, unless a port is specified.
2. Use http://localhost:8000, to test the API on Postman or any other tool.

## Routes:

API is built using a Node Express server, with MongoDb as a database.
Api uses JWT tokens to authenticate user.

#### Index Router:

- Register an account.
- Login to an account.
- Get and Update Profile.

Endpoints

```python
    1. POST /register
        Inputs: username, email, password, role (ADMIN | USER).

    2 POST /login
            Inputs: username, password

    3. GET /profile
    4. PUT /profile
            Inputs: username, email, password
```

#### Recipes Router:

- Get all user's recipes.
- Get individual user's recipe.
- Add to user's recipes.
- Update user's recipe.
- Delete user's recipe.

Endpoints

```python
    1. POST /api/recipes
        Inputs: name, ingredients, instructions, category, prepTime, cookingTime, servings

    2. PUT /api/recipes/:recipeId
            Params: recipeId
            Inputs:  name, ingredients, instructions, category, prepTime, cookingTime, servings
    3. DELETE /api/recipes/:recipeId
      Params: recipeId

    5. GET /api/recipes
    6. GET /api/recipes/:recipeId
      Params: recipeId

```

## Tech Stack

- NodeJs
- Express
- MongoDb
