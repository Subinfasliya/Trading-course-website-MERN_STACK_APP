const videoModel = require("../model/videoModel")
const fs = require('fs')
const createVideoController = async (req, res) => {

   try {
       const {name,description} = req.fields
       const {video} = req.files
      
      switch (true) {
         case !name:
            return res.status(500).send({ error: 'Video Name is Required' })
         case !description:
            return res.status(500).send({ error: "Description is Required" })
         case  !video :
            return res.status(500).send({error:"Video is required"})
      }

      const details = new videoModel({ ...req.fields, name: name })

      if (video) {
         details.video.data = fs.readFileSync(video.path)
         details.video.contentType = video.type

      }
      await details.save()
      res.status(201).send({
         success: true,
         message: "Successfully Added Video",
         details

      })

   } catch (error) {
      res.status(404).send({
         success: false,
         message: "Error while creating new video",
         error
      })
   }
}

//get allvideos
const getAllVideosController = async (req, res) => {
   try {
      const videos = await videoModel.find({}).select("-video").limit(12).sort({ createdAt: -1 })
      res.status(200).send({
         success: true,
         message: "All Online videos",
         videos
      })
   } catch (error) {
      console.log(error);
      res.status(500).send({
         success: false,
         message: "Error while getting all videos",
         error
      })
   }
}

//get video
const courseVideoController = async (req, res) => {
   try {
      const videos = await videoModel.findById(req.params.id).select("video")
      if (videos.video.data) {
         res.set('Content-type', videos.video.contentType)
         return res.status(200).send(videos.video.data)
      }
   } catch (error) {
      console.log(error);
      res.status(500).send({
         success: false,
         message: "Error while getting course videos",
         error
      })

   }

}

//delete videoController
const deleteVideoController = async (req, res) => {
   try {
      await videoModel.findByIdAndDelete(req.params.id).select("-video")
      res.status(200).send({
         success: true,
         message: "Video deleted Successfully"
      })
   } catch (error) {
      console.log(error);
      res.status(500).send({
         success: false,
         message: "Error while delete video",
         error
      })

   }
}

//update video
const updateVideoController = async (req, res) => {

   try {
      const { name, description } = req.fields

      const { video } = req.files

      switch (true) {
         case !name:
            return res.status(500).send({ error: 'Video Name is Required' })
         case !description:
            return res.status(500).send({ error: "Description is Required" })
         case video && video.size > 1073741824:
            return res.status(500).send({ error: "Video is required and should be less than 1mb" })
      }

      const details = await videoModel.findByIdAndUpdate(req.params.id,
         {...req.fields, name:name}, {new:true})

      if (video) {
         details.video.data = fs.readFileSync(video.path)
         details.video.contentType = video.type

      }
      await details.save()
      res.status(201).send({
         success: true,
         message: "Successfully updated Video",
         details

      })

   } catch (error) {
      res.status(404).send({
         success: false,
         message: "Error while update video",
         error
      })
   }
}


module.exports = {
   createVideoController,
   getAllVideosController,
   courseVideoController, 
   deleteVideoController,
   updateVideoController,
  
  
}