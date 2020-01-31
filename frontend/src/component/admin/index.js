import React from 'react';
import Layout from '../Layout';
import Header from '../Header'
import Admin from '../auth/Admin'
import {Link} from 'react-router-dom'

const AdminIndex = ()=>{ 
    return (
            <>
            <Header/>
            <Admin>
                <div className = 'container-fluid'>
                    <div className = 'row'>
                        <div className = 'col-md-12 pb-5 pt-5'>                            
                            <h2>Admin Dashboard</h2>
                        </div>
                        <div className = 'col-md-6'>
                        <ul class="list-group">
                            <li className="list-group-item">
                                <Link to ='/admin/crud/category-tag'>
                                    Create Category
                                </Link>
                            </li>

                            <li className="list-group-item">
                                <Link to ='/admin/crud/category-tag'>
                                    Create Tag
                                </Link>
                            </li>
 
                            <li className="list-group-item">
                                <Link to ='/admin/crud/blog'>
                                    Create Blog
                                </Link>
                            </li>

                            <li className="list-group-item">
                                <Link to ='/admin/crud/blogs'>
                                    Update Blog
                                </Link>
                            </li>

                            <li className="list-group-item">
                                <Link to ='/user/update'>
                                    Update Profile
                                </Link>
                            </li>


                        </ul>
                        </div>
                        <div className = 'col-md-6'></div>
                    </div>
                </div>
            </Admin>
           
            </>
    )
}

export default AdminIndex;