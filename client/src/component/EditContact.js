import React,{useState,useEffect} from 'react'
import { useSelector,useDispatch } from 'react-redux';

import {  getContactById, updateContact} from '../action/contactAction';
import { Link } from 'react-router-dom';

export default function EditContact({match,history}) {

    const contactId = match.params.id;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [type, setType] = useState("personal");
  const dispatch = useDispatch();

  const detail=useSelector((state)=>state.contactDetail)
  const {contact}=detail

  const Update = useSelector((state) => state.contactUpdate);
  const { success:successUpdate } = Update;

  useEffect(() => {
    if(successUpdate){
        dispatch({type:"CONTACT_UPDATE_RESET"})
        history.push('/contact')
    }else{
  
    dispatch(getContactById(contactId));
  }

}, [contact,dispatch,contactId,successUpdate,history]);

const submitHandler = (e) => {
    e.preventDefault();
    console.log(name)
    dispatch(updateContact({_id:contactId,name,email,phone,type}))
  };
  return (
    <>
    <Link to="/contact">Go Back</Link>
    
    <div className='form-container'>
   
        <h1>
            Edit <span className='text-primary'>Contact</span>
        </h1>
        <form onSubmit={submitHandler}>
            <div className='form-group' >
                <input type="text" id="name" name="name" defaultValue={contact.name} placeholder="Name" onChange={(e)=>setName(e.target.value)} style={{width:"100%",height:"2.5rem"}}/>
            </div>
            <div className='form-group'>
                <input type="text" name="email" defaultValue={contact.email} placeholder="Email" onChange={(e)=>setEmail(e.target.value)} style={{width:"100%",height:"2.5rem"}}/>
            </div>
            <div className='form-group'>
                <input type="text" name="phone" defaultValue={contact.phone} placeholder="Phone no" onChange={(e)=>setPhone(e.target.value)} style={{width:"100%",height:"2.5rem"}}/>
            </div>
            <div className='form-group'>
                <h4>Contact Type</h4>
                <input type="radio" name="type" value="personal" default onChange={(e)=>setType(e.target.value)}/>Personal{' '}
                <input type="radio" name="type" value="professional" onChange={(e)=>setType(e.target.value)}/>professional{' '}
            </div>

            <input type="submit" value="Edit Contact" className='btn btn-primary btn-block'/>
        </form>

    </div>
    </>
  )
}
