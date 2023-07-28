import React, {useContext, useState} from 'react';
import noteContext from '../Context/notes/noteContext'

const AddNote = (props) => {
    const context=useContext(noteContext);
    const {addNote}=context;
    const [note,setNote]=useState({title:"",description:"",tag:""})
    const handleClick=(e)=>{
        e.preventDefault();
        addNote(note.title,note.description,note.tag);
        props.showAlert("Note Added","success")
        setNote({title:"",description:"",tag:""})
    }
    const handleChange=(e)=>{
        setNote({...note,[e.target.name]:e.target.value})
        
    }
  return (


      <div className='container my-3'>
      <h2>Add Note</h2>
      <form className='my-3' onSubmit={handleClick}>
  <div className="mb-3">
    <label htmlFor="title" className="form-label">Title</label>
    <input type="text" className="form-control" id="title" name="title" value={note.title} aria-describedby="emailHelp" onChange={handleChange} minLength={3} required/>
  </div>
  <div className="mb-3">
    <label htmlFor="description" className="form-label">Description</label>
    <input type="text" className="form-control" id="description" name="description" value={note.description} onChange={handleChange} minLength={5} required/>
  </div>
  <div className="mb-3">
    <label htmlFor="tag" className="form-label">Tag</label>
    <input type="tag" className="form-control" id="tag" name="tag" value={note.tag} onChange={handleChange} required/>
  </div>
  <button type="submit" className="btn btn-primary" >Submit</button>
</form>

    </div>
   
  )
}

export default AddNote
