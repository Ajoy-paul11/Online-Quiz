import React from "react";
// import {onlineTest} from "../../public/onlineTest.png"

function HeroSection() {
  return (
    <div className=" bg-[#202829]">
      <div className=" h-screen bg-[url('../../onlineTest.png')] opacity-20 lg:opacity-100 bg-no-repeat object-cover bg-center lg:bg-right"></div>
      <div className=" absolute top-[45%] left-[5%] text-[#FFFFF0] lg:w-1/2">
        <h1 className="text-5xl  font-bold text-left mb-8">
          Challenge Your Mind, <br className=" hidden lg:block" /> Expand Your
          Knowledge.
        </h1>
        <h3 className=" text-2xl font-semibold">
          Dive into a world of quizzes tailored to every interest and expertise
          level.
        </h3>
      </div>
    </div>
  );
}

export default HeroSection;
