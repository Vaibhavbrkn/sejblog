import React from 'react';
import {useState} from 'react';
import {signin , authenticate ,isAuth} from '../../actions/auth'
import history from '../history'
import {useEffect} from 'react';
import {Link} from 'react-router-dom'
import LoginGoogle from './LoginGoogle'

const SigninAuth=()=>{
    const [values,setValues] = useState({
   
        email:'',
        password:'',
        error:'',
        loading:false,
        message:'',
        showForm:true
    })

    const{email , password , error,loading , message , showForm} = values
    
    useEffect(()=>{
        isAuth() && history.push('/')
    },[])

    const handleChange = name =>(e)=>{
        setValues({...values,error:false,[name]:e.target.value});
       
    }


    const handleSubmit = (e)=>{
        e.preventDefault()
       // console.table({name , email , password , error,loading , message , showForm})
       setValues({...values , error:false , loading:true})
       const user = {email , password}

       signin(user)
       .then(response=>{
           if(response.error){
               setValues({...values , error:response.error , loading:false})
           }
           else{
               // save user token to cookie
               // save user info to localstorage
               // authnticate user
               authenticate(response , ()=>{
                if(isAuth() && isAuth().role ===1){
                    history.push('/admin')
                }else{
                    history.push('/user')
                }
               })   
    }
})
    }

    const showLoading = ()=>( loading?<div className ='alert alert-info' >Loading... </div> :  '' )

    const showError= ()=>(error? <div className ='alert alert-danger' > {error} </div> : '' )
       
    const showMessage = ()=>( message? <div className ='alert alert-info' > {message} </div> : '' )

    const signinForm =()=>{

    return(
      <form onSubmit = {handleSubmit}>

          <div className = 'form-group'>
              <input value = {email} onChange = {handleChange('email')} type = 'email' className = 'form-control' placeholder = 'Type your Email'/>
          </div>

          <div className = 'form-group'>
              <input value = {password} onChange = {handleChange('password')} type = 'password' className = 'form-control' placeholder = 'Type your Password'/>
          </div>

        <button type="submit">
            Submit
            </button>
      </form>
    )
    }
    return(
        <React.Fragment>
        {showError()}
        {showLoading()}
        {showMessage()}
        <LoginGoogle/>
        {showForm && signinForm()}
        <br/>
        <Link to = '/auth/password/forgot'>
            <button className = 'btn btn-outline-danger btn-sm'>
                Forgot passowrd
            </button>
        </Link>
        </React.Fragment>
    )
}

export default SigninAuth;