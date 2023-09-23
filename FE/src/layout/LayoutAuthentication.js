import React from "react";
import { Link } from "react-router-dom";

const LayoutAuthentication = (props) => {
  const { children, heading } = props;
  return (
    <div className="w-full min-h-screen bg-lite">
      <div className=" pl-[24px] pt-[24px] lg:pl-[40px] lg:pt-[40px]">
        <Link to="/">
          <img
            alt="logo"
            src="/Logo.png"
            className="inline-block object-contain h-[40px] w-[40px] rounded-lg lg:h-[52px] lg:w-[52px]"
          ></img>
        </Link>
      </div>

      <div className="bg-white w-[327px] h-[667px] lg:mx-auto lg:h-[774px] lg:w-[556px] mx-auto">
        <h1 className="text-center leading-[30px] font-semibold text-[18px] lg:text-[20px] pt-[50px]">
          {heading}
        </h1>
        <div className="ml-[20px]">{children}</div>
      </div>
    </div>
  );
};

export default LayoutAuthentication;
