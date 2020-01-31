import React from 'react'
import Head from 'next/head'
import {useState , useEffect} from 'react'
import {Link} from 'react-router-dom'
import {singleBlog , listRelated} from '../../actions/blog'
import {API , APP_NAME , DOMAIN_DEVELOPMENT} from '../../config'
import Header from '../Header'
import renderHTML from 'react-render-html'
import moment from 'moment'
import Blog from '../admin/crud/blog'
import './style.css'
import SmallCard from './SmallCard'
import DisqusThread from '../Disqus'


class SingleBlog extends React.Component{
    constructor(props){
        super(props)
        
        this.state = {blog:'' , postedBy:'' , tags:[] , categories:[], body:'',related:[] , related : []}
        
    }
   

   componentDidMount(){
       var  slug = this.props.match.params.slug
       console.log(JSON.stringify(slug))
       singleBlog(slug).then(data=>{
            if(data.error){
                console.log(data.error)
            }else{
                this.setState({blog:data,
                             postedBy:data.postedBy,
                            tags:data.tags,
                        categories:data.categories,
                            body:data.body})
                            
            }
        })
        console.log(this.state.categories)
        listRelated(this.state.categories).then(data=>{
            if(data.error){
                console.log(data.error)
            }
            else{
                console.log(data)
                this.setState({related:data})
            }
        })
        
    }

   /* componentDidUpdate(){
        
        listRelated(this.state.categories).then(data=>{
            if(data.error){
                console.log(data.error)
            }
            else{
                console.log(data)
                this.setState({related:data})
            }
        })
    }*/

    render(){
        
            const showrelated=(related)=>{
                return related.map((blog,i)=>{
                   return( <div className = 'col-md-4' key = {i}>
                        <article>
                            <SmallCard blog = {blog}/>
                        </article>
                    </div>
                   )
                }
                )}
        
              

        const showBlogCategories = blog=>{
            return blog.map((c , i)=>
                 <Link to = {`/categories/${c.slug}`} key = {i}>
                     <button className = 'btn btn-primary mr-1 ml-1 mt-3'>{c.name}</button>
                 </Link>
             )
         }
     
         const showComments = ()=>{
            return(
                <div>
                    <DisqusThread id = {this.state.blog.id} title = {this.state.blog.title} path = {`/blog/${this.props.match.params.slug}`}/>
                </div>
            )
        }
         
         const showBlogTags = blog=>
             blog.map((t , i)=>
                 <Link to = {`/tags/${t.slug}`} key = {i}>
                     <button className = 'btn btn-outline-primary mr-1 ml-1 mt-3'>{t.name}</button>
                 </Link>
             )
         

        var  slug = this.props.match.params.slug
    return (
        <div>
            <Header/>
            <main>
                <article>
                    <div className = 'container-fluid'>
                        <section>
                            <div className = 'row' style = {{marginTop:'-30px'}}>
                            <img className = 'img img-fluid featured-image'
                                 src = {`${API}/blog/photo/${slug}`}
                                 alt = {this.state.blog.title}/>
                            </div>
                        </section>
                        <section>
                            <p className = 'lead mt-1 mark'>
                          Posted by <Link to ={`/profile/${this.state.postedBy.username}`}>
                              <a>{this.state.postedBy.username} </a>
                          </Link>
                           | Published {moment(this.state.blog.updatedAt).fromNow()}
                            </p>

                            <div className = 'pb-3'>
                                {showBlogCategories(this.state.categories)}
                                {showBlogTags(this.state.tags)}
                                <br/>
                                <br/>
                            </div>
                        </section>
                    </div>
                    <div className = 'container'>
                        <section>
                            <div className = 'col-md-12 lead'>
                                {renderHTML(this.state.body)}
                            </div>
                        </section>
                    </div>
                    <div className = 'container pb-5'>
                        <h4 className = 'text-center pt-5 pb-5 h2'>Realated blogs</h4>
                        <hr/>
                        <div className = 'row'>
                            {showrelated(this.state.related)}
                        </div>
                    </div>
                    <div className = 'container pb-5'>
                       {showComments()}
                    </div>
                </article>
            </main>

        </div>
    )
}
}

export default SingleBlog;

