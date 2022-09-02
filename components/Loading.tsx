import React from "react";
import { PropagateLoader } from "react-spinners";

function Loading() {
  return (
    <div className="bg-[#091b18] min-h-screen flex flex-col items-center justify-center">
      <div className="flex items-center space-x-2 mb-10">
        <img
          className="rounded-full h-20 w-20"
          src="https://i.imgur.com/4h7mAu7.png"
          alt=""
        />
        <h1 className="text-lg text-white font-bold">Loading Pietro Draw...</h1>
      </div>
      <PropagateLoader color="white" size={30} />
    </div>
  );
}

export default Loading;
