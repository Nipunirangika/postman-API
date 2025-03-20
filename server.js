const express = require('express');
const app = express();
const port = 2001;

// Middleware to parse JSON data
app.use(express.json());

// In-memory array to store tasks
let tasks = [];

// Route to get all tasks in JSON format
app.get('/tasks', (req, res) => {
    res.json(tasks);
});

// Route to add a new task
app.post('/tasks', (req, res) => {
    const { task } = req.body;
    if (!task) {
        return res.status(400).json({ error: 'Task is required' });
    }
    tasks.push(task);
    res.status(201).json({ message: 'Task added successfully', task });
});

// Route to delete a task
app.delete('/tasks/:id', (req, res) => {
    const { id } = req.params;
    if (id < 0 || id >= tasks.length) {
        return res.status(404).json({ error: 'Task not found' });
    }
    const deletedTask = tasks.splice(id, 1);
    res.json({ message: 'Task deleted successfully', deletedTask });
});

// Route to display HTML with the title and task list
app.get('/', (req, res) => {
    let taskListHtml = tasks.map((task, index) => {
        return `<li>Task ${index + 1}: ${task}</li>`;
    }).join('');

    const htmlContent = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>To Do List</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                margin: 40px;
            }
            h1 {
                color: #333;
                text-align: center;
                
            }
            ul {
                list-style-type: none;
                padding: 0;
            }
            li {
                background-color:rgb(155, 215, 233);
                padding: 10px;
                margin: 5px 0;
                border-radius: 4px;
            }
        </style>
    </head>
    <body>
        <h1>To Do List</h1>
        <ul>
            ${taskListHtml}
        </ul>
    </body>
    </html>
    `;

    res.send(htmlContent);
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
