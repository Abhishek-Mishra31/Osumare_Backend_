const express = require("express");
const app = express();
const hostname = "127.0.0.1";
const port = 80;
const bodyParser = require("body-parser");
const { passport, Users } = require("./Auth");
let idCount = 0;
let Tasks = [];

app.use(bodyParser.json());
app.use(passport.initialize());

const localAuth = passport.authenticate("local", { session: false });
app.get("/", (req, res) => {
  res.status(200).json("hello server");
});

// this api for register a new user for authentication
app.post("/registerUser", (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      res.status(404).json("Kindly Provide username and password");
    }
    const newUser = { username, password };
    Users.push(newUser);
    res.status(200).json({ success: true, newUser });
  } catch (error) {
    res.status(500).json("Internal Server Down");
  }
});

// get all the tasks ( protected API )
app.get("/Tasks", localAuth, (req, res) => {
  try {
    if (Tasks.length === 0) {
      res.status(404).json({ error: "There is no task available" });
    } else {
      res.status(200).json({ response: Tasks });
    }
  } catch (error) {
    res.status(404).json("Internal Server Down");
  }
});

// create a new task ( protected API )
app.post("/tasks", localAuth, (req, res) => {
  try {
    const id = idCount++;
    const { TaskName, description } = req.body;
    if (!TaskName || !description) {
      res.status(401).json("Kindly Provide Taskname and description");
    }
    const newTask = { id, TaskName, description };
    Tasks.push(newTask);
    return res.status(200).json({ success: true, newTask });
  } catch (error) {
    res.status(404).json("Internal Server Down");
  }
});

// Get Specific Task by its id ( protected API )
app.get("/tasks/:id", localAuth, (req, res) => {
  try {
    const taskId = req.params.id;
    const filteredTask = Tasks.find((task) => task.id == taskId);
    if (!filteredTask) {
      res.status(404).json("Task Not Found");
    } else {
      res.status(200).json({ success: true, filteredTask });
    }
  } catch (error) {
    res.status(500).json("Internal server down");
  }
});

// Update Specific Task through its id ( protected API )
app.put("/tasks/:id", localAuth, (req, res) => {
  try {
    const taskId = req.params.id;
    const { updateTaskName, updateTaskDesc } = req.body;
    if (!updateTaskName || !updateTaskDesc) {
      res.status(401).json("Kindly give values to be updated");
    } else {
      const taskIndex = Tasks.findIndex((task) => task.id == taskId);
      if (taskIndex === -1) {
        res.status(401).json("Task Not Found");
      }
      if (updateTaskName) Tasks[taskIndex].TaskName = updateTaskName;
      if (updateTaskDesc) Tasks[taskIndex].description = updateTaskDesc;
      res.status(200).json({ success: true, updatedTask: Tasks[taskIndex] });
    }
  } catch (error) {
    res.status(500).json("Internal Server down");
  }
});

// Delete a Task through its id ( protected API )
app.delete("/tasks/:id", localAuth, (req, res) => {
  try {
    const taskId = req.params.id;
    const taskIndex = Tasks.findIndex((task) => task.id == taskId);
    if (!taskIndex) {
      res.status(401).json("Task Not Found");
    } else {
      const deletedTask = Tasks.splice(taskIndex, 1);
      res.status(200).json({ success: true, deletedTask: deletedTask });
    }
  } catch (error) {
    res.status(500).json("Internal server down");
  }
});

app.listen(port, hostname, () => {
  console.log(`successfully listen on http://${hostname}:${port}`);
});
