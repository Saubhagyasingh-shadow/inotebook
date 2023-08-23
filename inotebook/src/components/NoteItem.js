import React from 'react'
import NoteContext from '../context/notes/NoteContext';
import { useContext } from 'react';
const NoteItem = (props) => {
    const context=useContext(NoteContext);
     const { deleteNote }=context;
    const {note,updateNote} =props;
  return (
    <div className="col-md-3">
      
      
      <div className="card" >
  <div className="card-body">
    <div className="d-flex align-items-center">
    <h5 className="card-title">{note.title}</h5>
    <p className="card-text">{note.description}</p>
    <i className="fa-solid fa-trash mx-2" onClick={()=>{deleteNote(note._id)}}></i>
    <i className="fa-regular fa-pen-to-square mx-2" onClick={()=>{updateNote(note)}}></i>
</div>
      </div>
</div>
    </div>
  )
}

export default NoteItem
