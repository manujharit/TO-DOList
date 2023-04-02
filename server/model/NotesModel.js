const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/Todo', {
  useNewUrlParser: true,
  // useCreateIndex: true,
  // useFindAndModify: false,
  useUnifiedTopology: true
}).then(() => {
  console.log('Database Connected')
}).catch((err) => {
  console.log(err)
})

const notesSchema = new mongoose.Schema({
  noteId: {
    type: Number,
    unique: true,
    required: true
  },
  userId: {
    type: String,
    required: true
  },
  heading: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  }
},
{
  timestamps: {
    createdAt: true,
    updatedAt: true
  }
})

const NotesModel = mongoose.model('notes', notesSchema)

module.exports = NotesModel
