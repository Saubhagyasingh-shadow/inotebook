import React, { useContext, useEffect,useRef,useState} from "react";
import NoteContext from "../context/notes/NoteContext";
import NoteItem from "./NoteItem";
import AddNote from "./AddNote";

const Notes = () => {
  const context = useContext(NoteContext);
  const { notes, getNotes,editNote } = context;
  useEffect(() => {
    getNotes();
  }, []);
  const ref=useRef(null)
  const refClose=useRef( null)

  const [note, setNote] = useState({id:"",
  etitle: "",
  edescription: "",
  etag: "default",
});
const handleClick = (e) => {
  console.log("updating the note",note);
  editNote(note.id,note.etitle,note.edescription,note.etag)
  refClose.current.click();
  e.preventDefault();

};
const onChange = (e) => {
  setNote({ ...note, [e.target.name]: e.target.value });
};
  const updateNote = (currentNote) => { 
    ref.current.click();
  setNote({id:currentNote._id,etitle :currentNote.title ,edescription:currentNote.description,etag:currentNote.tag})
};
  
  return (
    <>
    <AddNote />
    <button ref={ref}  type="button" className="btn btn-primary"  
    data-bs-toggle="modal" data-bs-target="#exampleModal">
  Launch demo modal
</button>
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
       
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
Edit note              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
            <form>
          <div className="mb-3">
            <label htmlFor="etitle" className="form-label">
              Title
            </label>
            <input
              type="text"
              className="form-control"
              id="etitle"
              name="etitle"
              value={note.etitle}
              aria-describedby="emailHelp"
              onChange={onChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Description
            </label>
            <input
              type="text"
              className="form-control"
              id="edescription"
              value={note.edescription}
              name="edescription"
              onChange={onChange}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="tag" className="form-label">
              Tag 
            </label>
            <input
              type="text"
              className="form-control"
              id="etag"
              value={note.etag}
              name="etag"
              onChange={onChange}
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary"
            onClick={handleClick}
          >
            Submit
          </button>
        </form>
            </div>
            <div className="modal-footer">
              <button ref={refClose}
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button onClick={handleClick} type="button" className="btn btn-primary">
                Update Note
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="row my-3">
        <h1>your notes</h1>
        {notes.map((note) => {
          return (
            <NoteItem key={note._id} updateNote={updateNote} note={note} />
          );
        })}
      </div>
    </>
  );
};

export default Notes;
