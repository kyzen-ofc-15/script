# Flask Pastebin-like App
This is a simple Flask app that provides a pastebin-like functionality using a REST API. It uses SQLite as the database and can be easily containerized with Docker.

## Table of Contents
- [Running the Application](#running-the-application)
- [Available API Endpoints](#available-api-endpoints)
    - [Get All Public Notes](#get-all-public-notes)
    - [Get a Specific Note](#get-a-specific-note)
    - [Create a New Note](#create-a-new-note)
    - [Update a Note](#update-a-note)
    - [Delete a Note](#delete-a-note)
- [Architecture Overview](#architecture-overview)
- [Future Improvements](#future-improvements)


### Running the Application
To run the application, follow these steps:

1. Install Python 3 and pip on your system.
2. Clone the repository: 
   ```
   git clone https://github.com/SwanVods/flask-pastebin-app.git
   ```
3. Create a virtual environment: 
   ```
   python3 -m venv venv
   ```
4. Activate the virtual environment: 
   ```
   source venv/bin/activate
   ```
5. Install the dependencies: 
   ```
   pip install -r requirements.txt
   ```
6. Initialize the database : 
   ```
   flask db init
   ```
7. Start migration: 
   ```
   flask db migrate
   ```
8. Create the database: 
   ```
   flask db upgrade
   ```
9. Start the server: 
   ```
   flask run
   ``` 
   or you may use docker to run the application:
   ```
   docker-compose up
   ```
10. The server should now be running on `http://localhost:5000`


To test the application, run the following command:
```
python -m unittest test_views.py
```

### Available API Endpoints
The following API endpoints are available:

#### Get All Public Notes
Endpoint: `GET /notes`

**Response:**

```
[
    {
        "id": 1,
        "text": "Some public text",
        "visibility": true,
        "created_at": "2023-02-17T10:30:00",
        "updated_at": "2023-02-17T10:30:00"
    },
    {
        "id": 2,
        "text": "More public text",
        "visibility": true,
        "created_at": "2023-02-17T10:31:00",
        "updated_at": "2023-02-17T10:31:00"
    }
]
```

#### Get a Specific Note
Endpoint: `GET /notes/<note_id>`

**Response:**

```
{
    "id": 1,
    "text": "Some text to paste",
    "visibility": true,
    "created_at": "2023-02-17T10:30:00",
    "updated_at": "2023-02-17T10:30:00"
}
```

#### Create a New Note
Endpoint: `POST /notes`

**Request body:**
```
{
    "text": "Some text to paste",
    "visibility": true
}
```

**Response:**

```
{
    "id": 1,
    "text": "Some text to paste",
    "visibility": true,
    "created_at": "2023-02-17T10:30:00",
    "updated_at": "2023-02-17T10:30:00"
}
```

#### Update a Note
Endpoint: `PUT /notes/<note_id>`

**Request body:**

```
{
    "text": "Updated text",
    "visibility": false
}
```
**Response:**

```
{
    "id": 1,
    "text": "Updated text",
    "visibility": false,
    "created_at": "2023-02-17T10:30:00",
    "updated_at": "2023-02-17T10:31:00"
}
```
#### Delete a Note
Endpoint: `DELETE /notes/<note_id>`

**Response:**

```
{
    "message": "Note deleted successfully"
}
```

### Architecture Overview
The application follows a simple 3-tier architecture, consisting of presentation layer, business logic layer, and data storage layer. Below is a brief explanation of each component, libraries, dependencies, and tools used in the project.

**Presentation Layer:**

- Flask (Python Web Framework)
- Flask-RESTful (for building RESTful APIs)
- Werkzeug (for handling HTTP requests and responses)

**Business Logic Layer:**

- SQLite (as a database management system)
- SQLAlchemy (for object-relational mapping)
- Flask-Migrate (for handling database migrations)

**Data Storage Layer:**

- SQLite (as a database management system)

**Dependencies:**

- Flask
- SQLAlchemy
- Flask-Migrate
- Werkzeug

**Tools:**

- Docker (for containerizing the application)
- Unittest (for testing the application)
- Coverage (for measuring test coverage)

The architecture is designed in such a way that the presentation layer is separated from the business logic layer, and the business logic layer is separated from the data storage layer. The presentation layer (Flask) communicates with the business logic layer through a set of RESTful APIs. The business logic layer (SQLAlchemy) communicates with the data storage layer (SQLite) to persist data.

### Future Improvements
- Add authentication and authorization
- Implement input validation and sanitization to prevent injection attacks or malicious user input.
- Add support for other databases or data stores, such as MongoDB or AWS DynamoDB.
- Implement rate limiting to prevent abuse or overuse of the API.
- Implement testing for edge cases and scenarios that may not be covered in the current test suite.
