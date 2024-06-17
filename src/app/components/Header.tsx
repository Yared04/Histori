"use client";
import { userContext } from "../auth/UserContext";
import { Dropdown, Avatar } from "flowbite-react";
import { useRouter } from "next-nprogress-bar";
import Image from "next/image";
import { useContext, useState } from "react";
import { IoMdLogIn } from "react-icons/io";
import notificationIcon from "../../../public/notification-bell.svg";
import Notification from "./Notification";
const Header = () => {
  const { curUser, setCurUser } = useContext(userContext);
  const [displayNotification, setDisplayNotification] = useState(false);
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("token");
    setCurUser!(null);
  };
  return (
    <div className="font-normal sticky top-0 text-sm cursor-pointer h-10 z-10 bg-gray-50 opacity-65 hover:opacity-95 flex py-1 px-8">
      <div className="basis-1/3">
        <h1
          onClick={() => {
            router.push("/");
          }}
          className="cursor-pointer font-semibold text-2xl"
        >
          HISTOR<span className="text-blue-600">I</span>
        </h1>
      </div>
      <div className="basis-1/3 flex justify-end gap-8">
        <button
          onClick={() => {
            router.push("/globe");
          }}
        >
          Globe
        </button>
        {curUser && curUser.role === "contributor" && (
          <button
            onClick={() => {
              router.push("/articles");
            }}
          >
            Contribute Article
          </button>
        )}
        {curUser && curUser.role === "contributor" && (
          <button
            onClick={() => {
              router.push("/globe/contribute/map");
            }}
          >
            Contribute Map
          </button>
        )}
        {curUser !== null && (
          <button
            onClick={() => {
              router.push("/guessFlag");
            }}
          >
            Guess Flag
          </button>
        )}
      </div>
      <div className="basis-1/3 flex item-center gap-2 justify-end">
        {curUser && <Notification setConfirm={setDisplayNotification} />}

        {curUser ? (
          <div onClick={() => {}} className="cursor-pointer pt-1">
            <Dropdown
              label=""
              size="sm"
              dismissOnClick={false}
              renderTrigger={() => (
                <span className="">
                  <Avatar
                    placeholderInitials={curUser?.email
                      ?.charAt(0)
                      .toUpperCase()}
                    size={"xs"}
                    rounded
                    bordered
                    color="purple"
                  />
                </span>
              )}
            >
              <Dropdown.Item
                className=""
                onClick={() => {
                  router.push("/profile");
                }}
              >
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
            className="font-normal cursor-pointer text-sm"
          >
            <div className="flex gap-0.5">
              <IoMdLogIn className="self-center" size={20} />
              <span>Login</span>
            </div>
          </button>
        )}
      </div>
    </div>
  );
};

export default Header;
