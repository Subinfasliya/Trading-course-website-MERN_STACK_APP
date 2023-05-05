const express = require('express');
const { registerCotroller, loginController, testController, registeredStudentsController, deleteUserController, updateProfileController, resetPasswordController, forgetPasswordController, getUserStatusController } = require('../controllers/userController');
const { requireSignIn, isAdmin } = require('../middleWears/middleWear');
const { activateStudentController, unActivateStudentController } = require('../controllers/activeStudentsController');
const { registeredAdminsController, deleteAdminController } = require('../controllers/AdminController');

const router = express.Router();

//routes

//Register post method
router.post('/register', registerCotroller);

//login post method
router.post('/login', loginController)

//forget password
router.post('/forget-password',forgetPasswordController)


//test routes
router.get('/test', requireSignIn, isAdmin, testController)

// Protected User route auth
router.get('/user-auth', requireSignIn, (req, res) => {
    res.status(200).send({ ok: true })
})
// Protected Admin route auth
router.get('/admin-auth', requireSignIn, isAdmin, (req, res) => {
    res.status(200).send({ ok: true })
})


//update profile
router.put('/profile', requireSignIn,updateProfileController)
//ADMIN ROUTES

//get all registered students
router.get('/get-all-students', requireSignIn, isAdmin, registeredStudentsController)

//delete user
router.delete('/delete-user/:id', requireSignIn, isAdmin, deleteUserController)

//delete admin
router.delete('/delete-admin/:id', requireSignIn, isAdmin, deleteAdminController)

//Activate student
router.post('/activate', requireSignIn, isAdmin, activateStudentController)


//Un-Activate student
router.post('/unactivate', requireSignIn, isAdmin, unActivateStudentController)
//registered Admins
router.get('/get-all-admins',requireSignIn,isAdmin,registeredAdminsController)


module.exports = router;