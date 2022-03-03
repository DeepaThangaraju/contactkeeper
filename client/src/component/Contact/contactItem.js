import React from 'react'
import { useDispatch,useSelector } from 'react-redux';
import { deleteContact } from '../../action/contactAction';
import { Link} from 'react-router-dom';





export default function ContactItem({contact}) {
    const {name,email,phone,type}=contact
    const dispatch=useDispatch();

    const getContact=useSelector((state)=>state.contactList);
  const {contacts}=getContact;

console.log(contacts)
 
    const deleteHandler = (id) => {
        console.log(id);
        if (window.confirm("Are you sure")) {
          dispatch(deleteContact(id));
        }
      };

  return (
      <div className='container'>
    <div className='card bg-light'>
    <h3 className='text-primary text-left'>
        {name}{' '}<span className={type==='professional' ? 'badge-success' : 'badge-primary'} style={{float:"right",display:"inline",alignContent:"left"}}>{type.charAt(0).toUpperCase() + type.slice(1)}</span>
    </h3>
    <ul className='list'>
        {email && (
            <li>
                <i className='fas fa-envelope-open'></i> {email}
            </li>
        )}
        {phone && (
            <li>
                <i className='fas fa-phone'></i> {phone}
            </li>
        )}
    </ul>
    <Link to={`/edit/${contact._id}`}><button className='btn btn-dark btn-sm'>Edit</button></Link>
    <button className='btn btn-danger btn-sm' onClick={() => {deleteHandler(contact._id)}}>Delete</button>
    </div>
    </div>
  )
}
