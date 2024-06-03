import React from "react";
import ProfileCard from "../components/ProfileCard";
import ProfileImageInput from "../components/ProfileImageInput";
import ClientComponent from "../components/ClientComponent";

const page = () => {
  return (<ClientComponent>
    <div className="text-white">
      <div className="w-fit mx-auto text-center">
        <ProfileImageInput />
        <p className=" text-2xl font-bold">Natnael Tadele</p>
        <p>natnaeltadele@gmail.com</p>
        <p>+251961088592</p>
        <p className="text-[2rem] font-bold text-[#CFC600]">500xp</p>
      </div>
      <div>
        <p
          title="After becoming a contributor you will be able to suggest edit to articles"
          className="text-right"
        >
          Become a Contributor?
        </p>
      </div>
      <div className="flex justify-between py-3 ">
        <div>
          <p className="text-2xl font-semibold">My Reports</p>
          <div className="flex gap-3">
            <p className=" ">Map</p>
            <div className="border border-black"></div>
            <p>History</p>
          </div>
        </div>
        <div>
          <p className="text-2xl font-semibold">My Review</p>
          <div className="flex gap-3">
            <p>Map</p>
            <div className="border border-black"></div>
            <p>History</p>
          </div>
        </div>
      </div>
      <ProfileCard />
    </div>
    </ClientComponent>
  );
};

export default page;
