"use client";
import React, { useState } from "react";
import ClaimReviewPopup from "./ClaimReviewPopup";
import axios from 'axios';
import { useRouter } from 'next/navigation';

interface ProfileCardProps {
  title:string;
  reportTitle:string;
  body:string;
  date:string;
  id:string;
}
const ProfileCard:React.FC<ProfileCardProps> = (props) => {
  const [showMore, setShowMore] = useState(false);
  const router = useRouter();
  const [textToShow, setTextToShow] = useState(props.body.slice(0, 100));
  const [textToHide, setTextToHide] = useState(props.body);
  const [popDisplay, setPopDisplay] = useState(false);
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjIwZDQ4NmZiMDczMTAzZmM3NWQwMzYiLCJmaXJzdE5hbWUiOiJKb2huIiwibGFzdE5hbWUiOiJEb2UiLCJlbWFpbCI6ImdtYWlsQGdtYWlsLmNvbSIsInJvbGUiOiJjb250cmlidXRvciIsImlhdCI6MTcxODMxMTg0MiwiZXhwIjoxNzI2MDg3ODQyfQ.TNKItursk93jCn84xm3Zeh5vk4JyTJdlm_N7aAjeFdQ';

  const handleClaimReview = async () => {
    try {
      const response = await axios.post( `${process.env.NEXT_PUBLIC_BASE_URL}/reviews/report/${props.id}`, {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });
      router.push(`/articles/${props.id}`)
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div>
      <div className="cursor-pointer" onClick={()=>setPopDisplay(true)}>
        <div className="flex justify-between">
          <p className="font-medium">{props.title}</p>
          <button className="flex gap-[.1rem]">
            <div className="w-1 h-1 rounded-full bg-black"></div>
            <div className="w-1 h-1 rounded-full bg-black"></div>
            <div className="w-1 h-1 rounded-full bg-black"></div>
          </button>
        </div>
        <div className="flex gap-2 items-center">
          <p className="capitalize">{props.reportTitle}</p>
          <div className="w-1 h-1 rounded-full bg-black"></div>
          <p>{formatDate(props.date)}</p>
        </div>
      </div>
      <div className="flex">
        <p>
          {showMore ? textToHide : textToShow + "..."}
          {showMore ? (
            <span
              className="text-blue-500 pl-1 cursor-pointer"
              onClick={() => setShowMore(false)}
            >
              see less
            </span>
          ) : (
            <span
              className="text-blue-500 pl-1 cursor-pointer"
              onClick={() => setShowMore(true)}
            >
              see more
            </span>
          )}
        </p>
      </div>
      {
        popDisplay && <ClaimReviewPopup handleClaimReview={handleClaimReview} setConfirm={setPopDisplay} />
      }
    </div>
  );
};

export default ProfileCard;
