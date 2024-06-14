"use client";
import React, { useState } from "react";
import { FiLock, FiUnlock } from "react-icons/fi";

function ControlPanel(props: any) {
  const [isVisible, setIsVisible] = useState(true);
  const [name, setName] = useState("");
  const [startYear, setStartYear] = useState("");
  const [endYear, setEndYear] = useState("");
  const [startEra, setStartEra] = useState("AD");
  const [endEra, setEndEra] = useState("AD");

  const formattedGeoJson = JSON.stringify(props.polygons, null, 2);

  const handleYearChange = (value: any, era: any) => {
    const year = parseInt(value, 10);
    if (era === "BC") {
      return year * -1;
    }
    return year;
  };

  const handleStartYearChange = (e: any) => {
    setStartYear(e.target.value);
  };

  const handleEndYearChange = (e: any) => {
    setEndYear(e.target.value);
  };

  return (
    <div
      className={`control-panel absolute top-20 left-5 max-h-[90%] overflow-y-scroll z-10 bg-white w-[25%] shadow-lg px-8 py-6 pointer-events-auto rounded-lg border-2 border-gray-200 transition-transform ${
        isVisible ? "transform scale-100" : "transform scale-0"
      }`}
    >
      <div className="flex justify-between items-center mb-3">
        <h3 className="font-bold text-lg text-gray-700">Map Contribution</h3>
        <button
          onClick={() => setIsVisible(!isVisible)}
          className="text-gray-500 hover:text-gray-700 focus:outline-none"
        >
          {isVisible ? "Hide" : "Show"}
        </button>
      </div>
      {/* {polygonArea > 0 ? (
        <>
          <p className="text-gray-600 mb-4">
            {Math.round(polygonArea * 100) / 100} <br />
            square meters
          </p>
        </>
      ) : (
        <p className="text-gray-600 mb-4">No area calculated yet</p>
      )} */}

      <div className="input-fields bg-gray-100 p-4 rounded-md mb-4">
        <h4 className="font-semibold text-md text-gray-700 mb-2">Details</h4>

        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 mb-2">
            Name
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex space-x-4 mb-4">
          <div className="w-1/2">
            <label htmlFor="start-year" className="block text-gray-700 mb-2">
              Start Year
            </label>
            <input
              id="start-year"
              type="number"
              value={startYear}
              onChange={handleStartYearChange}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <select
              value={startEra}
              onChange={(e) => setStartEra(e.target.value)}
              className="w-full mt-2 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="AD">AD</option>
              <option value="BC">BC</option>
            </select>
          </div>
          <div className="w-1/2">
            <label htmlFor="end-year" className="block text-gray-700 mb-2">
              End Year
            </label>
            <input
              id="end-year"
              type="number"
              value={endYear}
              onChange={handleEndYearChange}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <select
              value={endEra}
              onChange={(e) => setEndEra(e.target.value)}
              className="w-full mt-2 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="AD">AD</option>
              <option value="BC">BC</option>
            </select>
          </div>
        </div>
      </div>
      <h4 className="font-semibold text-md text-gray-700 mb-2 justify-between flex">
        <span>GeoJSON Data</span>
        <div
          onClick={() => {
            props.setClear(false);
            props.setClear(true);
          }}
          className="cursor-pointer text-xs font-normal"
        >
          Clear
        </div>
      </h4>
      <pre className="text-xs bg-gray-200 p-2 rounded-md overflow-auto">
        {formattedGeoJson}
      </pre>
    </div>
  );
}

export default React.memo(ControlPanel);
