import express from 'express'
import * as dotenv from 'dotenv'
import { addUser, listUsers, relationshipDistance, removeUser, retrieveUser, updateUser } from './user_controller.js'

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.get('/users', (req, res) => {
  const { filter } = req.query
  res.send(listUsers(filter))
});

app.get('/users/:id', (req, res) => {
  const { id } = req.params
  res.send(retrieveUser(id))
});

app.post('/users', (req, res) => {
  const { first_name, last_name, email, gender } = req.body
  res.send(addUser(first_name, last_name, email, gender))
});

app.post('/users/:id', (req, res) => {
  const { id } = req.params
  const { first_name, last_name, email, gender } = req.body
  res.send(updateUser(id, first_name, last_name, email, gender))
});

app.delete('/users/:id', (req, res) => {
  const { id } = req.params
  res.send(removeUser(id))
})

app.get('/users/relationships/:id1-:id2', (req, res) => {
  const { id1, id2 } = req.params
  res.json(relationshipDistance(id1, id2))
})

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});