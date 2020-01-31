import React from 'react'
import {useEffect} from 'react'
import history from '../history'
import {isAuth} from '../../actions/auth'

const Admin = ({children})=>{
    useEffect(()=>{
        if(!isAuth()){
            history.push('/signin')
        }else if(isAuth().role !== 1){
            history.push('/');
        }
    },[])
    return <React.Fragment>{children}</React.Fragment>
}

export default Admin;