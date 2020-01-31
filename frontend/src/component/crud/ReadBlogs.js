import React from 'react';
import {Link} from 'react-router-dom'
import {useEffect , useState} from 'react'
import history from '../../component/history'
import {getCookie , isAuth} from '../../actions/auth'
import {withRouter} from 'next/router'
import {list, removeBlog} from '../../actions/blog'
import moment from 'moment';

const ReadBlogs = ({username})=>{
    const [blogs , setBlogs] =  useState([])
    const [message , SetMessage] = useState('') 
    const token = getCookie('token')
    
    useEffect(()=>{
        loadBlogs()
    },[])

    const loadBlogs = ()=>{
        list(username).then(data=>{
            if(data.error){
                console.log(data.error)
            }else{
                setBlogs(data);
            }
        })
    };

    const deleteBlog = (slug)=>{
        removeBlog(slug , token).then(data=>{
            if(data.error){
                console.log(data.error)
            }else{
                SetMessage(data.message)
                loadBlogs()
            }
        })
    }

    const deleteConfirm = (slug)=>{
        let answer = window.confirm('Are you sure you want to delete your blog?')
        if(answer){
            deleteBlog(slug)
        }
    }

    const showUpdateButton = (blog)=>{
        if(isAuth()&& isAuth().role ==0){
            return(
                <Link to ={`/user/cruds/${blog.slug}`}>
                    <button className = 'ml-2 btn btn-warning'>
                        Update
                    </button>
                </Link>
            )
        }else if(isAuth()&& isAuth().role ==1){
            return(
                <Link to = {`/admin/cruds/${blog.slug}`}>
                    <button className = 'ml-2 btn btn-warning'>
                        Update
                    </button>
                </Link>
            )
        }
    }

    const showAllBlogs = ()=>{
        return blogs.map((blog ,i)=>{
            return (
                <div key = {i} className = 'pb-5'>
                    <h3>{blog.title}</h3>
                    <p className = 'mark'>
                        Written by {blog.postedBy.name} | Published on {moment(blog.updatedAt).fromNow()}
                    </p>
                    <button className = 'btn btn-sn btn-danger' onClick = {()=>deleteConfirm(blog.slug)}>
                        Delete
                    </button>
                    {showUpdateButton(blog)}
                </div>
            )
        })
    }

    return(
        <>
            
            <div className = 'row'>
                <div className = 'col-md-12'>
                {message && <div className = 'alert alert-warning'>{message}</div>}
                {showAllBlogs()}
                </div>
                
            </div>
              
        </>
    )
}

export default ReadBlogs;