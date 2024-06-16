import React, {
  useRef,
  useEffect,
  MouseEvent,
  Dispatch,
  SetStateAction,
} from "react";
import { useRouter } from "next-nprogress-bar";

type ClaimReviewPopupProps = {
  setConfirm: Dispatch<SetStateAction<boolean>>;
  handleClaimReview: () => void;
};
const ClaimReviewPopup: React.FC<ClaimReviewPopupProps> = ({
  setConfirm,
  handleClaimReview,
}) => {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setConfirm(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setConfirm]);
  const handleDelete = () => {
    setConfirm(false);
  };
  const handleClaim = () => {
    handleClaimReview();
    setConfirm(false);
  };

  return (
    <div className="">
      <div
        ref={dropdownRef}
        className=" fixed top-[12rem] text-black right-1/3 bg-gradient-to-b  z-40 bg-white max-w-sm p-4 flex flex-col rounded-md gap-5 items-center"
      >
        <p className="font-bold ">Claim Review</p>
        <p className="text-balck text-sm text-center">
          After claiming this review you will have{" "}
          <span className="text-red-700">7</span> days to complete the review
          process. Are you ready to claim this review? Your dedicated time and
          effort is appreciated.
        </p>
        <div className="flex w-full justify-between">
          <button
            onClick={handleClaim}
            className=" bg-blue-400 text-white py-2 rounded-md font-medium  w-[40%]"
          >
            Claim
          </button>
          <button
            onClick={handleDelete}
            className=" bg-gray-400 text-white py-2 rounded-md font-medium  w-[40%]"
          >
            Cancel
          </button>
        </div>
      </div>
      <div className="w-[100vw] h-full  z-20 fixed left-[18rem] top-[10rem]  backdrop-blur-sm "></div>
    </div>
  );
};

export default ClaimReviewPopup;
