const User = require("../models/UserModel");
const bcrypt = require("bcrypt");
const { genneralAccessToken, genneralRefreshToken } = require("./jwtService");

const createUser = (newUser) => {
  return new Promise(async (resolve, reject) => {
    const { name, email, password } = newUser;
    try {
      const hash = bcrypt.hashSync(password, 10);
      const createdUser = await User.create({
        name,
        email,
        password: hash,
      });
      //   const checkEmail = await User.findOne({
      //     email: email,
      //   });
      //   if (checkEmail !== null) {
      //     resolve({
      //       status: "OK",
      //       message: "The Email is already",
      //     });
      //   }
      if (createdUser) {
        resolve({
          status: "OK",
          message: "SUCCESS",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};
const loginUser = (user) => {
  return new Promise(async (resolve, reject) => {
    const { email, password } = user;
    try {
      const checkUser = await User.findOne({
        email: email,
      });
      const comparePass = bcrypt.compareSync(password, checkUser?.password); // so sánh pass mã hóa với pass chưa mã hóa
      if (checkUser === null) {
        resolve({
          status: "ERR",
          message: "Acount is not defined",
        });
      }
      if (!comparePass) {
        resolve({
          status: "ERR",
          message: "Password or User incorrect",
        });
      }
      const access_token = await genneralAccessToken({
        id: checkUser.id,
        isAdmin: checkUser.isAdmin,
      });
      const refresh_token = await genneralRefreshToken({
        id: checkUser.id,
        isAdmin: checkUser.isAdmin,
      });
      resolve({
        status: "OK",
        message: "SUCCESS",
        access_token: access_token,
        refresh_token: refresh_token,
      });
    } catch (e) {
      reject(e);
    }
  });
};
const updateUser = (id, name) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkUser = await User.findOne({
        _id: id,
      });
      console.log("checkUser", checkUser)
    //   if (checkUser === null) {
    //     resolve({
    //       status: "ERR",
    //       message: "Acount is not defined",
    //     });
    //   }
      const updateUser = await User.findByIdAndUpdate(id, name,{new:true});
      console.log(updateUser);
      // const access_token = await genneralAccessToken({
      //   id: checkUser.id,
      //   isAdmin: checkUser.isAdmin,
      // });
      // const refresh_token = await genneralRefreshToken({
      //   id: checkUser.id,
      //   isAdmin: checkUser.isAdmin,
      // });
      resolve({
        status: "OK",
        message: "SUCCESS",
      });
    } catch (e) {
      reject(e);
    }
  });
};
const deleteUser=(id)=>{
return new Promise(async(re))
}

module.exports = {
  createUser,
  loginUser,
  updateUser,
};
