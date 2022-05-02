# REST API - FAVS API

`https://favs-api.herokuapp.com`

## Install dependencies

    npm install

## Run the app

    npm start  

## Run the tests

    npm test

# REST API

The REST API is described below.

## Register an user

### Request

`POST /auth/local/register`

    body: {
        "name": "John Doe",
        "email": "test@gmail.com",
        "password": "test"
    }

### Response

    HTTP/1.1 201 Created
    Status: 201 Created
    Content-Type: application/json

    {
        "name": ,
        "password": ,
        "email": ,
        "_id": ,
        "__v": ,
    }

## Login

### Request

`POST /auth/local/login`

    body: {
        "email": "prueba@gmail.com",
        "password": "123"
    }

### Response

    HTTP/1.1 200 OK
    Status: 200 OK
    Content-Type: application/json

    {
        "token": ,
    }

## Create a list

### Request

`POST /api/list/create`

    Authorization: Bearer <token>

    body: {
        "user_id": "", // mongoose ObjectId of the user
        "name": "My List's name"
    }

### Response

    HTTP/1.1 201 Created
    Status: 201 Created
    Content-Type: application/json

    {}

## Delete a list

### Request

`DELETE /api/list/delete/id`

    Authorization: Bearer <token>

### Response

    HTTP/1.1 200 OK
    Status: 200 OK
    Content-Type: application/json

    {"acknowledged":true,"deletedCount":1}

## Get Lists By User

### Request

`POST /api/list/user/id`

    Authorization: Bearer <token>

### Response

    HTTP/1.1 200 OK
    Status: 200 OK
    Content-Type: application/json

    [
        {
            "_id": "626071c1ec673cc54b8f7a85",
            "name": "My Second List",
            "favs": [...],
            "user_id": "625af32f6dc7003ee23f5a5d",
            "__v": 7
        },
        {
            "_id": "6261b6b1d9d68c30a9b4830f",
            "name": "My Last List",
            "favs": [...],
            "user_id": "625af32f6dc7003ee23f5a5d",
            "__v": 0
        }
    ]

## Get list By Id

### Request

`GET /api/list/id`

    Authorization: Bearer <token>

### Response

    HTTP/1.1 200 OK
    Status: 200 OK
    Content-Type: application/json

    {
        "_id": "626071c1ec673cc54b8f7a85",
        "name": "My Second List",
        "favs": [...],
        "user_id": "625af32f6dc7003ee23f5a5d",
        "__v": 7
    }

## Add a fav to a list by its id

### Request

`POST /api/fav/add/id`

    Authorization: Bearer <token>
    body:{
        "title": "Second list's fav 10",
        "description": "This is a description",
        "link": "www.google.com"
    }

### Response

    HTTP/1.1 201 Created
    Status: 201 Created
    Content-Type: application/json

    {
    "_id": "626071c1ec673cc54b8f7a85",
    "name": "My Second List",
    "favs": [
        {
            "id": 0,
            "title": "Second list's fav",
            "description": "This is a description",
            "link": "www.google.com"
        },
        {
            "id": 2,
            "title": "Second list's fav 3",
            "description": "This is a description",
            "link": "www.google.com"
        },
        {
            "id": 3,
            "title": "Second list's fav 4",
            "description": "This is a description",
            "link": "www.google.com"
        },
        {
            "id": 4,
            "title": "Second list's fav 10",
            "description": "This is a description",
            "link": "www.google.com"
        }
    ],
    "user_id": "625af32f6dc7003ee23f5a5d",
    "__v": 8
}

## Delete a fav from a list by its id

### Request

`DELETE /api/fav/delete/id`

    Authorization: Bearer <token>
    body:{
        "id": 0 // id of the fav to delete
    }

### Response

    HTTP/1.1 200 OK
    Status: 200 OK
    Content-Type: application/json

    {
        "_id": "626071c1ec673cc54b8f7a85",
        "name": "My Second List",
        "favs": [
            {
                "id": 2,
                "title": "Second list's fav 3",
                "description": "This is a description",
                "link": "www.google.com"
            },
            {
                "id": 3,
                "title": "Second list's fav 4",
                "description": "This is a description",
                "link": "www.google.com"
            },
            {
                "id": 4,
                "title": "Second list's fav 10",
                "description": "This is a description",
                "link": "www.google.com"
            }
        ],
        "user_id": "625af32f6dc7003ee23f5a5d",
        "__v": 9
    }

