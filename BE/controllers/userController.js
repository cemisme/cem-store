const userService = require("../services/userService");

const createUser = async (req, res) => {
  try {
    const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const { name, email, password } = req.body;
    const isCheckEmail = regex.test(email);
    if (!name || !email || !password) {
      return res.status(200).json({
        status: "ERR",
        message: "The input is required",
      });
    }
    if (isCheckEmail === false) {
      return res.status(200).json({
        status: "ERR",
        message: "The input is not a Email",
      });
    }
    if (password.trim().length <= 7) {
      return res.status(200).json({
        status: "ERR",
        message: "Password must be more than 7 characters",
      });
    }
    if (password.includes(" ") && !password.trim().lenght <= 7) {
      return res.status(200).json({
        status: "ERR",
        message: "Password does not contain spaces",
      });
    }
    const respone = await userService.createUser(req.body);
    return res.status(200).json(respone);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};
const loginUser = async (req, res) => {
  try {
    const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const { email, password } = req.body;
    const isCheckEmail = regex.test(email);
    if (!email || !password) {
      return res.status(200).json({
        status: "ERR",
        message: "The input is required",
      });
    }
    if (isCheckEmail === false) {
      return res.status(200).json({
        status: "ERR",
        message: "The input is not a Email",
      });
    }
    const respone = await userService.loginUser(req.body);
    return res.status(200).json(respone);
  } catch (error) {
    return res.status(404).json({
      message: error,
    });
  }
};
const updateUser = async (req, res) => {
  try {
    const id = req.params.id;
    const name = req.body;
    if (!name) {
      return res.status(200).json({
        status: "ERR",
        message: "The input is required",
      });
    }
    const respone = await userService.updateUser(id,name);
    return res.status(200).json(respone);
  } catch (error) {
    return res.status(404).json({
      message: error,
    });
  }
};
const deleteUser=async(req,res)=>{
 try{
  const id=res.params.id
  if(!id)
  {
    return res.status(200).json({
      status:"ERR",
      message:"ID not true"
    })
  }
  const respone=await userService.deleteUser(id)
  return res.status(200).json(respone)
 }catch(e){
  return res.status(404).json({
    message:e
  })
 }
}
module.exports = {
  createUser,
  loginUser,
  updateUser,
  deleteUser
};
