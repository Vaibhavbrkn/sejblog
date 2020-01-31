const express = require('express')
const router = express.Router()

const {create ,list,read,remove }  = require('../controllers/tag')
const {requireSignin , adminMiddleware} = require('../controllers/auth')


const{runValidation} = require('../validators')
const {CreateTagValidator} = require('../validators/tag')

router.post('/Tag' , CreateTagValidator , runValidation, requireSignin, adminMiddleware, create,)
router.get('/Tags' , list)
router.get('/tag/:slug' , read)
router.delete('/tag/:slug' , requireSignin, adminMiddleware,remove)

module.exports = router;