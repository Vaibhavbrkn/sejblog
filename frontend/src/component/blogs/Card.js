import React from 'react'
import {Link} from 'react-router-dom'
import {API} from '../../config'
import renderHTML from 'react-render-html'
import moment from 'moment'

const Card = ({blog})=>{

    const {postedBy} = blog
    console.log(postedBy)
    const showBlogCategories = blog=>{
       return blog.categories.map((c , i)=>
            <a href = {`/categories/${c.slug}`} key = {i}>
                <button className = 'btn btn-primary mr-1 ml-1 mt-3'>{c.name}</button>
            </a>
        )
    }


    
    const showBlogTags = blog=>
        blog.tags.map((t , i)=>
            <a href = {`/tags/${t.slug}`} key = {i}>
                <button className = 'btn btn-outline-primary mr-1 ml-1 mt-3'>{t.name}</button>
            </a>
        )
    

    return (
        <div className= 'lead pb-4'>
        <header className = 'pt-3 pb-3'>
            <Link to = {`/blogs/${blog.slug}`}>
                <a><h2 classname = ' pt-4 pb-4 font-weight-blog'>{blog.title}</h2></a>
            </Link>
        </header>
        <section >
            <p className = 'lead mt-1 mark'>
                Posted by <Link to ={`/profile/${blog.postedBy.username}`}>
                <a>{blog.postedBy.username} </a>
                </Link>
                | Published {moment(blog.updatedAt).fromNow()}
            </p>
        </section >
        <section className = 'pt-2 pb-2'>
            {showBlogCategories(blog)}
            {showBlogTags(blog)}
            <br/>
            <br/>
        </section>
        <div className= 'row'>
            <div className = 'col-md-4'>
                <section>
                <img className = 'img img-fluid'
                        style = {{maxHeight : 'auto', width:'100%'}} 
                        src = {`${API}/blog/photo/${blog.slug}`}
                         alt = {blog.title}/>
                </section>
            </div>
            <div className = 'col-md-8'>
                <section>
                   <div className = 'pb-3 '>
                       {renderHTML(blog.excerpt)}
                   </div>
                    <Link to = {`/blogs/${blog.slug}`}>
                        <button className = 'btn btn-primary pt-2'>Read more</button>
                    </Link>
                </section>
            </div>
        </div>
    </div>
    )
}

export default Card;