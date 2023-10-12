import React, { useEffect, useState } from "react";
import LayoutAuthentication from "../layout/LayoutAuthentication";
import { Input } from "../component/input";
import { Label } from "../component/label";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";

const schema = yup
  .object()
  .shape({
    name: yup.string().required("Please enter your Fullname"),
    email: yup
      .string()
      .required("Please enter your Email")
      .email("Must be a valid Email"),
    // email: yup.string().email("Must be a valid Email"),
    pass: yup
      .string()
      .required("Please enter your Password")
      .min(8, "Please enter pass more than 8 characters"),
    agree: yup
      .boolean()
      .test(
        "agree",
        "Must be agree with our policy",
        (value) => value === true
      ),
    // .when("pass", (value) => {
    //   return value
    //     ? yup.string().min(8, "Please enter pass more than 8 characters")
    //     : yup.string();
    // }),
  })
  .required();

const SignupPage = () => {
  const [dataLogin, setDataLogin] = useState("");
  console.log("✌️dataLogin --->", dataLogin);
  useEffect(() => {
    axios
      .post("http://localhost:8080/api/user/signup", dataLogin)
      .then((response) => {
        console.log("✌️succes");
      })
      .catch((error) => {
        console.log("✌️error --->", error);
      });
  }, [dataLogin]);
  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({ resolver: yupResolver(schema) });
  const onSubmit = (data) => {
    console.log("✌️data --->", data);
    const { name, email, pass } = data;
    const dataSend = { name, email, password: pass };
    setDataLogin(dataSend);
  };
  console.log(errors);
  return (
    <LayoutAuthentication heading="SignUp">
      <div className="text-center lg:text-[14px] font-medium text-[12px] leading-[18px] lg:leading-[22px]">
        <span className="text-text3">Already have an account? </span>
        <u className="text-primary cursor-pointer">Sign in</u>
      </div>
      <div className="cursor-pointer flex justify-center w-[287px] items-center mx-auto h-[52px] lg:w-[430px] rounded-[10px] border border-strock lg:mt-[30px] mt-[25px]">
        <svg
          className="w-[25px] h-[24px]"
          viewBox="0 0 25 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M22.3055 10.0415L21.5 10.0415L21.5 10L12.5 10L12.5 14L18.1515 14C17.327 16.3285 15.1115 18 12.5 18C9.1865 18 6.5 15.3135 6.5 12C6.5 8.6865 9.1865 6 12.5 6C14.0295 6 15.421 6.577 16.4805 7.5195L19.309 4.691C17.523 3.0265 15.134 2 12.5 2C6.9775 2 2.5 6.4775 2.5 12C2.5 17.5225 6.9775 22 12.5 22C18.0225 22 22.5 17.5225 22.5 12C22.5 11.3295 22.431 10.675 22.3055 10.0415Z"
            fill="#FBC02D"
          />
          <path
            d="M3.65332 7.3455L6.93882 9.755C7.82782 7.554 9.98082 6 12.5003 6C14.0298 6 15.4213 6.577 16.4808 7.5195L19.3093 4.691C17.5233 3.0265 15.1343 2 12.5003 2C8.65932 2 5.32832 4.1685 3.65332 7.3455Z"
            fill="#E53935"
          />
          <path
            d="M12.5002 22C15.0832 22 17.4302 21.0115 19.2047 19.404L16.1097 16.785C15.1057 17.5455 13.8577 18 12.5002 18C9.89916 18 7.69066 16.3415 6.85866 14.027L3.59766 16.5395C5.25266 19.778 8.61366 22 12.5002 22Z"
            fill="#4CAF50"
          />
          <path
            d="M22.3055 10.0415L22.2975 10L21.5 10L12.5 10L12.5 14L18.1515 14C17.7555 15.1185 17.036 16.083 16.108 16.7855C16.1085 16.785 16.109 16.785 16.1095 16.7845L19.2045 19.4035C18.9855 19.6025 22.5 17 22.5 12C22.5 11.3295 22.431 10.675 22.3055 10.0415Z"
            fill="#1565C0"
          />
        </svg>
        <h2 className="text-[16px] font-semibold leading-[26px]">
          Sign up with google
        </h2>
      </div>
      <h2 className="cursor-pointer mt-[20px] text-center font-[400] text-[12px] leading-[18px] lg:text-[14px] lg:leading-[22px]">
        Or sign up with email
      </h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="lg:px-[40px] mt-[5px] lg:mt-[30px]"
      >
        <div className="flex flex-col">
          <Label htmlFor="name">Full Name</Label>
          <Input
            control={control}
            id="name"
            type="text"
            className={
              errors.name
                ? "placeholder-error cursor-pointer placeholder text-error inline-block outline-none border lg:w-[436px] lg:h-[52px] border-error rounded-[10px] w-[287px] h-[52px] px-[25px] py-[15px]"
                : "cursor-pointer inline-block outline-none border lg:w-[436px] lg:h-[52px] border-strock rounded-[10px] w-[287px] h-[52px] px-[25px] py-[15px]"
            }
            placeholder={
              errors?.pass?.message ? errors?.pass?.message : "Join Henry"
            }
          ></Input>
        </div>
        <div className="flex flex-col ">
          <Label htmlFor="email">Email</Label>
          <Input
            control={control}
            id="email"
            type="email"
            className={
              errors.name
                ? "placeholder-error cursor-pointer text-error inline-block outline-none border lg:w-[436px] lg:h-[52px] border-error rounded-[10px] w-[287px] h-[52px] px-[25px] py-[15px]"
                : "cursor-pointer inline-block outline-none border lg:w-[436px] lg:h-[52px] border-strock rounded-[10px] w-[287px] h-[52px] px-[25px] py-[15px]"
            }
            placeholder={
              errors?.pass?.message
                ? errors?.pass?.message
                : "example@gmail.com"
            }
          ></Input>
        </div>
        <div className="flex flex-col ">
          <Label htmlFor="pass">Password</Label>
          <Input
            control={control}
            id="pass"
            type="password"
            className={
              errors.name
                ? "placeholder-error cursor-pointer text-error inline-block outline-none border lg:w-[436px] lg:h-[52px] border-error rounded-[10px] w-[287px] h-[52px] px-[25px] py-[15px]"
                : "cursor-pointer inline-block outline-none border lg:w-[436px] lg:h-[52px] border-strock rounded-[10px] w-[287px] h-[52px] px-[25px] py-[15px]"
            }
            placeholder={
              errors?.pass?.message
                ? errors?.pass?.message
                : "Create a password"
            }
          ></Input>
        </div>
        <div className="flex  mt-[25px]">
          <Input
            control={control}
            id="agree"
            type="checkbox"
            className=" mr-[20px] inline-block outline-none border border-strock rounded-[10px] w-[20px] h-[20px]"
          ></Input>
          <span className="text-[12px] leading[18px] text-[400] pr-[20px]">
            I agree to the{" "}
            <span className="text-secondary cursor-pointer">Tearms of Use</span>{" "}
            and have read and understand the
            <span className="text-secondary cursor-pointer">
              {" "}
              Privacy policy
            </span>
            .
          </span>
        </div>
        {errors?.agree?.message && (
          <div className="text-error text-[14px] mt-[5px]">
            {errors?.agree?.message}
          </div>
        )}
        <button
          type="submit"
          className="bg-primary w-[287px] h-[52px] lg:w-[436px] lg:h-[52px] text-white rounded-[10px] leading-[26px] text-[16px] text-[600] mt-[25px]"
        >
          Create my account
        </button>
      </form>
    </LayoutAuthentication>
  );
};

export default SignupPage;
