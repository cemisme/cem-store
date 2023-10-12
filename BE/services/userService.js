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
    try {
      const checkUser = await User.findOne({
        email: email,
      });
<<<<<<< HEAD
<<<<<<< HEAD
      if(checkUser===null)
      {
=======
      if (checkUser === null) {
>>>>>>> 95e473ad5280767326f040c2bcd11060177501a1
=======
      if (checkUser === null) {
>>>>>>> 95e473ad5280767326f040c2bcd11060177501a1
        resolve({
          status: "ERR",
          message: "User or Pass incorrect",
        });
      }
<<<<<<< HEAD
<<<<<<< HEAD
      console.log("✌️checkUser --->", checkUser);
      const salt = bcrypt.genSaltSync(10);
      const hashedPassword = bcrypt.hashSync(password, salt);
      const plainPassword = bcrypt.compareSync(
        checkUser.password,
        hashedPassword
      );
=======
      const plainPassword = await bcrypt.compare(password, checkUser.password);
>>>>>>> 95e473ad5280767326f040c2bcd11060177501a1
=======
      const plainPassword = await bcrypt.compare(password, checkUser.password);
>>>>>>> 95e473ad5280767326f040c2bcd11060177501a1
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
