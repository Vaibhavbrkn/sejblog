import React from 'react'
import {Link} from 'react-router-dom'
import {useEffect , useState} from 'react'
import history from '../../component/history'
import {getCookie , isAuth} from '../../actions/auth'
import {withRouter} from 'next/router'
import {getCategories} from '../../actions/Category'
import {getTags} from '../../actions/Tag'
import {createBlog} from '../../actions/blog'
import ReactQuill from 'react-quill'
import '../../../node_modules/react-quill/dist/quill.snow.css'
import './crud_style/blogcreate.css'

const CreateBlog = ({router})=>{

    const blogFromLs = ()=>{
        if(typeof window === 'undefined'){
            return false
        }

        if(localStorage.getItem('blog')){
            return JSON.parse(localStorage.getItem('blog'))
        }else{
            return false
        }
    }

    const [categories, setCategories] = useState([]);
    const [tags, setTags] = useState([]);

    const [checked, setChecked] = useState([]); 
    const [checkedTag, setCheckedTag] = useState([]); 


    const [body , setBody] = useState(blogFromLs())
    const [values , setValues] = useState({
        error : '',
        sizeError : '',
        success : '',
        formData : '',
        title : '',
        hidePublishButton : false
    })

    const {error , sizeError , success , formData , title , hidePublishButton} = values
    const token = getCookie('token')

    useEffect(()=>{
        setValues({...values , formData: new FormData()})
        initCategories()
        initTags()
    },[router])

    const initCategories = () => {
        getCategories().then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error });
            } else {
                setCategories(data);
            }
        });
    };

    const initTags = () => {
        getTags().then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error });
            } else {
                setTags(data);
            }
        });
    };

    const publishBlog = (e)=>{
        e.preventDefault()
       // console.log('ready to publishBlog')
       createBlog(formData ,token ).then(data=>{
           if(data.error){
               setValues({...values , error:data.error})
            }else{
                setValues({ ...values, title: '', error: '', success: `A new blog titled "${data.title}" is created` });
                setBody('');
                setCategories([]);
                setTags([]);
            }
       })
    }

    const handleChanges= name =>e=>{
       // console.log(e.target.value)
       const value = name === 'photo' ? e.target.files[0] : e.target.value
       formData.set(name , value)
       setValues({...values , [name]:value , formData , error: '' })
    }

    const handleBody = e => {
        // console.log(e);
        setBody(e);
        formData.set('body', e);
        if (typeof window !== 'undefined') {
            localStorage.setItem('blog', JSON.stringify(e));
        }
    };

    const handleToggle = c => () => {
        setValues({ ...values, error: '' });
        // return the first index or -1
        const clickedCategory = checked.indexOf(c);
        const all = [...checked];

        if (clickedCategory === -1) {
            all.push(c);
        } else {
            all.splice(clickedCategory, 1);
        }
        console.log(all);
        setChecked(all);
        formData.set('categories', all);
    };

    const handleTagsToggle = t => () => {
        setValues({ ...values, error: '' });
        // return the first index or -1
        const clickedTag = checked.indexOf(t);
        const all = [...checkedTag];

        if (clickedTag === -1) {
            all.push(t);
        } else {
            all.splice(clickedTag, 1);
        }
        console.log(all);
        setCheckedTag(all);
        formData.set('tags', all);
    };

    const showCategories = () => {
        return (
            categories &&
            categories.map((c, i) => (
                <li key={i} className="list-unstyled">
                    <input onChange = {handleToggle(c._id)} type="checkbox" className="mr-2" />
                    <label className="form-check-label">{c.name}</label>
                </li>
            ))
        );
    };

    const showTags = () => {
        return (
            tags &&
            tags.map((t, i) => (
                <li key={i} className="list-unstyled">
                    <input onChange = {handleTagsToggle(t._id)} type="checkbox" className="mr-2" />
                    <label className="form-check-label">{t.name}</label>
                </li>
            ))
        );
    };

    const showError = () => (
        <div className="alert alert-danger" style={{ display: error ? '' : 'none' }}>
            {error}
        </div>
    );

    const showSuccess = () => (
        <div className="alert alert-success" style={{ display: success ? '' : 'none' }}>
            {success}
        </div>
    );
    
    const createBlogForm = ()=>{
        return(
            <form onSubmit={publishBlog}>
            <div className="form-group">
                <label className="text-muted">Title</label>
                <input type="text" className="form-control" value={title} onChange={handleChanges('title')} />
            </div>

            <div className="form-group">
                <ReactQuill
                    modules={CreateBlog.modules}
                    formats={CreateBlog.formats}
                    value={body}
                    placeholder="Write something amazing..."
                    onChange={handleBody}
                />
            </div>

            <div>
                <button type="submit" className="btn btn-primary">
                    Publish
                </button>
            </div>
        </form>
        )
    }
    
    return(
        <div className = 'container-fluid pb-5'>
            <div className = 'row'>
                <div className = "col-md-8">
                    {createBlogForm()}
                    <div className = 'pt-3'>
                        {showError()}
                        {showSuccess()}
                    </div>
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

CreateBlog.modules = {
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
 
CreateBlog.formats = [
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

export default withRouter(CreateBlog);