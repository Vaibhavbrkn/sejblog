import React from 'react';
import {Link} from 'react-router-dom'
import {useEffect , useState} from 'react'
import history from '../../component/history'
import {getCookie , isAuth} from '../../actions/auth'
import {withRouter} from 'react-router'
import {getCategories} from '../../actions/Category'
import {getTags} from '../../actions/Tag'
import {singleBlog , updateBlog} from '../../actions/blog'
import ReactQuill from 'react-quill'
import useReactRouter from 'use-react-router'
import {useLocation , useParams} from 'react-router'
import '../../../node_modules/react-quill/dist/quill.snow.css'
import './crud_style/blogcreate.css'
import {API} from '../../config'

class  BlogUpdate extends React.Component{

    constructor(props){
        super(props)
        this.state = {body:'', error:'' , title:'' , success:'' , formData:'' , categories : [] , tags : [] , checked : [] ,checkedTag:[] , catArr:[] , tagArr:[]}
    }

    componentDidMount(){
        

        const setCategoriesArray = blogCategories => {
            let ca = [];
            blogCategories.map((c, i) => {
                ca.push(c._id);
            });
            this.setState({checked:ca});
        };

        const setTagsArray = blogTags => {
            let ta = [];
            blogTags.map((t, i) => {
                ta.push(t._id);
            });
            this.setState({checkedTag:ta});
        };

        this.setState({formData : new FormData()})
            console.log(this.props)
        if(this.props.match.params.slug){
            singleBlog(this.props.match.params.slug).then(data=>{
                if(data.error){
                    console.log(data.error)
                }else{
                    this.setState({ title : data.title})
                    this.setState({body :data.body})
                    setCategoriesArray(data.categories)
                    setTagsArray(data.tags)
                }
            
            }
            )
    }else if(this.props.match.params.blogs){
        singleBlog(this.props.match.params.blogs).then(data=>{
            if(data.error){
                console.log(data.error)
            }else{
                this.setState({ title : data.title})
                this.setState({body :data.body})
                setCategoriesArray(data.categories)
                setTagsArray(data.tags)
            }
        
        }
        )
}

        getTags().then(data => {
            if (data.error) {
                this.setState({ error: data.error });
            } else {
                this.setState({tags:data});
            }
        });

        
            getCategories().then(data => {
                if (data.error) {
                    this.setState({error: data.error });
                } else {
                    this.setState({categories:data});
                }
            });

    }

render(){
        
    

        const token = getCookie('token')
    const findOutCategory = c => {
        const result = this.state.checked.indexOf(c);
        if (result !== -1) {
            return true;
        } else {
            return false;
        }
    };

    const findOutTag = t => {
        const result = this.state.checkedTag.indexOf(t);
        if (result !== -1) {
            return true;
        } else {
            return false;
        }
    };

    const handleBody = e =>{
        this.setState({body:e})
        this.state.formData.set('body' ,e);
    }

    const handleChanges= name =>e=>{
        // console.log(e.target.value)
        const value = name === 'photo' ? e.target.files[0] : e.target.value
        this.state.formData.set(name , value)
        this.setState({ [name]:value , error: '' })
     }

    const editBlog = (e)=>{
        e.preventDefault()
        
            let path = this.props.match.params.slug
            let path2 = this.props.match.params.blogs
            if(isAuth().role ===1){
        updateBlog(this.state.formData , token ,path ).then(data=>{
            console.log(this.state.formData)
            if(data.error){
                this.setState({error:data.error})
            }else{
                this.setState({ success:`Blog titled "${data.title}" is successfully updated` })
                if(isAuth() && isAuth().role ===1){
                    history.push(`/admin/cruds/${path}`)
                }else if(isAuth() && isAuth().role ===0){
                    history.push(`/user/cruds/${path2}`)
                }
            }
        })
    }
    else if(isAuth().role ===0){
        updateBlog(this.state.formData , token ,path2 ).then(data=>{
            console.log(this.state.formData)
            if(data.error){
                this.setState({error:data.error})
            }else{
                this.setState({ success:`Blog titled "${data.title}" is successfully updated` })
                if(isAuth() && isAuth().role ===1){
                    history.push(`/admin/cruds/${path}`)
                }else if(isAuth() && isAuth().role ===0){
                    history.push(`/user/cruds/${path2}`)
                }
            }
        })
    }


    }
    const showError = ()=>
        <div className = 'alert alert-danger' style = {{display:this.state.error ? '':'none'}}>
            {this.state.error}
        </div>
    

    const showSuccess = ()=>
        <div className = 'alert alert-success' style = {{display:this.state.success ? '':'none'}}>
            {this.state.success}
        </div>
    


    const handleToggle = c => () => {
        this.setState({ error: '' });
        // return the first index or -1
        const clickedCategory = this.state.checked.indexOf(c);
        const all = [...this.state.checked];

        if (clickedCategory === -1) {
            all.push(c);
        } else {
            all.splice(clickedCategory, 1);
        }
        console.log(all);
        this.setState({checked:all});
        this.state.formData.set('categories', all);
    };

    const handleTagsToggle = t => () => {
        this.setState({error: '' });
        // return the first index or -1
        const clickedTag = this.state.checked.indexOf(t);
        const all = [...this.state.checkedTag];

        if (clickedTag === -1) {
            all.push(t);
        } else {
            all.splice(clickedTag, 1);
        }
        console.log(all);
        this.setState({checkedTag:all});
        this.state.formData.set('tags', all);
    };

    const showCategories = () => {
        return (
            this.state.categories &&
            this.state.categories.map((c, i) => (
                <li key={i} className="list-unstyled">
                    <input onChange = {handleToggle(c._id)} type="checkbox" checked={findOutCategory(c._id)} className="mr-2" />
                    <label className="form-check-label">{c.name}</label>
                </li>
            ))
        );
    };

    const showTags = () => {
        return (
            this.state.tags &&
            this.state.tags.map((t, i) => (
                <li key={i} className="list-unstyled">
                    <input onChange = {handleTagsToggle(t._id)} type="checkbox" checked={findOutTag(t._id)} className="mr-2" />
                    <label className="form-check-label">{t.name}</label>
                </li>
            ))
        );
    };


    const updateBlogForm = ()=>{
        return(
            <form onSubmit={editBlog}>
            <div className="form-group">
                <label className="text-muted">Title</label>
                <input type="text" className="form-control" value={this.state.title} onChange={handleChanges('title')} />
            </div>

            <div className="form-group">
                <ReactQuill
                    modules={BlogUpdate.modules}
                    formats={BlogUpdate.formats}
                    value={this.state.body}
                    placeholder="Write something amazing..."
                    onChange={handleBody}
                />
            </div>

            <div>
                <button type="submit" className="btn btn-primary">
                    Update
                </button>
            </div>
        </form>
        )
    }
            
    return(
        <div className = 'container-fluid pb-5'>
        <div className = 'row'>
            <div className = "col-md-8">
                {updateBlogForm()}
                <div className = 'pt-3'>
                   {showSuccess()}
                   {showError()}
                </div>
                {this.state.body&&(
                    <img src = {`${API}/blog/photo/${isAuth().role===1?this.props.match.params.slug:this.props.match.params.blogs}`}
                    alt = {this.state.title}
                    style = {{width:'100%'}}
                    />
                )}

            </div>
            <div className = 'col-md-4'>
                    <div className = 'form-group pb-2'>
                        <h5>featured image</h5>
                        <hr/>

                        <small className = 'text-muted'>
                            Max size: 1mb 
                        </small>

                        <label className = 'btn btn-outline-info '>
                            Upload featured Image
                        
                        <input onChange = {handleChanges('photo')}
                        type = 'file' accept = 'image/*' hidden
                        />

                        </label>

                    </div>
                    <h5>Categories</h5>
                    <hr/>
                    <ul style = {{maxHeight:'200px' , overflowY:'scroll'}}>
                        {showCategories()}
                    </ul>

                    <h5>Tags</h5>
                    <hr/>
                    <ul style = {{maxHeight:'200px' , overflowY:'scroll'}}>
                        {showTags()}
                    </ul>
                </div>
        </div>             
    </div>
    )
}
}

BlogUpdate.modules = {
    toolbar: [
        [{ header: '1' }, { header: '2' }, { header: [3, 4, 5, 6] }, { font: [] }],
        [{ size: [] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{ list: 'ordered' }, { list: 'bullet' }],
        ['link', 'image', 'video'],
        ['clean'],
        ['code-block']
    ]
};
 
BlogUpdate.formats = [
    'header',
    'font',
    'size',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'link',
    'image',
    'video',
    'code-block'
];

export default withRouter(BlogUpdate);