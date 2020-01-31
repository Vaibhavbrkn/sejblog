import React from 'react';
import {Link} from 'react-router-dom'
import {userPublicProfile} from '../../actions/user'
import {API , APP_NAME , DOMAIN_DEVELOPMENT} from '../../config'
import Header from '../Header'
import renderHTML from 'react-render-html'
import moment from 'moment'
import ContactForm from '../form/ContactForm'

class UserProfile extends React.Component{

    constructor(props){
        super(props)
        this.state = {user : '' , blogs : []}
    }

    componentDidMount(){
        
        console.log(this.props)
        userPublicProfile(this.props.match.params.username).then(data=>{
            if(data.error){
                console.log(data.error)
            }else{
                document.title = `${data.user.name}`
                this.setState({user:data.user , blogs :data.blogs})
                
            }
        })
        
    }

    render(){

        const showUserBlogs = (blogs) => {
            return blogs.map((blog, i) => {
                return (
                    <div className="mt-4 mb-4" key={i}>
                        <Link to ={`/blogs/${blog.slug}`}>
                            <a className="lead">{blog.title}</a>
                        </Link>
                    </div>
                );
            });
        };
    

    return(

        <div>
            <title>
                {this.state.user.name}
            </title>
            <Header/>
            <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="card">
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-md-8">
                                            <h5>{this.state.user.name}</h5>
                                            <p className="text-muted">Joined {moment(this.state.user.createdAt).fromNow()}</p>
                                        </div>
                                        <div className="col-md-4">
                                            <img
                                                src={`${API}/user/photo/${this.state.user.username}`}
                                                className="img img-fluid img-thumbnail mb-3"
                                                style={{ maxHeight: '100px', maxWidth: '100%' }}
                                                alt="user profile"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <br />

                <div className="container pb-5">
                    <div className="row">
                        <div className="col-md-6">
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title bg-primary pt-4 pb-4 pl-4 pr-4 text-white">
                                        Recent blogs by {this.state.user.name}
                                    </h5>

                                    {showUserBlogs(this.state.blogs)}
                                </div>
                            </div>
                        </div>

                        <div className="col-md-6">
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title bg-primary pt-4 pb-4 pl-4 pr-4 text-light">
                                        Message {this.state.user.name}
                                    </h5>
                                    <br />
                                    <p><ContactForm authorEmail = {this.state.user.email}/></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        </div>
    )
}
}

export default UserProfile;