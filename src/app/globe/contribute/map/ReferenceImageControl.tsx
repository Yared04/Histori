import React from "react";
import { FiLock, FiUnlock } from "react-icons/fi";

interface ReferenceImageControlProps {
  imagePreview: string;
  opacity: number;
  isLocked: boolean;
  setImagePreview: (imagePreview: string) => void;
  setOpacity: (opacity: number) => void;
  setIsLocked: (value: boolean) => void;
}

const ReferenceImageControl: React.FC<ReferenceImageControlProps> = ({
  imagePreview,
  opacity,
  isLocked,
  setImagePreview,
  setOpacity,
  setIsLocked,
}) => {
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    const reader = new FileReader();
    reader.onload = () => {
      setImagePreview(reader.result as string);
    };
    if (!file) return;
    reader.readAsDataURL(file);
  };

  console.log(isLocked);

  return (
    <div className="input-fields bg-gray-100 p-4 rounded-md mb-4 absolute top-5 right-5 w-[15%] z-10">
      <div className="grid grid-cols-1 space-y-2">
        <div className="flex w-full justify-end">
          {isLocked ? (
            <FiLock
              className="h-6 w-6 text-gray-700 cursor-pointer"
              onClick={() => setIsLocked(false)}
            />
          ) : (
            <FiUnlock
              className="h-6 w-6 text-gray-700 cursor-pointer"
              onClick={() => setIsLocked(true)}
            />
          )}
        </div>
        <div className="flex items-center justify-center w-full relative">
          <label className="flex flex-col rounded-lg border-4 border-dashed w-full h-60 p-10 group text-center relative">
            {imagePreview ? (
              <div className="absolute inset-0 w-full h-full">
                <img
                  className="object-cover w-full h-full"
                  src={imagePreview}
                  alt="selected file"
                />
              </div>
            ) : (
              <div className="h-full w-full text-center flex flex-col items-center justify-center">
                <div className="flex flex-auto max-h-48 w-2/5 mx-auto -mt-10"></div>
                <p className="pointer-none text-gray-500">
                  <span className="text-sm">Drag and drop</span> Image here{" "}
                  <br /> or{" "}
                  <label
                    htmlFor="fileInput"
                    className="text-blue-600 hover:underline cursor-pointer"
                  >
                    select an Image
                  </label>{" "}
                  from your computer
                </p>
              </div>
            )}
            <input
              type="file"
              id="fileInput"
              className="hidden"
              onChange={handleFileChange}
              accept="image/*"
            />
          </label>
        </div>
        {imagePreview && (
          <div className="flex justify-center mt-2">
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={opacity}
              onChange={(e: any) => setOpacity(e.target.value)}
              className="w-full"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ReferenceImageControl;
