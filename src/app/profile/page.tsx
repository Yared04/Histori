"use client";
import axios from "axios";
import React, { useContext, useEffect, useRef, useState } from "react";
import ProfileCard from "./ProfileCard";
import ProfileImageInput from "./ProfileImageInput";
import ClientComponent from "../components/ClientComponent";
import { userContext } from "../auth/UserContext";
import { useRouter } from "next-nprogress-bar";
import Loading from "../components/Loading";
import { Avatar, Tabs, TabsRef } from "flowbite-react";
import { HiUserCircle } from "react-icons/hi";
import ReviewCard from "./ReviewCard";

const Profile = () => {
  const { curUser, setCurUser } = useContext(userContext);
  const [reports, setReports] = useState([]);
  const [reviews, setReviews] = useState([]);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [myDraft, setMyDraft] = useState(false);
  const [search, setSearch] = useState("");
  const tabsRef = useRef<TabsRef>(null);

  const hanldeBecomeContributor = async () => {
    try {
      setLoading(true);
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/users/contributor`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log(response);
      if (response?.data.data.user) {
        setCurUser!!(response.data.data.user);
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const fetchReviews = async () => {
    setLoading(true);
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/reviews/type/History`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    setReviews(response.data.data);
    setLoading(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const reportEndpoint =
        curUser?.role === "contributor" && !myDraft
          ? "/reports/all/?type=History"
          : "/reports?type=History";

      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}${reportEndpoint}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setReports(response.data.data.reports);
      setLoading(false);
    };

    fetchData();
    fetchReviews();
  }, [curUser, myDraft]);
  return (
    curUser && (
      <ClientComponent>
        <div className="flex flex-col gap-5 h-full">
          <div className="sticky top-0 z-10">
            <button
              onClick={() => router.push("/articles")}
              title="create an article"
              className="fixed bottom-14 right-11 z-50 flex justify-center shadow-xl cursor-pointer bg-blue-700 w-[3rem] h-[3rem] text-white text-[3rem] rounded-full"
            >
              <span className="self-center mb-2">+</span>
            </button>
            <div className="w-fit flex flex-col gap-1 mx-auto mt-5 text-center">
              {/* <ProfileImageInput /> */}
              <span className="">
                <Avatar
                  placeholderInitials={curUser?.email?.charAt(0).toUpperCase()}
                  size={"md"}
                  rounded
                  bordered
                  color="purple"
                />
              </span>
              <p className=" text-2xl font-bold">{curUser.email}</p>
              <p>{curUser.role}</p>
            </div>
            {curUser.role === "contributor" ? (
              <div className="cursor-pointer flex items-center justify-end gap-1">
                <input
                  onChange={(e) => setMyDraft(!myDraft)}
                  type="checkbox"
                />
                <p className="text-right text-sm">My reports only</p>
              </div>
            ) : (
              <div className="cursor-pointer ml-auto border rounded-md w-fit px-2 py-2 border-gray-400 hover:bg-blue-500 hover:text-white">
                <p
                  title="After becoming a contributor you will be able to suggest edit to articles"
                  className="text-right"
                  onClick={hanldeBecomeContributor}
                >
                  Become a Contributor
                </p>
              </div>
            )}

            <Tabs
              aria-label="Default tabs"
              style="default"
              ref={tabsRef}
            >
              <Tabs.Item
                active
                title={
                  curUser.role === "contributor"
                    ? "Reported Articles"
                    : "My Reports"
                }
              >
                <div className="overflow-auto h-full">
                  {reports?.map((report: any) => {
                    return (
                      <ProfileCard
                        key={report._id}
                        id={report._id}
                        title={report.content_id?.[0]?.title || ""}
                        body={report.content_id?.[0]?.content || ""}
                        date={report.updatedAt}
                        status={report.status}
                      />
                    );
                  })}
                </div>
              </Tabs.Item>
              <Tabs.Item title="My Reviews">
                <div className="overflow-auto h-full">
                  {reviews?.map((review: any) => {
                    return (
                      <ReviewCard
                        key={review._id}
                        id={review._id}
                        title={review.content_id.title}
                        status={review.status}
                        type={review.type}
                        dueDate={review.due_date}
                      />
                    );
                  })}
                </div>
              </Tabs.Item>
            </Tabs>

            {/* {curUser.role === "contributor" && (
            <div className="flex gap-2">
              <div className="flex items-center w-[80%] max-w-lg">
                <label htmlFor="simple-search" className="sr-only">
                  Search
                </label>
                <div className="relative w-full">
                  <input
                    type="text"
                    id="simple-search"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-l-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-5 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Search with keyword..."
                  />
                </div>
                <button
                  type="button"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-r-lg  py-3 px-2 dark:bg-gray-700 dark:border-gray-600s"
                >
                  <svg
                    className="w-4 h-4"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 20"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                    />
                  </svg>
                  <span className="sr-only">Search</span>
                </button>
              </div>
              <input
                type="date"
                className="max-w-[7rem] border-gray-300 rounded-lg text-gray-900"
                placeholder=" "
              />
              <input
                type="date"
                className="max-w-[7rem] border-gray-300 rounded-lg text-gray-900"
                placeholder=" "
              />
            </div>
             )} */}
          </div>
          
        </div>
      </ClientComponent>
    )
  );
};

export default Profile;
