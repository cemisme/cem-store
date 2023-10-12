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
      if(checkUser===null)
      {
        resolve({
          status: "ERR",
          message: "User or Pass incorrect",
        });
      }
      console.log("✌️checkUser --->", checkUser);
      const salt = bcrypt.genSaltSync(10);
      const hashedPassword = bcrypt.hashSync(password, salt);
      const plainPassword = bcrypt.compareSync(
        checkUser.password,
        hashedPassword
      );
      console.log("✌️plainPassword --->", plainPassword);
      if (!plainPassword) {
        resolve({
          status: "ERR",
          message: "User or Pass incorrect",
        });
      }
      if (checkUser === null) {
        resolve({
          status: "ERR",
          message: "Acount is not defined",
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
      console.log("checkUser", checkUser);
      //   if (checkUser === null) {
      //     resolve({
      //       status: "ERR",
      //       message: "Acount is not defined",
      //     });
      //   }
      const updateUser = await User.findByIdAndUpdate(id, name, { new: true });
      console.log(updateUser);
      resolve({
        status: "OK",
        message: "SUCCESS",
      });
    } catch (e) {
      reject(e);
    }
  });
};
const deleteUser = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      await User.findOneAndDelete(id, { new: true });
      resolve({
        status: "OK",
        message: "SUCCESS",
      });
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  createUser,
  loginUser,
  updateUser,
  deleteUser,
};
