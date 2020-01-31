import React from 'react';
import Header from '../../Header'
import Admin from '../../auth/Admin'
import {Link} from 'react-router-dom'
import Category from '../../crud/Category'
import Tag from '../../crud/Tag'

const CategoryTag = ()=>{
    return (
            <>
            <Header/>
            <Admin>
                <div className = 'container-fluid'>
                    <div className = 'row'>
                        <div className = 'col-md-12 pb-5 pt-5 text-center'>                            
                            <h2>Manage Category and Tag</h2>
                        </div>
                        <div className = 'col-md-6'>
                           <Category/>
                        </div>
                        <div className = 'col-md-6'>
                            <Tag/>
                        </div>
                    </div>
                </div>
            </Admin>
           
            </>
    )
}

export default CategoryTag;