# MERN Recipe App | BACKEND

Node Express Recipe API that allows users to create and manage recipes.

### Recipe App | Frontend

[https://github.com/Lspacedev/online-recipe-app](https://github.com/Lspacedev/online-recipe-app)

## Prerequisites

- Nodejs
- A Cloudinary account, follow the link [here](https://cloudinary.com/)

## Installation

1. Clone the repository

```bash
git@github.com:Lspacedev/recipe-app-api.git
```

2. Navigate to the project folder

```bash
cd online-recipe-app
```

3. Checkout prod branch

4. Install all dependencies

```bash
npm install
```

5. Create an env file and add the following:

```bash
PORT="Specify your port here"
MONGO_URI_PROD="MongoDb database uri"
JWT_SECRET="Jwt secret"
CLOUDINARY_CLOUD_NAME="Cloudinary cloud name"
CLOUDINARY_API_KEY="Cloudinary api key"
CLOUDINARY_SECRET_KEY="Cloudinary secret key"

```

6. Run the project

```bash
node index
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
        Inputs: username, email, password, role.

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
        Inputs: name, ingredients, instructions, category, prepTime, cookingTime, servings, image

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
