import React from 'react';
import Header from './Header'
import {BrowserRouter} from 'react-router-dom'

const Layout = ({children})=>{
    return(
        <React.Fragment>
            
            <Header/>
            {children}
            <p>Footer</p>
        </React.Fragment>
    )
}

export default Layout;