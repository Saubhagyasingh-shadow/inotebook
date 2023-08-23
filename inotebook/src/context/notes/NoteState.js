import react, { useState } from "react";
import NoteContext from "./NoteContext";
 const NoteState =(props)=>{
  const host="http://localhost:5000";
//     const s1 ={
//         "name":"Harry",
//         "class":"5b"
//     }
//     const[state,setstate] =useState(s1);
//   const  update = () =>{
//         setTimeout(()=>{
//              setstate({
//                 "name":"Larry",
//                  "class":"7b"
//              })
//         },1000)
//     }
const notesInitial=[]

const [notes,setNotes] =useState(notesInitial)

//Add a note
const addNote =async (title,description,tag)=>{

  //TOdo :API call
  const response =await fetch(`${host}/api/notes/addnote`,{
    method: 'POST',
    headers: {
      'Content-Type':'application/json',
      "auth-token":'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNlOWQ0ZmZiM2FjNjEyYWYyNTIxNmZlIn0sImlhdCI6MTY3NjI2ODc5OX0.oOqBvOcRyXVf_aw_3P8hLtIddSEFMQYjIXgJPT5K33g'
    },
    body: JSON.stringify({title,description,tag})
  });
const json= await response.json();
console.log(json)
  console.log("adding a new node")
 const note={
    "_id": "63ea5bc9ac4bfc85f0180b03",
    "user": "63e9d4ffb3ac612af25216fe",
    "title": title,
    "description": description,
    "tag": "youtube",
    "date": "2023-02-13T15:48:25.877Z",
    "__v": 0
  }
setNotes(notes.concat(note))
}
//Delete a note
const deleteNote =async (id)=>{
  const response =await fetch(`${host}/api/notes/deletenote/${id}`,{
    method: 'DELETE',
    headers: {
      'Content-Type':'application/json',
      "auth-token":'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNlOWQ0ZmZiM2FjNjEyYWYyNTIxNmZlIn0sImlhdCI6MTY3NjI2ODc5OX0.oOqBvOcRyXVf_aw_3P8hLtIddSEFMQYjIXgJPT5K33g'
    },
  });
  const json= response.json();
  console.log("deleting a note with id"+id);
  const newNotes = notes.filter((note)=>{return note._id!==id})
  setNotes(newNotes)
}
//edit a note
const editNote =async (id,title,description,tag)=>{
  //API call
  // url=
  const response =await fetch(`${host}/api/notes/updatenote/${id}`,{
    method: 'PUT',
    headers: {
      'Content-Type':'application/json',
      "auth-token":'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNlOWQ0ZmZiM2FjNjEyYWYyNTIxNmZlIn0sImlhdCI6MTY3NjI2ODc5OX0.oOqBvOcRyXVf_aw_3P8hLtIddSEFMQYjIXgJPT5K33g'
    },
    body: JSON.stringify({title,description,tag})
  });
  const json=await response.json();
  let newNotes=JSON.parse(JSON.stringify(notes))
  //logic to edit in client
  for(let index=0;index<newNotes.length;index++){
    const element =newNotes[index];
    if(element._id === id){
      newNotes[index].title=title;
      newNotes[index].description=description;
      newNotes[index].tag=tag
     break;
    }
   
  }
  setNotes(newNotes);
}

const getNotes =async (title,description,tag)=>{

  //TOdo :API call
  const response =await fetch(`${host}/api/notes/fetchallnotes`,{
    method: 'GET',
    headers: {
      'Content-Type':'application/json',
      "auth-token":'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNlOWQ0ZmZiM2FjNjEyYWYyNTIxNmZlIn0sImlhdCI6MTY3NjI2ODc5OX0.oOqBvOcRyXVf_aw_3P8hLtIddSEFMQYjIXgJPT5K33g'
    }  });
    const json = await response.json()
  console.log(json)
  setNotes(json)
}
 

    return(
        <NoteContext.Provider value={{notes,setNotes,addNote,deleteNote,editNote,getNotes}}>
            {props.children}
        </NoteContext.Provider>
    )
 }
 export default NoteState;
