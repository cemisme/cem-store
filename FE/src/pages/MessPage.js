import React from "react";
import SideBarChat from "../modules/SideBarChat";

const MessPage = () => {
  return (
    <div className="flex">
      <SideBarChat></SideBarChat>
      <div className="bg-bgListChat w-[400px] h-screen">
        <h1 className="font-[800] leading-[48px] mt-[26px] ml-[20px] text-[24px]">
          Chats
        </h1>
      </div>
      <div className="bg-bgChatSideBar w-full h-screen">hi</div>
    </div>
  );
};

export default MessPage;
