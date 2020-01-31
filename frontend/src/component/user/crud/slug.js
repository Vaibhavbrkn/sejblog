import React from 'react';
import Header from '../../Header'
import Private from '../../auth/private'
import {Link} from 'react-router-dom'
import BlogUpdate from '../../crud/BlogUpdate'


const UserBlogUp = ()=>{
    return (
            <>
            <Header/>
            <Private>
                <div className = 'container-fluid'>
                    <div className = 'row'>
                        <div className = 'col-md-12 pb-5 pt-5 text-center'>                            
                            <h2>Update Blog</h2>
                        </div>
                        <div className = 'col-md-12'>
                           <BlogUpdate/>
                        </div>
                    </div>
                </div>
            </Private>
           
            </>
    )
}

export default UserBlogUp;