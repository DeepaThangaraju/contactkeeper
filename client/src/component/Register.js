import React,{useState,useEffect} from 'react'
import {useDispatch,useSelector} from 'react-redux'

import { RegisterAction } from '../action/userAction';


export default function Register({history,location}) {
    const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confrimpassword, setConfrimpassword] = useState("");
  const [message,setMessage]=useState("")
  const dispatch = useDispatch();

  const register = useSelector((state) => state.userRegister);
  const { userInfo } = register;


  const redirect = location.search ? location.search.split("=")[1] : "/contact";

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [history, redirect, userInfo]);
  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confrimpassword) {
      setMessage("Password do not match");
      console.log(message)
    } else {
      dispatch(RegisterAction(name, email, password));
    }
  };
  return (
    <>
    
    <div className='form-container'>
   
        <h1>
            Account <span className='text-primary'>Register</span>
        </h1>
        <form onSubmit={submitHandler}>
            <div className='form-group' >
                <label htmlFor='name'>Name</label><br/>
                <input type="text" name="name" value={name} onChange={(e)=>setName(e.target.value)} style={{width:"100%",height:"2.5rem"}} required/>
            </div>
            <div className='form-group'>
                <label htmlFor='email'>Email</label><br/>
                <input type="text" name="email" value={email} onChange={(e)=>setEmail(e.target.value)} style={{width:"100%",height:"2.5rem"} }  required/>
            </div>
            <div className='form-group'>
                <label htmlFor='password'>Password</label><br/>
                <input type="password" name="password" value={password} onChange={(e)=>setPassword(e.target.value)} style={{width:"100%",height:"2.5rem"}}  required/>
            </div>
            <div className='form-group'>
                <label htmlFor='confrimpassword'>Confrim password</label><br/>
                <input type="password" name="confrimpassword" value={confrimpassword} onChange={(e)=>setConfrimpassword(e.target.value)} style={{width:"100%",height:"2.5rem"}} required/>
            </div>

            <input type="submit" value="Register" className='btn btn-primary btn-block'/>
        </form>

    </div>
    </>
  )
}
