const NotesModel = require('../model/NotesModel')

exports.getNotes = async (req, res) => {
  try {
    const userId = req.params.userId
    const notes = await NotesModel.find({ userId: userId }, { _id: 0, _v: 0 })
    if (notes.length > 0) {
      res.status(200).json({
        status: 200,
        message: 'Data Found',
        Notes: notes
      })
    }
    res.status(404).json({
      status: 404,
      message: 'Data Not Found'
    })
  } catch (err) {
    res.status(500).json({
      status: 500,
      message: 'Internal Server Error',
      Error: err
    })
  }
}

exports.postNotes = async (req, res) => {
  try {
    const notes = req.body
    console.log(notes)
    await NotesModel.create(notes)
    res.status(201).json({
      status: 201,
      message: 'Created OK'
    })
  } catch (err) {
    res.status(500).json({
      status: 500,
      message: 'Internal Server Error',
      Error: err
    })
  }
}

exports.getNoteById = async (req, res) =>{
  try{
    const noteId = req.params.noteId
    const note = await NotesModel.find({noteId: noteId},{ _id: 0, _v: 0 })
    res.status(200).json({
      status: 200,
      data: note
    })
  } catch(err){
    res.status(500).json({
      status: 500,
      message: 'Internal Server Error',
      Error: err
    })
  }
}

exports.updateNote = async (req,res)=>{
  try{
    const note = req.body
    const noteId = req.param.noteId
    await NotesModel.findOneAndUpdate(
      {noteId: noteId},
      note,
      {
        new: true,
        runValidators: true,
      })
      res.status(200).json({
        status: 200,
        Message: "Updated"
      })
  } catch (err){
    res.status(500).json({
      status: 500,
      message: 'Internal Server Error',
      Error: err
    })
  }
}
exports.deleteNote = async(req,res)=>{
  try{
    const noteId = req.body.noteId
    console.log(noteId)
    const delNote= await NotesModel.deleteOne({noteId: noteId})
    console.log(delNote)
    res.status(200).json({
      status: 200,
      message: "Note Deleted"
    })
  } catch (err){
    res.status(500).json({
      status: 500,
      message: 'Internal Server Error',
      Error: err
    })
  }
}