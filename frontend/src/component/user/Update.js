import React from 'react';
import Layout from '../Layout';
import Header from '../Header'
import Private from '../auth/private'
import ProfileUpdate from '../auth/ProfileUpdate'
import {Link} from 'react-router-dom'


const UserProfileUpdate = ()=>{ 
    return (
            <>
            <Header/>
            <Private>
                <div className = 'container-fluid'>
                    <div className = 'row'>
                        <ProfileUpdate/>
                    </div>
                </div>
            </Private>
           
            </>
    )
}

export default UserProfileUpdate;