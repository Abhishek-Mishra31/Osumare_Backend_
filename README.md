# Task Management API

This project involves building a simple RESTful API using Node.js to manage a collection of tasks (e.g., to-do items). The API supports basic CRUD (Create, Read, Update, Delete) operations on tasks, with data stored in memory (no database required). Authentication is implemented using Passport.js to ensure secure access.

## Endpoints

The following endpoints are available for managing tasks:

1. **GET /tasks**: Retrieve a list of all tasks.
2. **GET /tasks/:id**: Retrieve a specific task by ID.
3. **POST /tasks**: Create a new task.
4. **PUT /tasks/:id**: Update an existing task by ID.
5. **DELETE /tasks/:id**: Delete a task by ID.

## Authentication

Authentication is implemented using Passport.js. Ensure that you are authenticated to access the API endpoints.

## Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/your-username/task-management-api.git
2. Navigate to the project directory:
   ```sh 
   cd task-management-api
3. Install dependencies:
   ```sh 
   npm install
## Usage
1. Start the server:
   ```sh
   npm start
2. The API will be accessible at http://localhost:80
## Example Requests
 * Get all tasks
   ```sh
   curl -X GET http://localhost:80/Tasks
* Get a specific task
   ```sh
   curl -X GET http://localhost:80/tasks/:id
* Create a new task
   ```sh
   curl -X POST http://localhost:80/tasks -d '{"name": "New Task"}' -H "Content-Type: application/json"
* Update a task
   ```sh
  curl -X PUT http://localhost:80/tasks/:id -d '{"name": "Updated Task"}' -H "Content-Type: application/json"
* Delete a task
   ```sh
  curl -X DELETE http://localhost:3000/tasks/:id
## License
  This project is licensed under the MIT License.
## Contributing
Contributions are welcome! Please open an issue or submit a pull request for any changes.
## Contact

For any inquiries, please contact abhishekbelaganj0609@gmail.com.

  
