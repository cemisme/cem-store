const express=require("express")
const router=express.Router()
const {createUser, loginUser,updateUser,deleteUser}=require("../controllers/userController")

router.post("/signup",createUser)
router.post("/login",loginUser)
router.put("/update-user/:id",updateUser)
router.delete("/delete-user/:id",deleteUser)

module.exports=router