"use client";
import { userContext } from "../auth/UserContext";
import { Dropdown, Avatar } from "flowbite-react";
import { useRouter } from "next-nprogress-bar";
import { useContext } from "react";

const Header = () => {
  const { curUser, setCurUser } = useContext(userContext);
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("token");
    setCurUser!(null);
  };
  return (
    <div className="h-12 z-10 bg-zinc-800 opacity-65 hover:opacity-100 text-white flex py-3 px-8">
      <div className="basis-1/2 flex gap-8">
        <button
          onClick={() => {
            router.push("/");
          }}
          className="text-white font-normal cursor-pointer text-lg"
        >
          Home
        </button>
        <button
          onClick={() => {
            router.push("/globe");
          }}
          className="text-white font-normal cursor-pointer text-lg"
        >
          Globe
        </button>
      </div>
      <div className="basis-1/2 flex justify-end">
        {curUser ? (
          <div onClick={() => {}} className="cursor-pointer">
            <Dropdown
              label=""
              size="sm"
              dismissOnClick={false}
              renderTrigger={() => (
                <span>
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
            className="text-white font-normal cursor-pointer text-lg"
          >
            Login
          </button>
        )}
      </div>
    </div>
  );
};

export default Header;
