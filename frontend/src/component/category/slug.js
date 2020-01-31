import React from 'react'
import {useState , useEffect} from 'react'
import {Link} from 'react-router-dom'
import {singleCategory} from '../../actions/Category'
import {API , APP_NAME , DOMAIN_DEVELOPMENT} from '../../config'
import Header from '../Header'
import renderHTML from 'react-render-html'
import moment from 'moment'
import Card from '../blogs/Card'

class Category extends React.Component{
    constructor(props){
        super(props)
        this.state = {category : [] , blogs : []}
    }

    componentDidMount(){
        var  slug = this.props.match.params.slug
       console.log(JSON.stringify(slug))

       singleCategory(slug).then(data=>{
           if(data.error){
               console.log(data.error)
           }else{
               console.log(data.blogs)
               this.setState({category:data.category , blogs:data.blogs})
           }
       })
    }

    render(){
    return (
        <>
            <Header/>
            <main>
                <div className = 'container-fluid text-center'>
                    <header>
                        <div className = 'col-md-12 pt-3'>
                            <h1 className = 'display-4 font-weight-bold'>
                               {this.state.category.name}
                            </h1>
                            {this.state.blogs.map((b,i)=>
                                <div>
                                    <Card key = {i} blog = {b}/>
                                    <hr/>
                                </div>
                            )}
                        </div>
                    </header>
                </div>
            </main>

        </>
    )
}
}


export default Category;