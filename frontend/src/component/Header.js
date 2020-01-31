import React, { useState, Component } from 'react';
import {APP_NAME} from '../config'
import {
  Collapse,
  Navbar,
  NavbarBrand,
  NavbarToggler,
  NavLink,
  Nav,
  NavItem
} from 'reactstrap';
import {BrowserRouter,Link } from 'react-router-dom'
import NProgress from 'nprogress'
import {signout , isAuth} from '../actions/auth'
import history from './history'
import Search from './blogs/Search'



const Header = ()=>{
  
    const [isOpen, setIsOpen] = useState(false);

     const toggle = () => setIsOpen(!isOpen);
    return (
        
        <Nav className="mr-auto" navbar>
        <Navbar color="light" light expand="md">

         
           <React.Fragment>
            <NavItem>
            <Link to = '/'>{APP_NAME}</Link>
        </NavItem>
        &nbsp; &nbsp;
        <NavItem>
          <Link to = '/blogs'>Blogs</Link>
        </NavItem>
        &nbsp; &nbsp;

        <NavItem>
          <Link to = '/contact'>Contact</Link>
        </NavItem>
        &nbsp; &nbsp;
        
        </React.Fragment>
         
           {!isAuth()&&(
             <>
             <NavItem>
                <Link to = '/signin'>Signin</Link>
              </NavItem>
              &nbsp; &nbsp;
            <NavItem>
                <Link to = '/signup'>Signup</Link>
            </NavItem>
            &nbsp; &nbsp;
             </>
           )}

        {isAuth()&& isAuth().role ===0 &&(
                <NavItem>
                  <Link to = '/user'>
                <NavLink>
                  {`${isAuth().name}'s Dashboard`}
                </NavLink>
                </Link>
                </NavItem>
              )}
                &nbsp; &nbsp;
               {isAuth()&& isAuth().role ===1 &&(
                <NavItem>
                  <Link to = '/admin'>
                <NavLink>
                  {`${isAuth().name}'s Dashboard`}
                </NavLink>
                </Link>
                </NavItem>
              )}

              &nbsp; &nbsp;

           {isAuth()&&(
                <NavItem>
                <NavLink style= {{cursor : 'pointer' , color:'#6A5ACD'}} onClick = {()=>signout(()=>history.push('/signin'))}>Signout</NavLink>
                </NavItem>

              )}
              &nbsp; &nbsp;

            <NavItem>
                <Link to = '/user/crud/blog'>
                  <button className = 'btn btn-primary text-light'>
                    Write a blog
                  </button> 
                  </Link>
            </NavItem>

        </Navbar>
        <Navbar>
        <Search/>
        </Navbar>
      </Nav>
     
        
    )
}

export default Header;