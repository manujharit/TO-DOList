const NotesModel = require('../model/NotesModel');

exports.getNotes = async (req, res) => {
  try {
    const userId = req.params.userId;
    const notes = await NotesModel.find({userId: userId}, {_id: 0, _v: 0});
    if (notes.length > 0) {
      res.status(200).json({
        status: 200,
        message: 'Data Found',
        Notes: notes,
      });
    }
    res.status(404).json({
      status: 404,
      message: 'Data Not Found',
    });
  } catch (err) {
    res.status(500).json({
      status: 500,
      message: 'Internal Server Error',
      Error: err,
    });
  }
};

exports.postNotes = async (req, res) => {
  try {
    const notes = req.body;
    await NotesModel.create(notes);
    res.status(201).json({
      status: 201,
      message: 'Created OK',
    });
  } catch (err) {
    res.status(500).json({
      status: 500,
      message: 'Internal Server Error',
      Error: err,
    });
  }
};

exports.getNoteById = async (req, res) => {
  try {
    const noteId = req.params.noteId;
    const note = await NotesModel.find({noteId: noteId}, {_id: 0, _v: 0});
    if (note.length > 0) {
      res.status(200).json({
        status: 200,
        data: note,
      });
    } else {
      res.status(404).json({
        status: 404,
        Message: 'Data Not Found',
      });
    }
  } catch (err) {
    res.status(500).json({
      status: 500,
      message: 'Internal Server Error',
      Error: err,
    });
  }
};

exports.updateNote = async (req, res) => {
  try {
    const note = req.body;
    const noteId = req.param.noteId;
    const notes = await NotesModel.find({noteId: noteId}, {_id: 0, _v: 0});
    if (notes.length > 0) {
      await NotesModel.findOneAndUpdate(
          {noteId: noteId},
          note,
          {
            new: true,
            runValidators: true,
          });
      res.status(200).json({
        status: 200,
        Message: 'Updated',
      });
    } else {
      res.status(404).json({
        status: 404,
        Message: 'Data Not Found',
      });
    }
  } catch (err) {
    res.status(500).json({
      status: 500,
      message: 'Internal Server Error',
      Error: err,
    });
  }
};

exports.deleteNote = async (req, res) => {
  try {
    const noteId = req.body.noteId;
    console.log(noteId);
    const delNote = await NotesModel.deleteOne({noteId: noteId});
    if (delNote.deletedCount >0) {
      res.status(200).json({
        status: 200,
        message: 'Note Deleted',
      });
    } else {
      res.status(404).json({
        status: 404,
        message: 'Note Not Found',
      });
    }
  } catch (err) {
    res.status(500).json({
      status: 500,
      message: 'Internal Server Error',
      Error: err,
    });
  }
};
