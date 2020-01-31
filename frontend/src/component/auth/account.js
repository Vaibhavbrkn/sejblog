import React from 'react'
import {signup}from '../../actions/auth';
import jwt from 'jsonwebtoken'
import Header from  '../Header'

class accountActivate extends React.Component {
    constructor(props){
        super(props)
        this.state = {name: '',
                      token: '',
                      error: '',
                      loading: false,
                     success: false,
                     showButton:true}
    }


    componentDidMount(){
        let token = this.props.match.params.slug;
        if (token) {
            const { name } = jwt.decode(token);
            this.setState({name, token });
        }
    }
    

    render(){
       

        const clickSubmit = e => {
            e.preventDefault();
            this.setState({ loading: true, error: false });
            console.log(this.props.match.params.slug)
            let token = this.props.match.params.slug;
            signup( {token} ).then(data => {
                if (data.error) {
                    this.setState({ error: data.error, loading: false, showButton: false });
                } else {
                    this.setState({  loading: false, success: true, showButton: false });
                }
            });
        };

        const showLoading = () => (this.state.loading ? <h2>Loading...</h2> : '');

    

        return(
            <div>
                <Header/>
                <div className="container">
                <h3 className="pb-4">Hey {this.state.name}, Ready to activate your account?</h3>
                {showLoading()}
                {this.state.error && this.state.error}
                {this.state.success && 'You have successfully activated your account. Please signin.'}
                {this.state.showButton && (
                    <button className="btn btn-outline-primary" onClick={clickSubmit}>
                        Activate Account
                    </button>
                )}
            </div>
            </div>
        )
    }
}
export default  accountActivate;