
const userModel = require("../model/userModel");
const videoModel = require("../model/videoModel");

//Activate students
const activateStudentController = async (req,res) =>{
    try {
         let status = 'Active'
         
        const {studentId} = req.body

        

        const activeUser = await userModel.findByIdAndUpdate(studentId,{status:status})
       
        if(activeUser.status === 'Active'){
          return res.status(200).send({
            success:false,
            message:"This Student is Already Activated"
          })
        }
        res.status(200).send({
            success:true,
            message:"Successfully Activated Student",
            activeUser
        })
          
        
    } catch (error) {
      console.log(error);
      res.status(404).send({
        success:false,
        message:"Error Activating Student",
        error
      })        
    }
}

//UnActivate students
const unActivateStudentController = async (req,res) =>{
    try {
         let status = 'UnActive'
         
        const {studentId} = req.body

        

        const unActiveUser = await userModel.findByIdAndUpdate(studentId,{status:status})
       
        if(unActiveUser.status === 'UnActive'){
          return res.status(200).send({
            success:false,
            message:"Already Un Activated"
          })
        }
        res.status(200).send({
            success:true,
            message:"Successfully Un-Activated Student",
            unActiveUser
        })
          
        
    } catch (error) {
      console.log(error);
      res.status(404).send({
        success:false,
        message:"Error UnActivating Student",
        error
      })        
    }
}

const getAllVideos = async (req,res) => {
  try {
    
    
    const activeStudent = await userModel.findById(req.user._id) 

    
        
    if(activeStudent.status === 'Active'){
      const videos = await videoModel.find({}).select("-video").limit(12).sort({ createdAt: -1 })
        return res.status(200).send({
          success:true,
          videos
        })
    }else{
      res.status(201).send({
        success:false,
        message:"Please Check your Registration Status and Confirm Activate"
      })
    }
  } catch (error) {
    console.log(error);
    res.status(404).send({
      success:false,
      message:'while getting active person video',
      error
    })
    
  }
}

module.exports = {activateStudentController,
    unActivateStudentController,
    getAllVideos}