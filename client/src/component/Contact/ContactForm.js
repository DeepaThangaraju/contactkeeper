import React,{useState,useEffect} from 'react'
import { useSelector,useDispatch } from 'react-redux';
import { createContact } from '../../action/contactAction';
import { Error } from '../error';
import { contactList } from '../../action/contactAction';

export default function ContactForm({history}) {

    const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [type, setType] = useState("personal");
  const dispatch = useDispatch();

  const create = useSelector((state) => state.contactCreate);
  const {  success,contact } = create;

  const getContact=useSelector((state)=>state.contactList);
  const {success:contactSuccess}=getContact;

  console.log(contact)

  
  useEffect(() => {
    if (success) {
      <Error variant="success" error="Added Successfully"/>
    }
  }, [ success,contactSuccess]);
  

  const submitHandler=(e)=>{
      e.preventDefault()
     
      dispatch(createContact({name,email,phone,type}))
     
      setName("")
      setEmail("")
      setPhone("")
      setType("personal")
      if(name){
        dispatch(contactList())
      }
      
     
     
  }
  return (
    <>
    
    <div className='form-container'>
   
        <h1>
            Add <span className='text-primary'>Contact</span>
        </h1>
        <form onSubmit={submitHandler}>
            <div className='form-group' >
                <input type="text" name="name" value={name} placeholder="Name" onChange={(e)=>setName(e.target.value)} style={{width:"100%",height:"2.5rem"}} required/>
            </div>
            <div className='form-group'>
                <input type="text" name="email" value={email} placeholder="Email" onChange={(e)=>setEmail(e.target.value)} style={{width:"100%",height:"2.5rem"}} required/>
            </div>
            <div className='form-group'>
                <input type="text" name="phone" value={phone} placeholder="Phone no" onChange={(e)=>setPhone(e.target.value)} style={{width:"100%",height:"2.5rem"}} required/>
            </div>
            <div className='form-group'>
                <h4>Contact Type</h4>
                <input type="radio" name="type" value="personal" default onChange={(e)=>setType(e.target.value)}/>Personal{' '}
                <input type="radio" name="type" value="professional" onChange={(e)=>setType(e.target.value)}/>professional{' '}
            </div>

            <input type="submit" value="Add Contact" className='btn btn-primary btn-block'/>
        </form>

    </div>
    </>
  )
}
