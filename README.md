# Social Media

This is a NodeJS project that simulates a social media REST API. It serves CRUD user endpoints as well as the relationship degree from one user to another.

### User data
To simplify and substitue a database, the project uses json file `static/users.json` filled with some random user data. 
It follows the schema:

```json5
{
  "id": 1, // in a real world application this would be a primary key and should be some random identifier or a social number
  "first_name": "Jane",
  "last_name": "Doe",
  "email": "jane@doe.com",
  "gender": "Female", // from enum { Female, Male, Non-binary, Bigender, Not specified }
  "connections": [2, 4, 6] // represents a relationship (friends/connection) with other users
}
```

## Setup

To build this project you will need:

- [Node](https://nodejs.org/) v20.11.0+
- [Docker](https://www.docker.com/get-started/) v4.26.1+

To run the tests and check if everything is running as expected, you will need:

- [Jest](https://jestjs.io/) v29.7+

After cloning the repo, install all dependencies:
```bash
npm i
```

# Running
If you want to run the app locally, it's possible to do in two ways:

using `npm`:
```bash
npm run serve
```

using `docker`:
```bash
docker compose up --build
```

both ways will serve the API running on `http://localhost:3000` or you can specify `PORT` environment variable.

# Testing
It's possible to check all simple test cases (happy path) with jest. Simply run:
```bash
npm run tests
```

# API Reference
The base url is primary `http://localshost:3000` and primary path is mostly `/users`:

List all users:
```http
GET /users
```

Get users by filter - it's possible to filter from first name, last name and email:
```http
GET /users?filter=string
```

Add new user:
```http
POST /users
Content-Type: application/json
{
  "first_name": "Jane",
  "last_name": "Doe",
  "email": "jane@doe.com",
  "gender": "Female",
  "connections": [2, 4, 6]
}
```

Get single user by `id`:
```http
GET /users/:id
```

Uptade user of `id`:
```http
PUT /users/:id
{
  "last_name": "Smith",
  "connections": [2, 4, 6, 8]
}
```

Remove user of `id`:
```http
DELETE /users/:id
```

Get relationship distance from one user with `id1` to another user with `id2`, based on [Djisktra algorithm](https://en.wikipedia.org/wiki/Dijkstra%27s_algorithm):
```http
GET /users/relationships/:id1-:id2
```
