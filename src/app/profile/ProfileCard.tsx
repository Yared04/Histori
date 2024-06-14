"use client";
import React, { useRef, useState } from "react";
import ClaimReviewPopup from "./ClaimReviewPopup";
import axios from "axios";
import { useRouter } from "next-nprogress-bar";
import { Toast } from "primereact/toast";

interface ProfileCardProps {
  title: string;
  body: string;
  date: string;
  status: string;
  id: string;
}
const ProfileCard: React.FC<ProfileCardProps> = (props) => {
  const router = useRouter();
  const [popDisplay, setPopDisplay] = useState(false);
  const date = new Date(props.date);
  const toast = useRef<Toast>(null);

  const showSuccess = () => {
    toast.current?.show({
      severity: "success",
      summary: "Success",
      detail: "Report Submitted!",
      life: 2000,
    });
  };

  const showError = (detail: string) => {
    toast.current?.show({
      severity: "error",
      summary: "Error",
      detail: detail,
      life: 2000,
    });
  };

  const handleClaimReview = async () => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/reviews/report/${props.id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      router.push(`/reviews/${props.id}`);
      showSuccess();
    } catch (error: any) {
      console.log(error);
      showError(error.response.data.message);
    }
  };
  const handleClick = () => {
    if (props.status !== "closed") {
      setPopDisplay(true);
    }
  };
  return (
    <div className="border-gray-500 shadow hover:shadow-lg px-3 py-2 my-3 min-h-28 rounded-md mr-4">
      <div className="cursor-pointer" onClick={handleClick}>
        <div className="flex justify-between">
          <p className="font-semibold">{props.title}</p>
        </div>
        <div className="flex gap-2 text-sm items-center mb-1">
          <p className="capitalize">{props.status}</p>
          <div className="w-1 h-1 rounded-full bg-black"></div>
          <p>{date.toDateString()}</p>
        </div>
        <p className="my-1 text-sm line-clamp-2">{props.body}</p>
      </div>
      {popDisplay && (
        <ClaimReviewPopup
          handleClaimReview={handleClaimReview}
          setConfirm={setPopDisplay}
        />
      )}
      <Toast ref={toast} position="top-center" />
    </div>
  );
};

export default ProfileCard;
