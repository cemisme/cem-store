const User = require("../models/UserModel");
const bcrypt = require("bcrypt");
const { genneralAccessToken, genneralRefreshToken } = require("./jwtService");

const createUser = (newUser) => {
  return new Promise(async (resolve, reject) => {
    const { name, email, password } = newUser;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      resolve({
        status: "ERROR",
        message: "Email already exists",
      });
    }
    try {
      const hash = bcrypt.hashSync(password, 10);
      const createdUser = await User.create({
        name,
        email,
        password: hash,
      });
      if (createdUser) {
        resolve({
          status: "OK",
          message: "Create User Success",
        });
        console.log(newUser);
      }
    } catch (e) {
      reject(e);
    }
  });
};
const loginUser = (user) => {
  return new Promise(async (resolve, reject) => {
    const { email, password } = user;
    console.log("✌️password --->", password);
    try {
      const checkUser = await User.findOne({
        email: email,
      });
      if (checkUser === null) {
        resolve({
          status: "ERR",
          message: "User or Pass incorrect",
        });
      }
      const plainPassword = await bcrypt.compare(password, checkUser.password);
      console.log("✌️plainPassword --->", plainPassword);
      if (!plainPassword) {
        resolve({
          status: "ERR",
          message: "User or Pass incorrect",
        });
      }
      console.log("✌️plainPassword --->", plainPassword);
      if (!plainPassword) {
        resolve({
          status: "ERR",
          message: "User or Pass incorrect",
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
        message: "Login Success",
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
      const deleteUser = await User.findOneAndDelete(id);
      console.log(deleteUser);
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
