
const { hashPassword, comparePassword } = require('../helpers/authHelper.js');




const userModel = require('../model/userModel');
const JWT = require('jsonwebtoken');

const registerCotroller = async (req, res) => {
    try {

        const { name, email, mobile, password, answer, course } = req.body
        //validation
        if (!name) {
            return res.send({ message: 'Name is required' })
        }
        if (!email) {
            return res.send({ message: 'Email is required' })
        }
        if (!mobile) {
            return res.send({ message: 'mobile is required' })
        }

        if (!password) {
            return res.send({ message: 'password is required' })
        }

        if (!course) {
            return res.send({ message: 'Course details is Required' })
        }
        if (!answer) {
            return res.send({ message: "Please Enter Your Favourite Player Name" })
        }

        if (password && password.length < 6) {
            return res.send({ message: 'Password is required and 6 character long' })
        }
        // checking existingUser
        const existingUser = await userModel.findOne({ email: email })

        if (existingUser) {
            return res.status(200).send({
                success: false,
                message: 'Already registered please login'
            })
        }

        //password to bcrypt
        const hashedPassword = await hashPassword(password)

        //register user
        const user = await new userModel({ name, email, mobile, password: hashedPassword, answer, course }).save()

        res.status(201).send({
            success: true,
            message: 'Successfully Registered',
            user
        })

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in Registeration",
            error
        })

    }
};

//login controller
const loginController = async (req, res) => {
    try {
        const { email, password } = req.body

        //validation
        if (!email || !password) {
            return res.status(404).send({
                success: false,
                message: "Invalid Email or Password"
            })

        }


        //check user 
        const user = await userModel.findOne({ email: email })

        if (!user) {
            return res.status(200).send({
                success: false,
                message: "Email is not Registered"
            })
        }
        //matching
        const match = await comparePassword(password, user.password)

        if (!match) {
            return res.status(200).send({
                success: false,
                message: "Invalid Password "
            })

        }

        //token
        const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "7d"
        })
        res.status(200).send({
            success: true,
            message: "Login Successfully",
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                mobile: user.mobile,
                course: user.course,
                role: user.role
            },
            token
        })

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in Login",
            error
        })

    }
};

//forget Password
const forgetPasswordController = async (req, res) => {

    try {
        const { email, answer, newPassword } = req.body

        if (!email) {
            res.status(400).send({
                message: "Email is required",

            })
        }
        if (!answer) {
            res.status(400).send({
                message: "Answer is required"
            })
        }
        if (newPassword.length < 6) {
            res.status(400).send({
                message: "Enter Password less than 6 Characters"
            })
        }
        if (!newPassword) {
            res.status(400).send({
                message: "New Password is Required"
            })
        }
        // check
        const user = await userModel.findOne({ email: email, answer: answer })

        //Validation
        if (!user) {
            return res.status(201).send({
                success: false,
                message: "Wrong Email or Answer"
            })
        }
        const hashed = await hashPassword(newPassword)
        await userModel.findByIdAndUpdate(user._id, { password: hashed })
        res.status(200).send({
            success: true,
            message: "Password Reset Successfully"
        })

    } catch (error) {

        console.log(error);
        res.status(500).send({
            success: false,
            message: "Something went wrong",
            error
        })

    }
}



//test controller
const testController = (req, res) => {
    try {
        res.send("Protected Route")
    } catch (error) {
        console.log(error);
        res.send({ error })

    }
}

//get all registered students
const registeredStudentsController = async (req, res) => {
    try {
        let role = 0
        const students = await userModel.find({ role: role })
        if (!students) {
            return res.status(200).send({
                success: false,
                message: "No Registered Students Found"

            })
        }
        res.status(200).send({
            success: true,
            students
        })
    } catch (error) {
        console.log(error);
        res.status(404).send({
            success: false,
            message: "Error while getting all registered Students",
            error
        })

    }
}

//delete user
const deleteUserController = async (req, res) => {
    try {
        const { id } = req.params
        await userModel.findByIdAndDelete(id)
        res.status(200).send({
            success: true,
            message: "Successfully Deleted Student"
        })
    } catch (error) {
        res.status(404).send({
            success: false,
            message: "While error delete user",
            error
        })

    }
}

const updateProfileController = async (req, res) => {
    try {
        const { name, email, password, mobile } = req.body
        const user = await userModel.findById(req.user._id)
        //password checking
        if (password && password.length < 6) {
            return res.json({ error: 'Password is required and 6 character long' })
        }
        const hashedPassword = password ? await hashPassword(password) : undefined
        const updatedUser = await userModel.findByIdAndUpdate(req.user._id, {
            name: name || user.name,
            password: hashedPassword || user.password,
            mobile: mobile || user.mobile,
            email: email || user.email

        }, { new: true })
        res.status(200).send({
            success: true,
            message: "Profile updated successfully ",
            updatedUser

        })
    } catch (error) {
        console.log(error);
        res.status(400).send({
            success: false,
            message: "Error while updating profile",
            error
        })

    }
};



module.exports = {
    registerCotroller,
    loginController,
    testController,
    registeredStudentsController,
    deleteUserController,
    updateProfileController,
    forgetPasswordController,
    

}