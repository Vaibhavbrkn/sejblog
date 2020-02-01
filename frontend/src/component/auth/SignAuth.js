import React from 'react';
import {useState} from 'react';
import {signup,isAuth , preSignup} from '../../actions/auth'
import history from '../history'
import {useEffect} from 'react';
import {Link} from 'react-router-dom'

const SignAuth=()=>{
    const [values,setValues] = useState({
        name:'',
        email:'',
        password:'',
        error:'',
        loading:false,
        message:'',
        showForm:true
    })

    const{name , email , password , error,loading , message , showForm} = values

    const handleChange = name =>(e)=>{
        setValues({...values,error:false,[name]:e.target.value});
       
    }

    useEffect(()=>{
        isAuth() && history.push('/')
    },[])

    const handleSubmit = (e)=>{
        e.preventDefault()
       // console.table({name , email , password , error,loading , message , showForm})
       setValues({...values , error:false , loading:true})
       const user = {name  , email , password}
        console.log(user)
       preSignup(user)
       .then(response=>{
           if(response.error){
               setValues({...values , error:response.error , loading:false})
           }
           else{
               setValues({
                   ...values , 
                   name: '' , 
                   passowrd: '' ,
                    email: '' , 
                    error: '' , 
                    loading:false,
                    message:response.message,
                    showForm: false
                })
           }
       })
    }

    const showLoading = ()=>( loading?<div className ='alert alert-info' >Loading... </div> :  '' )

    const showError= ()=>(error? <div className ='alert alert-danger' > {error} </div> : '' )
       
    const showMessage = ()=>( message? <div className ='alert alert-info' > {message} </div> : '' )

    const signupForm =()=>{

    return(
      <form onSubmit = {handleSubmit}>
          <div className = 'form-group'>
              <input value = {name} onChange = {handleChange('name')} type = 'text' className = 'form-control' placeholder = 'Type your Name'/>
          </div>

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
        {showForm && signupForm()}
        </React.Fragment>
    )
}

export default SignAuth;