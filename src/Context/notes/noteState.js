import NoteContext from "./noteContext";
import React, { useState } from "react";

const NoteState = (props) => {
  let initialNote = [];
  const [note, setNote] = useState(initialNote);
  const host = "http://localhost:5000";
  // fetch all notes
  const getAllNotes = async () => {
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
        "auth-token":localStorage.getItem('token'),
      },
    });
   const json=await response.json();
    setNote(json);
  };

  // Add a note
  const addNote = async (title, description, tag) => {
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "auth-token": localStorage.getItem('token')
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const json=await response.json();
    setNote(note.concat(json));
  };
  //Delete note
  const deleteNote = async(id) => {
 // API call
 const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
  method: "DELETE",
  headers: {
    "content-type": "application/json",
    "auth-token": localStorage.getItem('token')
  },
});
const json = await response.json();
console.log(json);
    const newNote = note.filter((element) => {
      return element._id !== id;
    });
    setNote(newNote);
  };
  // edit note
  const editNote = async (id, title, description, tag) => {
    // API call
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
        "auth-token": localStorage.getItem('token')
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const json = await response.json();
    console.log(json)
    // logic to edit note
   
    let newNote=JSON.parse(JSON.stringify(note))
    for (let index = 0; index < newNote.length; index++) {
      if (newNote[index]._id === id) {
        newNote[index].title = title;
        newNote[index].description = description;
        newNote[index].tag = tag;
        break;
      }
    }
    setNote(newNote)
  };

  return (
    <NoteContext.Provider
      value={{ note, setNote, addNote, deleteNote, editNote, getAllNotes }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
