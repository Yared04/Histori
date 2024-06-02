// components/ClientComponent.tsx
"use client";

import React, { useContext } from "react";
import { userContext } from "../auth/UserContext";
import { Dropdown, Avatar } from "flowbite-react";
import { useRouter } from "next/navigation";
import dynamic from 'next/dynamic';
import TimeControl from "../globe/timeline/TimeControl";
import TimeSlider from "../globe/timeline/TimeSlider";

const Earth = dynamic(() => import('../globe/Earth'), { ssr: false });

interface ClientComponentProps {
  children: React.ReactNode;
}

const ClientComponent: React.FC<ClientComponentProps> = ({ children }) => {
  const { curUser, setCurUser } = useContext(userContext);
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("token");
    setCurUser!(null);
  };

  return (
    <div className="relative">
      <div style={{ marginLeft: "-25%", marginTop: "-0.5%" }}>
        <Earth />
      </div>
      <div className="absolute right-0 top-0 bg-zinc-800 pt-8 px-8 rounded-lg w-[46vw] h-[100vh] overflow-y-auto">
        {children}
      </div>
      <div className="absolute bottom-0 left-0 flex flex-col">
        <div className="w-full flex justify-start p-2">
          <TimeControl />
        </div>
        <div className="w-[28rem] h-14 bg-transparent flex items-center justify-between">
          <TimeSlider />
          {/* <div className="px-3">
            <TimeLapse />
          </div> */}
        </div>
      </div>
      {curUser ? (
        <div
          onClick={() => {}}
          className="cursor-pointer absolute top-7 left-5"
        >
          <Dropdown
            label=""
            size="sm"
            dismissOnClick={false}
            renderTrigger={() => (
              <span>
                <Avatar
                  placeholderInitials={curUser?.email?.charAt(0).toUpperCase()}
                  rounded
                />
              </span>
            )}
          >
            <Dropdown.Item className="" onClick={() => {}}>
              Profile
            </Dropdown.Item>
            <Dropdown.Item className="text-red-600" onClick={handleLogout}>
              Logout
            </Dropdown.Item>
          </Dropdown>
        </div>
      ) : (
        <button
          onClick={() => {
            router.push("/login");
          }}
          className="text-white font-normal cursor-pointer absolute top-7 left-5 text-xl"
        >
          {" "}
          Login
        </button>
      )}
    </div>
  );
};

export default ClientComponent;
