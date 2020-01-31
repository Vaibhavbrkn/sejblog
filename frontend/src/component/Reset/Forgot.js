import Forgot from './RenderForgot';
import React from 'react'
import Header from '../Header';


const ForgotPassword = () => {

    return(
        <div>
            <Header/>
            <div className = 'container'>
                <Forgot/>
            </div>
        </div>
    )
}

export default ForgotPassword;


/*
 <React.Fragment>
        <Header>
           <div className="container">
                <h2>Forgot password</h2>
                <hr />
                {showError()}
                {showMessage()}
                {showForm && passwordForgotForm()}
            </div>
        </Header>
        </React.Fragment> */