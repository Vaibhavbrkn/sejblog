import React from 'react';
import Layout from '../Layout';
import Header from '../Header'
import Private from '../auth/private'
import {Link} from 'react-router-dom'


const UserIndex = ()=>{ 
    return (
            <>
            <Header/>
            <Private>
                <div className = 'container-fluid'>
                    <div className = 'row'>
                        <div className = 'col-md-12 pb-5 pt-5'>                            
                            <h2>User Dashboard</h2>
                        </div>
                        <div className = 'col-md-4'>
                        <ul class="list-group">
 
                            <li className="list-group-item">
                                <Link to ='/user/crud/blog'>
                                    Create Blog
                                </Link>
                            </li>

                            <li className="list-group-item">
                                <Link to ='/user/crud/blogs'>
                                    Update/Delete  Blog
                                </Link>
                            </li>

                            <li className="list-group-item">
                                <Link to ='/user/update'>
                                    Update Profile
                                </Link>
                            </li>
                        </ul>
                        </div>
                        <div className = 'col-md-8'></div>
                    </div>
                </div>
         
                </Private>
            </>
    )
}

export default UserIndex;