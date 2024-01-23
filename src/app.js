import express from 'express'
import * as dotenv from 'dotenv'
import { addUser, listUsers, relationshipDistance, removeUser, retrieveUser, updateUser } from './user_controller.js'

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

const router = express.Router()

router.get((req, res) => {
  const { filter } = req.query
  res.send(listUsers(filter))
})

router.post((req, res) => {
  const { first_name, last_name, email, gender } = req.body
  res.send(addUser(first_name, last_name, email, gender))
})

router.get('/:id', (req, res) => {
  const { id } = req.params
  res.send(retrieveUser(id))
});

router.put('/:id', (req, res) => {
  const { id } = req.params
  const { first_name, last_name, email, gender } = req.body
  res.send(updateUser(id, first_name, last_name, email, gender))
});

router.delete('/:id', (req, res) => {
  const { id } = req.params
  res.send(removeUser(id))
})

router.get('/relationships/:id1-:id2', (req, res) => {
  const { id1, id2 } = req.params
  res.json(relationshipDistance(id1, id2))
})

app.use('/users', router)

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});