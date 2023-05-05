
const userModel = require('../model/userModel')
//get all registered admins
const registeredAdminsController = async(req,res) =>{
    try {
        let role = 1
        const admins = await userModel.find({role:role})
        if(!admins){
            return res.status(200).send({
                success:false,
                message:"No Registered Admins Found"
                
            })
        }
        res.status(200).send({
            success:true,
            admins
        })
    } catch (error) {
        console.log(error);
        res.status(404).send({
            success:false,
            message:"Error while getting all registered Admins",
            error
        })
        
    }
}

//delete admins
const deleteAdminController = async(req,res) =>{
    try {
        const {id} = req.params
        await userModel.findByIdAndDelete(id)
        res.status(200).send({
            success:true,
            message:"Successfully Deleted Admin"
        })
    } catch (error) {
        res.status(404).send({
            success:false,
            message:"While error delete admin",
            error
        })
        
    }
}



module.exports = {registeredAdminsController,deleteAdminController}