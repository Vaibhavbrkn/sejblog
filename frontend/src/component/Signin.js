import React from 'react';
import {Link } from 'react-router-dom'
import Signinauth from './auth/Signinauth'
import Header from './Header'

const Signin = () =>  {
    
    return (
        <>
        <Header/>
       
            <div className = 'container-fluid'>
                <h2 className="text-center pt-4 pb-4">Signin</h2>
                <div className = 'row'>
                    <div className = 'col-md-6 offset-md-3'>                            
                        
                        <Signinauth/>
                            
                    </div>
                </div>
            </div>
        
       
        </>
    );
};



export default Signin;