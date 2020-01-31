import {useState , useEffect} from 'react'
import {Link , Router} from 'react-router-dom'
import history from '../history';
import {isAuth , getCookie} from '../../actions/auth';
import {create , getTags , removeTag} from '../../actions/Tag'
import { Button } from 'reactstrap';
import React from 'react'

const Tag = ()=>{
    const [values , setValues] = useState({
        name: '',
        error: false,
        success : false,
        tags:[],
        reload :false,
        removed : false
    })

    const {name , error , success , tags , removed} = values
    const token = getCookie('token')

    useEffect(()=>{
        loadTag()
    },[success])

    const loadTag = ()=>{
        getTags().then(data=>{
            if(data.error){
                console.log(data.error)
            }else{
                setValues({...values , tags:data})
            }
        })
    }

    const showTags = ()=>{
        return tags.map((c , i)=>{
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
        let answer = window.confirm('Are you sure you want to delete this tag')
        if(answer){
            deleteTags(slug)
        }
    }

    const deleteTags = slug=>{
       // console.log('delete' , slug)
       removeTag(slug , token).then(data=>{
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
                <p className = 'text-success'>Tag is created</p>
            )
        }
    }

    const showError= ()=>{
        if(error){
            return(
                <p className = 'text-danger'>Tag already exist</p>
            )
        }
    }

    const showRemoved = ()=>{
        if(removed){
            return(
                <p className = 'text-danger'>Tag is removed</p>
            )
        }
    }

    const MouseMoveHandler =e=>{
        setValues({...values , error:false,success:false , removed:false})
    }

    const newTagForm = ()=>{
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
            {newTagForm()}
            {showTags()}
        </div>
        </>
    )
}

export default Tag;