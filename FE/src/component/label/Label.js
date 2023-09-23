import React from "react";

const Label = ({ children, htmlFor }) => {
  return (
    <label
      htmlFor={htmlFor}
      className="cursor-pointer inline-block mb-[10px] mt-[15px]  text-[14px] leading-[22px] font-[500]"
    >
      {children}
    </label>
  );
};

export default Label;
