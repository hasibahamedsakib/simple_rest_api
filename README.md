# Simple REST API Documentation

Welcome to the Simple REST API documentation. This API provides CRUD operations for managing user data.

Base URL: `https://simple-rest-api.vercel.app/api/user`

## Endpoints

### Get All Users

Retrieve a list of all users.

- **URL:** `/`
- **Method:** GET
- **Response:**

```json
Status Code: 200 OK
[
  {
    "id": "user_id",
    "name": "User Name",
    "email": "user@example.com",
    "age": 25
  },
  // ... other users
]

Create a new user.

URL: /api/user
Method: POST
Request Body:
{
  "name": "User Name",
  "email": "user@example.com",
  "age": 25
}


Update an existing user by email.

URL: /api/user/:email

Method: PATCH

Parameters:

email- The email address of the user.
Request Body:
{
  "name": "Updated User Name",
  "age": 30
}


Delete User
Delete a user by email.

URL: /api/user/:email

Method: DELETE

Parameters:

email (string, required) - The email address of the user.
Response:
Status Code: 200 OK
{
  "message": "User deleted successfully."
}

```
