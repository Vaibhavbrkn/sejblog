import React from 'react';
import {Link} from 'react-router-dom'
import SignAuth from './auth/SignAuth'
import Header from './Header'

const Signup = ()=>{
    return(
       <>
            <Header/>
           <h2 className = 'text-center pt-4 pb-4'>Signup page</h2>
           <div className = 'row'>
               <div className = 'col-md-6 offset-md-3'>
                    <SignAuth/>
               </div>
           </div>
        </>
    )
}

export default Signup;