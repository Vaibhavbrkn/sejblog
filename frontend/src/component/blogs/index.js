import React from 'react'
import Head from 'next/head'
import {useState , useEffect} from 'react'
import {Link} from 'react-router-dom'
import {listBlogsWithCategoriesAndTags} from '../../actions/blog'
import {API , APP_NAME , DOMAIN_DEVELOPMENT} from '../../config'
import Header from '../Header'
import renderHTML from 'react-render-html'
import moment from 'moment'
import Blog from '../admin/crud/blog'
import Card from './Card'



class Blogs extends React.Component {
   constructor(){
       super()
   this.state = {blogs : [] , categories : [] , tags: [] , totalBlogs : 0, error :' '  , Skip:0 , Limit:2, loadedBlogs:[] }
   }

   componentDidMount(){
       let skip = 0;
       let limit = 2;

    listBlogsWithCategoriesAndTags(skip).then(data=>{
        if(data.error){
            console.log(data.error)
        }else{
            this.setState({totalBlogs:data.size})
        }
    })

    listBlogsWithCategoriesAndTags(skip , limit).then(data => {
        if (data.error) {
            console.log(data.error);
        } else {
            console.log(data.blogs)
            this.setState({ blogs : data.blogs ,
                            tags: data.tags,
                            categories:data.categories,
                            Limit:limit,
                          Skip:skip})
            }
   } )
   }


    

    render(){


       const head= ()=>
           
            <head>
                <title>BLOGS | APP_NAME</title>
                <meta name = 'description' content = "Blogs and Tutorial node next vue python java react go "/>
           
                <link rel = 'canonical' href = {`${DOMAIN_DEVELOPMENT}${this.props.location.pathname}`}/>
                <meta property = 'og:title' content = {`Latest programming tutorials | ${APP_NAME}`}/>
                <meta property = 'og:description' content = "Blogs and Tutorial node next vue python java react go "/>
                <meta property = 'og:type' content = 'website/'/>
                <meta property = 'og:url' content ={`${DOMAIN_DEVELOPMENT}${this.props.location.pathname}`}/>
                <meta property="og:site_name" content={`${APP_NAME}`} />

                <meta property="og:image" content={`${DOMAIN_DEVELOPMENT}/static/images/sejblog.jpg`} />
                <meta property="og:image:secure_url" content={`${DOMAIN_DEVELOPMENT}/static/images/sejblog.jpg`} />
                <meta property="og:image:type" content="image/jpg" />
                
            </head>
           


        const showAllCategories = ()=>{
            return this.state.categories.map((c , i)=>
                <Link to = {`/categories/${c.slug}`} key = {i}>
                    <button className = 'btn btn-primary mr-1 ml-1 mt-3'>
                        {c.name}
                    </button>
                </Link>
        )
        }

        const showAllTags = ()=>{
            return this.state.tags.map((t , i)=>
                <Link to = {`/tags/${t.slug}`} key = {i}>
                    <button className = 'btn btn-outline-primary mr-1 ml-1 mt-3'>
                        {t.name}
                    </button>
                </Link>
            )
        }

        const loadMore = ()=>{
            let toSkip = this.state.Skip+this.state.Limit
            listBlogsWithCategoriesAndTags(toSkip ).then(data=>{
                if (data.error) {
                    console.log(data.error);
                } else {
                    console.log(data.blogs)
                    
                 this.setState( {loadedBlogs:data.blogs})
                 
           } })
        }

        const loadmoreButton = ()=>{
            if(this.state.totalBlogs>(this.state.loadedBlogs.length+this.state.Limit)){
            return(
               
                    <button onClick = {loadMore} className = 'btn btn-outline-primary btn-lg'>
                        Load more
                    </button>
                )
            }
            
        }

        const  showLoadedBlogs = ()=>{
         
            return (this.state.loadedBlogs.map((blog , i)=>{
               return( <article key = {i}>
                   <Card blog = {blog}/>
                    <hr/>
                </article>
               )
            })
            )
        }
    
        const showAllBlog = ()=>{
            return this.state.blogs.map((blog ,i)=>
                <article key = {i}>
                    <Card blog = {blog}/>
                </article>
            )
        }


    return (
        <div>
            {head()}
            <Header/>
            <main>
                <div className = 'container-fluid'>
                    <header>
                        <div className = 'col-md-12 pt-3'>
                            <h1 className = 'display-4 font-weight-blod text-center'>
                                Technical Blogs and Tutorials
                            </h1>
                            <section>
                                <div className = 'pb-5 text-center'>
                                {showAllCategories()}
                                <br/>
                                {showAllTags()}
                                </div> 
                            </section>
                            </div>
                        <div className = 'container-fluid'>{showAllBlog()}</div>
                        <div className = 'container-fluid'>{showLoadedBlogs()}</div>
                        <div className = 'text-center pt-5 pb-5'> {loadmoreButton()}</div>
                    </header>
                </div>
            </main>
        </div>
    )
    }
}

Blogs.defaultProps = ()=>{
    return   listBlogsWithCategoriesAndTags().then(data => {
    if (data.error) {
        console.log(data.error);
    } else {
        console.log(data.blogs)
        return {
            blogs : data.blogs ,
            tags : data.tags,
            categories : data.categories,
            size : data.size
        };
    }
});
}

export default Blogs;