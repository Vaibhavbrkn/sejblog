import React from 'react'
import {Link} from 'react-router-dom'
import {API} from '../../config'
import renderHTML from 'react-render-html'
import moment from 'moment'

const SmallCard = ({blog})=>{


    return (
        <div className = 'card'>
            <section>
                <Link to = {`/blogs/${blog.slug}`}>
                    <a>
                    <img className = 'img img-fluid'
                        style = {{height : '250px', width:'100%'}} 
                        src = {`${API}/blog/photo/${blog.slug}`}
                         alt = {blog.title}/>
                    </a>
                </Link>
            </section>
            <div className = 'card-body'>
                <section>
                <a href ={`/blogs/${blog.slug}`}>
                    <h5 className = 'card-title'>
                        {blog.title}
                    </h5>
                 </a>
                 <p className = 'card-text'>
                     {renderHTML(blog.excerpt)}
                 </p>
                </section>
            </div>
            <div className= 'card-body'>
            <a href ={`/blogs/${blog.slug}`}>
            <button className = 'btn btn-primary pt-2'>Read more</button>
            </a>
            </div>
        </div>
       
    )
}

export default SmallCard;