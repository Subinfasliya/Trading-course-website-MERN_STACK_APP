const express = require('express');
const { requireSignIn, isAdmin } = require('../middleWears/middleWear');
const { createVideoController, getAllVideosController, courseVideoController, deleteVideoController, updateVideoController, getAllMedia, createNewMedia } = require('../controllers/VideoController')
const formidable = require('express-formidable');
const { getAllVideos } = require('../controllers/activeStudentsController');
const multer = require('multer')
const fs = require('fs')
const path = require('path')


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        if (!fs.existsSync('public')){
            fs.mkdirSync('public')
        }
        if(!fs.existsSync('public/videos')){
            fs.mkdirSync('public/videos')
        }

        cb(null,'public/videos');
    },
    filename:function(req,file,cb){
        cb(null,Date.now() + file.originalname)
    }
})


const upload = multer({
    storage: storage,
    fileFilter:function(req,file,cb){
        var ext = path.extname(file.originalname)

        if(ext !== '.mkv' && ext !== '.mp4'){
            return cb(new Error("Only video are allowed"))
        }
        cb(null,true)
    }
})





const router = express.Router();

//Upload videos router

router.post('/add-video', requireSignIn, isAdmin, formidable(), createVideoController)

//Update video
router.put('/update-video/:id', requireSignIn, isAdmin, formidable(), updateVideoController)

//get all videos
router.get('/get-video', getAllVideosController)

//get course video
router.get('/course-video/:id', courseVideoController)

//delete video
router.delete('/delete-video/:id', deleteVideoController)

//get user video
router.get('/uservideos', requireSignIn, getAllVideos)



module.exports = router;