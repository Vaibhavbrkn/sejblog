import React from 'react';
import Header from '../../Header'
import Admin from '../../auth/Admin'
import {Link} from 'react-router-dom'
import ReadBlogs from '../../crud/ReadBlogs'


const MBlogs = ()=>{
    return (
            <>
            <Header/>
            <Admin>
                <div className = 'container'>
                    <div className = 'row'>
                        <div className = 'col-md-12 pb-5 pt-5 text-center'>                            
                            <h2>Manage blogs</h2>
                        </div>
                        <div className = 'col-md-12'>
                           <ReadBlogs/>
                        </div>
                    </div>
                </div>
            </Admin>
           
            </>
    )
}

export default MBlogs;