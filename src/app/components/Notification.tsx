import Image from "next/image";
import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import trophyIcon from "../../../public/trophy-icon.svg";
import shoutIcon from "../../../public/shout-icon.svg";
import axios from "axios";
import { formatDistanceToNow } from "date-fns";
import Loading from "./Loading";
import { Modal, Dropdown } from "flowbite-react";
import { read } from "fs";
import notificationIcon from "../../../public/notification-bell.svg";

interface NotificationProps {
  setConfirm: Dispatch<SetStateAction<boolean>>;
}
interface NotificationData {
  _id: string;
  user_id: string;
  message: string;
  isRead: false;
  created_at: string;
  __v: number;
}

const Notification: React.FC<NotificationProps> = ({ setConfirm }) => {
  const [notifications, setNotifications] = useState<any>(undefined);
  const [readNotificationNumber, setReadNotificationNumber] = useState<string>("");
  const [displayNotification, setDisplayNotification] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return formatDistanceToNow(date, { addSuffix: true });
  };
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/notifications`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        const undreeadNotifications = response.data.data.notifications.filter(
          (notification: NotificationData) => notification.isRead === false
        );
        setReadNotificationNumber(undreeadNotifications.length.toString());
        
        setNotifications(response.data.data.notifications);

      } catch (error) {
        console.log(error);
      }
    };
    fetchNotifications();
  }, []);
  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDisplayNotification(false)
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setDisplayNotification]);

  useEffect(()=>{
    const readNotification = async () => {
      try {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_BASE_URL}/notifications/read-all`,
          {},
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setReadNotificationNumber("0");
        
      } catch (error) {
        console.log(error);
      }
    };
    if (displayNotification && readNotificationNumber !== "0") {
      readNotification();
    }
  },[displayNotification, readNotificationNumber])

  return (
    <div className="pt-1">
      <div className="relative">
        <div
          onClick={() => setDisplayNotification(!displayNotification)}
          className="w-6 h-6 ml-auto relative"
        >
          <Image fill alt="notification list icon" src={notificationIcon} />
        </div>
        {
          readNotificationNumber !== '' && readNotificationNumber !== '0' && (
        <p className="  text-center absolute bottom-3 right-0  text-red-500 text-[0.7rem] font-bold r">
          {readNotificationNumber}
        </p>
          )

        }
      </div>
      {displayNotification && (
        <div
          ref={dropdownRef}
          className="bg-white  h-[16rem] w-[25rem] overflow-auto font-semibold font-semiboldtext-md text-md  max-w-[350px]"
        >
          <div>
            <p className=" px-3  py-4 border-b shadow">Notification</p>
            {notifications !== undefined ? (
              notifications?.map((notification: NotificationData) => (
                <div
                  key={notification._id}
                  className="flex font-medium gap-3  px-3  py-4 border-b shadow"
                >
                  <div>
                    <div className=" relative w-[20px] h-[25px]">
                      <Image
                        fill
                        alt="notification list icon"
                        src={shoutIcon}
                      />
                    </div>
                  </div>
                  <div className="w-[80%]">
                    <p>{notification.message}</p>
                    <p className="text-sm py-2 text-gray-400">
                      {formatDate(notification.created_at)}
                    </p>
                  </div>
                  {/* <button className="flex gap-[.1rem]">
               <div className="w-1 h-1 rounded-full bg-gray-400"></div>
               <div className="w-1 h-1 rounded-full bg-gray-400"></div>
               <div className="w-1 h-1 rounded-full bg-gray-400"></div>
             </button> */}
                </div>
              ))
            ) : (
              <div className="w-full h-full mt-[6rem] flex justify-center items-center">
                <Loading />
              </div>
            )}
            {/* <div className="flex font-medium gap-3  px-3  py-4 border-b shadow">
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
         </div> */}

            {/* <div className="flex font-medium gap-3  px-3  py-4 border-b shadow">
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
         </div> */}
            {notifications?.length === 0 && (
              <div className="w-full h-full mt-[6rem] flex justify-center items-center">
                <p className="text-blue-500">No Notification</p>
              </div>
            )}
            {/* {notifications !== undefined || notifications?.length === 0 && (
           <p className=" px-3  py-4 text-blue-500 w-fit mx-auto">
             View All Notification
           </p>
         )} */}
          </div>
        </div>
      )}
    </div>
  );
};

export default Notification;
