import React from 'react';
import Header from '../../Header'
import Private from '../../auth/private'
import {Link} from 'react-router-dom'
import ReadBlogs from '../../crud/ReadBlogs'
import {isAuth} from '../../../actions/auth'


const UserBlogs = ()=>{
    const username = isAuth() && isAuth().username;
    return (
            <>
            <Header/>
            <Private>
                <div className = 'container'>
                    <div className = 'row'>
                        <div className = 'col-md-12 pb-5 pt-5 text-center'>                            
                            <h2>Manage blogs</h2>
                        </div>
                        <div className = 'col-md-12'>
                           <ReadBlogs username = {username}/>
                        </div>
                    </div>
                </div>
            </Private>
           
            </>
    )
}

export default UserBlogs;