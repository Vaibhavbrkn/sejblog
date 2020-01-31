import React from 'react';
import Header from '../../Header'
import Private from '../../auth/private'
import {Link} from 'react-router-dom'
import CreateBlog from '../../crud/Blogcreate'


const CreateUserBlog = ()=>{
    return (
            <>
            <Header/>
            <Private>
                <div className = 'container-fluid'>
                    <div className = 'row'>
                        <div className = 'col-md-12 pb-5 pt-5 text-center'>                            
                            <h2>Create a new Blog</h2>
                        </div>
                        <div className = 'col-md-12'>
                           <CreateBlog/>
                        </div>
                    </div>
                </div>
            </Private>
           
            </>
    )
}

export default CreateUserBlog;