import React from 'react'
import {useEffect} from 'react'
import history from '../history'
import {isAuth} from '../../actions/auth'

const Private = ({children})=>{
    useEffect(()=>{
        if(!isAuth()){
            history.push('/signin')
        }
    },[])
    return <React.Fragment>{children}</React.Fragment>
}

export default Private;