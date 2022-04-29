const express = require('express');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');

const app = express();

app.use(cors());
app.use(express.json());

const users = [];

function checksExistsUserAccount(request, response, next) {


  const user = users.find(user => user.username);

  if (!user) {
    return response.status(400).json({ error: 'User not found' });
  }

  return next();
}

app.post('/users', (request, response) => {
  // Complete aqui
  try {
    const { name, username } = request.body;

    if (!name) {
      throw new error('Name is required');
    }
    if (!username) {
      throw new error('Username is required');
    }
    id = uuidv4(); // precisa ser um uuid
    todos = []

    users.push({
      id,
      name,
      username,
      todos
    })
    return response.json(users);
  } catch (err) {
    return response.status(500).json({ error: 'Invalid data' });
  }
});

app.get('/todos', checksExistsUserAccount, (request, response) => {
  // Complete aqui
  try {

    const user = users.find(user => user.username);

    return response.json(user.todos);
  } catch (err) {
    return response.status(500).json({ error: 'Invalid data' });
  }

});

app.post('/todos', checksExistsUserAccount, (request, response) => {

  try {
    const { title, deadline } = request.body;

    const user = users.find(user => user.username);
    if (!user) {
      throw new error('User not found');
    }
    id = uuidv4();
    done = false;


    user.todos.push({
      id: id,
      title: title,
      done: done,
      deadline: new Date(deadline),
      created_at: new Date(),
    });

    return response.json(user.todos);
  } catch (err) {
    return response.status(500).json({ error: 'Invalid data' });
  }
});

app.put('/todos/:id', checksExistsUserAccount, (request, response) => {
  // Complete aqui
  try {
    const { id } = request.params;
    const { title, deadline } = request.body;

    const user = users.find(user => user.username);
    const todo = user.todos.find(todo => todo.id === id);

    if (!user) {
      throw new error('Todo not found');
    }

    todo.title = title;

    todo.deadline = new Date(deadline);

    return response.json(user.todos);
  } catch (err) {
    return response.status(500).json({ error: 'Invalid data' });
  }
});

app.patch('/todos/:id/done', checksExistsUserAccount, (request, response) => {
  // Complete aqui
  try {
    const { id } = request.params;

    const user = users.find(user => user.username);
    const todo = user.todos.find(todo => todo.id === id);

    if (!user) {
      throw new error('Todo not found');
    }

    todo.done = true;

    return response.json(todo);
  } catch (err) {
    return response.status(500).json({ error: 'Invalid data' });
  }
});

app.delete('/todos/:id', checksExistsUserAccount, (request, response) => {
  try {
    const { id } = request.params;

    const user = users.find(user => user.username);
    const todo = user.todos.find(todo => todo.id === id);
    console.log(todo);
    if (!user) {
      throw new error('Todo not found');
    }
    user.todos.shift(todo.id);
    return response.json(todo);
  } catch (err) {
    return response.status(500).json({ error: 'Invalid data' });
  }
});

module.exports = app;