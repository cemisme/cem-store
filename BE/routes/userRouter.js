const express=require("express")
const router=express.Router()
const {createUser, loginUser,updateUser}=require("../controllers/userController")

router.post("/signup",createUser)
router.post("/login",loginUser)
router.put("/update-user/:id",updateUser)


module.exports=router