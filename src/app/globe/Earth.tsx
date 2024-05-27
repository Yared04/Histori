"use client";
import React, {
  useContext,
  useEffect,
  useRef,
  useState,
  useTransition,
} from "react";
import Globe from "react-globe.gl";
import TimelineContext from "./timeline/TimelineContext";
import Loading from "../components/Loading";

const Earth = () => {
  const context = useContext(TimelineContext);
  const globeEl = useRef();

  if (!context) {
    throw new Error("Timeline must be used within a TimelineProvider");
  }
  const {
    setCountry,
    selectedYear,
    isYearTransitionPending,
    startYearTransition,
  } = context;
  const [data, setData] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState();

  useEffect(() => {
    async function getMap() {
      startYearTransition(async () => {
        try {
          const year =
            Number(selectedYear.split(" ")[0]) *
            (selectedYear.includes("BC") ? -1 : 1);

          const response = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_URL}/map/temp?period=${year}`
          );
          if (!response.ok) {
            return;
          }
          const data = await response.json(); // Parse response body as JSON
          setData(data.map.features);
        } catch (error) {
          console.error("Error fetching GeoJSON data:", error);
        }
      });
    }
    getMap();
  }, [selectedYear]);

  return (
    <div className="relative" >
      {typeof window !== "undefined" && (
        <Globe
          ref={globeEl}
          polygonsData={data}
          animateIn={true}
          polygonAltitude={({ properties: d }: any) =>
            d?.NAME === selectedCountry && d?.NAME !== null ? 0.01 : 0.0015
          }
          polygonStrokeColor={({ properties: d }: any) =>
            d?.NAME === selectedCountry && d?.NAME !== null
              ? "rgba(0, 50, 255, 0)"
              : "rgba(255, 255, 255, 0.4)"
          }
          polygonCapColor={({ properties: d }: any) =>
            d?.NAME === selectedCountry && d?.NAME !== null
              ? "rgba(0, 50, 255, 0.3)"
              : "rgba(255, 255, 255, 0)"
          }
          polygonSideColor={({ properties: d }: any) =>
            d?.NAME === selectedCountry && d?.NAME !== null
              ? "rgba(0, 255, 0, 0.3)"
              : "rgba(50, 0, 255, 0)"
          }
          polygonLabel={({ properties: d }: any) =>
            d?.NAME !== null ? `<b>${d?.NAME} </b> <br />` : ""
          }
          onPolygonClick={(polygon: any) => {
            setCountry(polygon?.properties.NAME);
          }}
          onPolygonHover={(polygon: any, prevPolygon) => {
            setSelectedCountry(polygon ? polygon.properties.NAME : "");
          }}
          globeImageUrl="/earthmap.jpeg"
          bumpImageUrl="/earthbump.jpeg"
          backgroundColor="#00000000"
          
        ></Globe>
      )}
    </div>
  );
};

export default Earth;
