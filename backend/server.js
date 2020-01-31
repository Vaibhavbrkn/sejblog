const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const mongoose = require('mongoose')
require('dotenv').config()


//bring routes
const blogRoutes = require('./routes/blog')
const authRoutes = require('./routes/auth')
const userRoutes = require('./routes/user')
const categoryRoutes = require('./routes/category')
const TagRoutes = require('./routes/tag')
const formRoutes = require('./routes/form')


//app
const app = express()


//database
mongoose.connect(process.env.DATABASE,{useNewUrlParser:true , useCreateIndex:true , useFindAndModify:false}).
then(()=>console.log('database connected'))

//middleware 
app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(cookieParser())

//cors
if(process.env.NODE_ENV == 'development'){
    app.use(cors({origin: `${process.env.CLIENT_URL}`}))
}


//routes middlewares
app.use(blogRoutes);
app.use(authRoutes);
app.use(userRoutes)
app.use(categoryRoutes);
app.use(TagRoutes)
app.use(formRoutes)

//port
const port = process.env.PORT || 8000
app.listen(port,()=>{
    console.log(`Server is running on port${port}`)
})