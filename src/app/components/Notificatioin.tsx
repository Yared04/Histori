import Image from "next/image";
import React,{useEffect} from "react";
import trophyIcon from "../../../public/trophy-icon.svg";
import shoutIcon from "../../../public/shout-icon.svg";
const Notificatioin = () => {
    useEffect(() => {
        const socket = new WebSocket('wss://echo.websocket.org');
    
        socket.onopen = () => {
          console.log('WebSocket is connected');
          socket.send('Hello Server!')
        };
    
        socket.onmessage = (event) => {
          console.log('Received data from server:', event.data);
          // Here you can handle the incoming notification data
        };
        socket.onerror = (error) => {
          console.log('WebSocket error:', error);
        };
    
        socket.onclose = () => {
          console.log('WebSocket is closed');
        };    
        return () => {
          socket.close();
        };
      }, []);
  return (
    <div className="bg-white font-semibold font-semiboldtext-md text-md  max-w-[350px]">
      <div>
        <p className=" px-3  py-4 border-b shadow">Notification</p>
        <div className="flex font-medium gap-3  px-3  py-4 border-b shadow">
          <div className=" relative w-14 h-14">
            <Image fill alt="notification list icon" src={trophyIcon} />
          </div>
          <div>
            <p>
              Nice Job. You earned a new badge. Keep up the good work and
            </p>
            <p className="text-sm py-2 text-gray-400">15 days ago</p>
          </div>
          <button className="flex gap-[.1rem]">
            <div className="w-1 h-1 rounded-full bg-gray-400"></div>
            <div className="w-1 h-1 rounded-full bg-gray-400"></div>
            <div className="w-1 h-1 rounded-full bg-gray-400"></div>
          </button>
        </div>

        <div className="flex font-medium gap-3  px-3  py-4 border-b shadow">
          <div className=" relative w-14 h-14">
            <Image fill alt="notification list icon" src={shoutIcon} />
          </div>
          <div>
            <p>
              keep learning history, no matter where you work, Add a personal
              email to your account.
            </p>
            <p className="text-sm py-2 text-gray-400">15 days ago</p>
          </div>
          <button className="flex gap-[.1rem]">
            <div className="w-1 h-1 rounded-full bg-gray-400"></div>
            <div className="w-1 h-1 rounded-full bg-gray-400"></div>
            <div className="w-1 h-1 rounded-full bg-gray-400"></div>
          </button>
        </div>
        <p className=" px-3  py-4 text-blue-500 w-fit mx-auto">View All Notification</p>

      </div>
    </div>
  );
};

export default Notificatioin;
