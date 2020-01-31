import React from 'react'
import Head from 'next/head'
import {useState , useEffect} from 'react'
import {Link} from 'react-router-dom'
import {listBlogsWithCategoriesAndTags} from '../../src/actions/blog'
import {API} from '../../src/config'
import Header from '../../src/component/Header'
import renderHTML from 'react-render-html'
import moment from 'moment'



const Blogs = ({blogs , categories , tags , size})=>{

    const showAllBlogs = ()=>{
        return (blogs.map((blog , i)=>{
           return( <article key = {i}>
                <div className= 'lead pb-4'>
                    <header>
                        <Link href = {`/blogs/${blog.slug}`}>
                            <a><h2 classname = 'pt-3 pb-3 font-weight-blog'>{blog.title}</h2></a>
                        </Link>
                    </header>
                    <section>
                        <p className = 'mark ml-1 pt-2 pb-2'>
                            Written by {blog.postedBy.name} | Published {moment(blog.updatedAt).fromNow()}
                        </p>
                    </section>
                    <section>
                        <p>blog categories and tags</p>
                    </section>
                    <div className= 'row'>
                        <div className = 'col-md-4'>Image</div>
                        <div className = 'col-md-8'>
                            <section>
                               <div className = 'pb-3 '>
                                   {renderHTML(blog.excerpt)}
                               </div>
                                <Link href = {`/blogs/${blog.slug}`}>
                                    <a className = 'btn btn-primary pt-2'>Read more</a>
                                </Link>
                            </section>
                        </div>
                    </div>
                </div>
                <hr/>
            </article>
           )
        })
        )
        
}

    return (
        <>
            <Header/>
            <main>
                <div className = 'container-fluid'>
                    <header>
                        <div className = 'col-md-12 pt-3'>
                            <h1 className = 'display-4 font-weight-blod text-center'>
                                Technical Blogs and Tutorials
                            </h1>
                            <section>
                                <p>
                                    show categories and tags
                                </p>
                            </section>
                        </div> 
                        <div className = 'container-fluid'>
                            <div className = 'row'>
                                <div className = 'col-md-12'>
                                    {JSON.stringify(blogs)}
                                </div>
                            </div>
                        </div>
                    </header>
                </div>
            </main>
        </>
    )
}

Blogs.getInitialProps = ()=>{
    return listBlogsWithCategoriesAndTags().then(data=>{
        if(data.error){
            console.log(data.error)
        }else{
            return{
                blogs : data.blogs,
                categories: data.categories,
                tags:data.tags,
                size: data.size
            }
        }
    })
}

export default Blogs;