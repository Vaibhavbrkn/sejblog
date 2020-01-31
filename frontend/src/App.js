import React from 'react';
import {Router , Switch} from 'react-router-dom';
import {Link , Route} from 'react-router-dom'
import Signin from './component/Signin'
import Home from './component/Home'
import  Header from './component/Header'
import Signup from './component/Signup'
import history from './component/history'
import UserIndex from './component/user'
import AdminIndex from './component/admin'
import CategoryTag from './component/admin/crud/category-tag';
import Blog from './component/admin/crud/blog'
import Blogs from './component/blogs'
import SingleBlog from './component/blogs/slug';
import MBlogs from './component/admin/crud/blogs'
import BlogUS from './component/admin/crud/slug'
import Category from './component/category/slug'
import Tag from './component/tags/slug'
import UserProfile from './component/profile/Username'
import UserProfileUpdate from './component/user/Update'
import UserBlogs from './component/user/crud/blogs'
import CreateUserBlog from './component/user/crud/Create';
import UserBlogUp from './component/user/crud/slug'
import Contact from './component/form/Contact'
import ForgotPassword from './component/Reset/Forgot'
import Reset from './component/Reset/RenderReset'
import accountActivate from './component/auth/account'

const App = ()=>{
  return(
    <Router history = {history}>
      
      <Route  path = '/Signin' component = {Signin}/>
      <Route exact path = '/' component = {Home}/>
      <Route path = '/Signup' component = {Signup}/>
      <Route exact path = '/user' component = {UserIndex}/>
      <Route exact path = '/admin' component = {AdminIndex}/>
      <Route path = '/admin/crud/category-tag' component = {CategoryTag}/>
      <Route exact path =  '/admin/crud/blog' component = {Blog}/>
      <Route exact path = '/blogs' component = {Blogs}/>
      <Route exact path = '/blogs/:slug' component = {SingleBlog}/>
      <Route exact path = '/admin/crud/blogs' component = {MBlogs}/>
      <Route exact path = '/admin/cruds/:slug' component = {BlogUS}/>
      <Route exact path = '/categories/:slug' component = {Category}/>
      <Route exact path = '/tags/:slug' component = {Tag}/>
      <Route exact path = '/profile/:username' component ={UserProfile}/>
      <Route exact path = '/user/update' component = {UserProfileUpdate}/>
      <Route exact path = '/user/crud/blog' component = {CreateUserBlog}/>
      <Route exact path = '/user/crud/blogs' component = {UserBlogs}/>
      <Route exact path = '/user/cruds/:blogs' component = {UserBlogUp}/>
      <Route exact  path = '/contact' component = {Contact}/>
      <Route exact  path = '/auth/password/forgot' component = {ForgotPassword}/>
      <Route exact path = '/auth/password/reset/:slug' component = {Reset}/>
      <Route exact path = '/auth/account/activate/:slug' component = {accountActivate}/>
    </Router>
    
  )
}

export default App;
