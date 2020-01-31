import {useState , useEffect} from 'react'
import {Link , Router} from 'react-router-dom'
import history from '../history';
import {isAuth , getCookie} from '../../actions/auth';
import {create , getCategories , removeCategory} from '../../actions/Category'
import { Button } from 'reactstrap';
import React from 'react'

const Category = ()=>{
    const [values , setValues] = useState({
        name: '',
        error: false,
        success : false,
        categories:[],
        reload :false,
        removed : false
    })

    const {name , error , success , categories , removed} = values
    const token = getCookie('token')

    useEffect(()=>{
        loadCategories()
    },[success])

    const loadCategories = ()=>{
        getCategories().then(data=>{
            if(data.error){
                console.log(data.error)
            }else{
                setValues({...values , categories:data})
            }
        })
    }

    const showCategories = ()=>{
        return categories.map((c , i)=>{
            return( <button 
                    onDoubleClick = {()=>deleteConfirm(c.slug)}
                    title = 'Double Click to delete'
                    key = {i} 
                    className = 'btn btn-outline-primary mr-1 ml-1 mt-3'>
                        {c.name}
                    </button>
            )
        })
    }

    const deleteConfirm = slug=>{
        let answer = window.confirm('Are you sure you want to delete this category')
        if(answer){
            deleteCategory(slug)
        }
    }

    const deleteCategory = slug=>{
       // console.log('delete' , slug)
       removeCategory(slug , token).then(data=>{
           if(data.error){
               console.log(data.error)
           }else{
               setValues({...values , error:false , success:true , name:'' , removed: !removed })
           }
    })
    }

    const clickSubmit = (e)=>{
        e.preventDefault()
       // console.log('create category',name)
       create({name},token).then(data=>{
           if(data.error){
               setValues({...values ,error : data.error , success: false })
           }else{
               setValues({...values , error: false , success:true , name:'' , removd:false })
           }
       })
    }

    const handleChange = (e)=>{
        setValues({...values ,
                name:e.target.value,
                error:false,
                success :false,
                removd:''
     })
    }

    const showSuccess = ()=>{
        if(success && !removed){
            return(
                <p className = 'text-success'>Category is created</p>
            )
        }
    }

    const showError= ()=>{
        if(error){
            return(
                <p className = 'text-danger'>Category already exist</p>
            )
        }
    }

    const showRemoved = ()=>{
        if(removed){
            return(
                <p className = 'text-danger'>Category is removed</p>
            )
        }
    }

    const MouseMoveHandler =e=>{
        setValues({...values , error:false,success:false , removed:false})
    }

    const newCategoryForm = ()=>{
        return(
        <form onSubmit = {clickSubmit}>
            <div className = 'form-group'>
                <label className = 'text-muted'>
                    Name
                </label>
                <input 
                type = 'text'
                className = 'form-control' 
                onChange = {handleChange} 
                value = {name} 
                required/>
            </div>
            <div>
            <button type = 'submit' className = 'btn btn-primary'>
                    Create
                </button>
            </div>
        </form>
        )
    }
    return(
        <>
        {showError()}
        {showRemoved()}
        {showSuccess()}
        <div onMouseMove = {MouseMoveHandler}>
            {newCategoryForm()}
            {showCategories()}
        </div>
        </>
    )
}

export default Category;