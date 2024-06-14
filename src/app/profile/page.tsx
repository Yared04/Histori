"use client"
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import ProfileCard from "../components/ProfileCard";
import ProfileImageInput from "../components/ProfileImageInput";
import ClientComponent from "../components/ClientComponent";
import { userContext } from "../auth/UserContext";
import { useRouter } from 'next/navigation';

const Profile = () => {
  const {curUser} = useContext(userContext);
  const [reports, setReports] =useState([]);
  const router = useRouter();
  const [search, setSearch] = useState('')
  const hanldeBecomeContributor = async () => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/users/contributor`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    const fetchData = async () => {

      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/reports?type=History`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setReports(response.data.data.reports);
    };

    fetchData();
  }, []);
  return ( curUser && <ClientComponent>
    <div className=" text-white  min-h-[100vh] relative">
      <div onClick={() => router.push('/article')} title='create an article' className='absolute flex items-center justify-center bottom-10 right-3 cursor-pointer bg-blue-400 w-[3rem] h-[3rem] text-center text-white text-[3rem] rounded-full'>
        
        <div>
          +
        </div>
      </div>
      <div className="w-fit mx-auto text-center">
        <ProfileImageInput />
        <p className=" text-2xl font-bold">{curUser.email}</p>
        <p>{curUser.role}</p>
      </div>
      {
        curUser.role === 'contributor' ?
      <div className='cursor-pointer flex items-center justify-end gap-2'>
        <input type="checkbox" />
        <p
          className="text-right"
        >
          show only my drafts
        </p>
      </div> :
      <div className='cursor-pointer'>
        <p
          title="After becoming a contributor you will be able to suggest edit to articles"
          className="text-right"
          onClick={hanldeBecomeContributor}
        >
          Become a Contributor?
        </p>
      </div>
      }
      <div className="flex justify-between py-3 ">
        <div>
          <p className="text-2xl font-semibold">My Reports</p>
          {/* <div className="flex gap-3">
            <p className=" ">Map</p>
            <div className="border border-black"></div>
            <p>History</p>
          </div> */}
        </div>
        {/* <div>
          <p className="text-2xl font-semibold">My Review</p>
          <div className="flex gap-3">
            <p>Map</p>
            <div className="border border-black"></div>
            <p>History</p>
          </div>
        </div> */}
      </div>
      {
        curUser.role === 'contributor' &&
      <div className='flex gap-2' >
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
        <input type="date"  className='max-w-[7rem] rounded-lg text-gray-900' />
        <input type='date'  className='max-w-[7rem] rounded-lg text-gray-900' />
        </div>
      }
        <div className='pt-5'>
     { reports?.map((report:any) =>{
        return (
          <ProfileCard
            key={report._id}
            id = {report._id}
            title={report.content_id?.[0].title}
            reportTitle={report.title}
            body={report.content_id?.[0].content}
            date={report.updatedAt}
          />
        )
      } 
      )}
        </div>
    </div>
    </ClientComponent>
  );
};

export default Profile;
