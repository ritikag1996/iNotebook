import React, {useContext, useEffect,useRef,useState} from 'react'
import noteContext from '../Context/notes/noteContext'
import Noteitem from './Noteitem';
import AddNote from './AddNote';
import {  useNavigate } from 'react-router-dom';
export default function Notes(props) {
  const navigate=useNavigate();
    const context=useContext(noteContext);
    const {note, getAllNotes,editNote}=context;
    useEffect(()=>{
      if(localStorage.getItem('token')){
        getAllNotes();
      }
      else{
        navigate("/login")
      }
      // eslint-disable-next-line
    },[]);
    const ref=useRef();
    const refClose=useRef();
    const [note1,setNote1]=useState({id:"", etitle:"",edescription:"",etag:""});
  
    const handleChange=(e)=>{
        setNote1({...note1,[e.target.name]:e.target.value})
        
        
    };
    const handleClick=(e)=>{
      e.preventDefault();
      editNote(note1.id,note1.etitle,note1.edescription,note1.etag)
      refClose.current.click();
      props.showAlert("Note Updated successfully","success")
  }
    const updateNote=(currentNote)=>{
       ref.current.click();
       setNote1({id:currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag})
    };
  
  return (
    <>
    <AddNote showAlert={props.showAlert}/>
 
<button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
  Launch demo modal
</button>
<div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Note</h1>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
      <form className='my-3'>
  <div className="mb-3">
    <label htmlFor="title" className="form-label">Title</label>
    <input type="text" className="form-control" id="etitle" name="etitle" value={note1.etitle} aria-describedby="emailHelp" onChange={handleChange}/>
  </div>
  <div className="mb-3">
    <label htmlFor="description" className="form-label">Description</label>
    <input type="text" className="form-control" id="edescription" name="edescription" value={note1.edescription} onChange={handleChange}/>
  </div>
  <div className="mb-3">
    <label htmlFor="tag" className="form-label">Tag</label>
    <input type="tag" className="form-control" id="etag" name="etag" value={note1.etag} onChange={handleChange}/>
  </div>
</form>
      </div>
      <div className="modal-footer">
        <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button  onClick={handleClick} type="button" className="btn btn-primary">Update changes</button>
      </div>
    </div>
  </div>
</div>
    <div className='row my-3'>
    <h2>Your Note</h2>
       <div className="contaioner mx-2">
      {note.length===0 && 'No Notes to display'}
      </div>
      {note.map((note)=>{
       return <Noteitem updateNote={updateNote} key={note._id} note={note} showAlert={props.showAlert}/>
      })}
    
    </div>
    </>
  )
}
