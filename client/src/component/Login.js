import React,{useState,useEffect} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import { Error } from './error';
import { userLogin } from '../action/userAction';
import { Loading } from './Loading';
import {Link} from "react-router-dom";

export default function Login({history,location}) {
    
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch=useDispatch()

  const login=useSelector((state)=>state.userLoginReducer);
  const {loading,error,userInfo}=login;
  
  const redirect=location.search ? location.search.split("=")[1] :'/contact';

  useEffect(()=>{
   
    if(userInfo){
    history.push(redirect)
    }
  },[history,redirect,userInfo])

  const submitHandler = (e) => {
    e.preventDefault();
    
     dispatch(userLogin(email,password))
    
  };

  return (
    <>
    
    <div className='form-container'>
    {error && <Error variant="danger" error={error}></Error>}
      {loading && <Loading/>}
      
        <h1>
          <span className='text-primary'>Login</span>
        </h1>
        <form onSubmit={submitHandler}>
            
            <div className='form-group'>
                <label htmlFor='email'>Email</label><br/>
                <input type="text" name="email" value={email} onChange={(e)=>setEmail(e.target.value)} style={{width:"100%",height:"2.5rem"}} required/>
            </div>
            <div className='form-group'>
                <label htmlFor='password'>Password</label><br/>
                <input type="password" name="password" value={password} onChange={(e)=>setPassword(e.target.value)} style={{width:"100%",height:"2.5rem"}} required/>
            </div>
      

            <input type="submit" value="Login" className='btn btn-primary btn-block'/>
        </form>
        <h4>
          New user??<Link to={redirect ? `/register?redirect=${redirect}` : '/register'}> Register here</Link>
        </h4>

    </div>
    </>
  )
}
