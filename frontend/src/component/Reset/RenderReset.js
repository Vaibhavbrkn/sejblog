import { useState } from 'react';
import React from 'react'
import { resetPassword } from '../../actions/auth';
import Header from  '../Header'

class Reset extends React.Component {
    constructor(props){
        super(props)
        this.state = {name: '',
                      newPassword: '',
                      error: '',
                      message: '',
                     showForm: true}
    }

    render(){
        const newPassword = this.state.newPassword
        const handleSubmit = e => {
            e.preventDefault();
            resetPassword({
                newPassword,
                resetPasswordLink: this.props.match.params.slug
            }).then(data => {
                if (data.error) {
                    this.setState({  error: data.error, showForm: false, newPassword: '' });
                } else {
                    this.setState({ message: data.message, showForm: false, newPassword: '', error: false });
                }
            });
        };
    
        const passwordResetForm = () => (
            <form onSubmit={handleSubmit}>
                <div className="form-group pt-5">
                    <input
                        type="password"
                        onChange={e => this.setState({ newPassword: e.target.value })}
                        className="form-control"
                        value={this.state.newPassword}
                        placeholder="Type new password"
                        required
                    />
                </div>
                <div>
                    <button className="btn btn-primary">Change password</button>
                </div>
            </form>
        );

        const showError = () => (this.state.error ? <div className="alert alert-danger">{this.state.error}</div> : '');
        const showMessage = () => (this.state.message ? <div className="alert alert-success">{this.state.message}</div> : '');
    

        return(
            <div>
                <Header/>
                <div className="container">
                <h2>Reset password</h2>
                <hr />
                {showError()}
                {showMessage()}
                {passwordResetForm()}
                </div>
            </div>
        )
    }
}
export default  Reset;