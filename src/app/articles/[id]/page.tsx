"use client";
import { Button, TextInput } from "flowbite-react";
import React, { ChangeEvent, useContext, useState } from "react";
import Countries from "../Countries";
import "react-quill/dist/quill.snow.css";
import { MultiSelect } from "primereact/multiselect";
import dynamic from "next/dynamic";
import { ArticleContext } from "../ArticleContext";
import ArticleItem from "../ArticleItem";
import ReportItem from "../ReportItem";

const ReactQuill = dynamic(() => import("react-quill"), {
  ssr: false,
});

const AddArticle = () => {
  const articleContext = useContext(ArticleContext);
  if (!articleContext) {
    throw new Error("ArticleContext must be used within an ArticleProvider");
  }
  const { state, dispatch } = articleContext;

  const [thumbnails, setThumbnails] = useState<string[]>([]);
  const handleStartYearChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    dispatch({
      type: "SET_START_YEAR",
      payload: value === "" ? undefined : parseInt(value),
    });
  };

  const handleEndYearChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    dispatch({
      type: "SET_END_YEAR",
      payload: value === "" ? undefined : parseInt(value),
    });
  };

  const handleCountryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    dispatch({ type: "SET_COUNTRY", payload: value });
  };

  const handleTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    dispatch({ type: "SET_TITLE", payload: value });
  };

  const handleContentChange = (value: string) => {
    dispatch({ type: "SET_CONTENT", payload: value });
  };

  const handleCategoryChange = (e: any) => {
    const selectedCategories = e.value;
    dispatch({ type: "SET_CATEGORIES", payload: selectedCategories });
  };

  const handleSourcesChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const value = event.target.value;
    const sources = value.split(",");
    dispatch({ type: "SET_SOURCES", payload: sources });
  };

  const handleimageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const image = event.target.files?.[0];
    if (image) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          dispatch({
            type: "SET_IMAGE_URL",
            payload: e.target.result.toString(),
          });
        }
      };
      reader.readAsDataURL(image);
    }
  };

  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image"],
      ["clean"],
    ],
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
  ];

  const _categories = [
    { name: "War", id: 1 },
    { name: "Science", id: 2 },
    { name: "Technology", id: 3 },
    { name: "Health", id: 4 },
    { name: "Sports", id: 5 },
    { name: "Entertainment", id: 6 },
    { name: "Politics", id: 7 },
    { name: "Business", id: 8 },
    { name: "Education", id: 9 },
    { name: "Travel", id: 10 },
    { name: "Fashion", id: 11 },
    { name: "Food", id: 12 },
    { name: "Lifestyle", id: 13 },
    { name: "Music", id: 14 },
    { name: "Art", id: 15 },
    { name: "Environment", id: 16 },
    { name: "Weather", id: 17 },
    { name: "Economy", id: 18 },
    { name: "Agriculture", id: 19 },
    { name: "Energy", id: 20 },
  ];

  const handleSubmit = () => {
    console.log("submitted data", state);
  };

  const handleSave = () => {
    console.log("Save Progress");
  };

  const mockArticle = {
    title: "Article Title",
    description: "Article Description",
    image: "https://via.placeholder.com/150",
    startYear: 2021,
    endYear: 2022,
  };

  return (
    <div className="flex flex-col gap-5 px-20 py-10">
      <h1 className="text-white text-3xl text-center font-bold">
        Edit Reported Article
      </h1>
      <ReportItem title={mockArticle.title} description={mockArticle.description} image={mockArticle.image} reportDate={0} />
      <div className="flex w-full items-center justify-center">
        <label
          htmlFor="fileInput"
          className="flex h-36 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600"
        >
          {state.imageUrl === "" && (
            <div className="flex flex-col items-center justify-center pb-6 pt-5">
              <svg
                className="mb-4 h-8 w-8 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 16"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                />
              </svg>
              <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                <span className="font-semibold">Click to upload</span>
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                SVG, PNG, JPG or GIF
              </p>
            </div>
          )}
          {state.imageUrl !== "" && (
            <div className="flex flex-nowrap mt-4">
              {thumbnails.map((thumbnail, index) => (
                <div key={index} className="w-1/4 p-2">
                  <img
                    src={thumbnail}
                    alt={`Thumbnail ${index}`}
                    className="w-auto h-auto max-h-20 max-w-full rounded-lg object-cover"
                  />
                </div>
              ))}
            </div>
          )}

          <input
            type="file"
            // multiple
            onChange={handleimageChange}
            className="hidden"
            id="fileInput"
          />
        </label>
      </div>
      <div className="flex gap-10">
        <div className="basis-2/3 flex flex-col">
          <TextInput
            id="title"
            placeholder="Title"
            value={state.title}
            type="text"
            className="rounded-none text-red-500 mb-2"
            onChange={handleTitleChange}
          />
          <TextInput
            id="country"
            placeholder="Country"
            value={state.country}
            type="text"
            className="rounded-none text-red-500 mb-2"
            onChange={handleCountryChange}
          />
          <ReactQuill
            value={state.content}
            className="my-4 border-gray-500 h-64 rounded-md bg-white"
            onChange={handleContentChange}
            placeholder={"Write something..."}
            modules={modules}
            formats={formats}
          />
        </div>

        <div className="basis-1/3 flex flex-col gap-3">
          <div className="bg-zinc-700 py-1 shadow-lg rounded-md items-center">
            <h2 className="font-bold text-xl text-white text-center">
              Categories
            </h2>
            <div className="p-3">
              <MultiSelect
                value={state.categories}
                onChange={handleCategoryChange}
                options={_categories}
                optionLabel="name"
                placeholder="Select Categories"
                maxSelectedLabels={5}
              />
            </div>
          </div>
          <div className="bg-zinc-700 py-1 px-3 shadow-lg rounded-md items-center">
            <h2 className="font-bold text-xl text-white text-center">
              Sources
            </h2>
            <textarea
              className="w-full h-20 p-2 my-2 mx-1 bg-white rounded-md"
              placeholder="Put your sources here separated by commas"
              value={state.sources}
              onChange={handleSourcesChange}
            ></textarea>
          </div>

          <div className="bg-zinc-700 py-1 px-3 shadow-lg rounded-md">
            <h2 className="font-bold text-xl text-white text-center">
              Event Time Frame
            </h2>
            <div className="my-2 flex gap-4">
              <input
                type="number"
                className="h-10 p-2 mb-3 bg-white rounded-md"
                placeholder="Start Year"
                value={state.startYear}
                onChange={handleStartYearChange}
              />
              <input
                type="number"
                className="h-10 p-2 bg-white rounded-md"
                placeholder="End Year"
                value={state.endYear}
                onChange={handleEndYearChange}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-end gap-5 z-10">
        <Button onClick={handleSave} color="warning">
          Save Progress
        </Button>{" "}
        <Button onClick={handleSubmit} color="blue">
          Submit
        </Button>
      </div>
    </div>
  );
};

export default AddArticle;
