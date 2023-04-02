const express = require('express')
const TodoController = require('../controller/TodoController')

const router = express.Router()

router.get(
  '/notes/:userId',
  TodoController.getNotes
)

router.post(
  '/note/',
  TodoController.postNotes
)

router.get(
    '/note/:noteId',
    TodoController.getNoteById
)

router.put(
    '/note/:noteId',
    TodoController.updateNote
)

router.delete(
    '/note',
    TodoController.deleteNote
)

module.exports = router
