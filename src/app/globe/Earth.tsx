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
  const { selectedYear } = context;
  const [data, setData] = useState([]);
  const [country, setCountry] = useState(undefined);
  const [selectedCountry, setSelectedCountry] = useState();
  const [isYearTransitionPending, startYearTransition] = useTransition();

  useEffect(() => {
    async function getMap() {
      startYearTransition(async () => {
        try {
          const year =
            Number(selectedYear.split(" ")[0]) *
            (selectedYear.includes("BC") ? -1 : 1);

          const response = await fetch(
            `https://histori.onrender.com/api/map?period=${year}`
          );
          if (!response.ok) {
            throw new Error("Failed to fetch GeoJSON data");
          }
          const data = await response.json(); // Parse response body as JSON
          setData(data.features);
        } catch (error) {
          console.error("Error fetching GeoJSON data:", error);
        }
      });
    }
    getMap();
  }, [selectedYear]);

  return (
    <div
      className="relative"
      style={{ position: "relative", width: "100%", height: "100vh" }}
    >
      <div className="absolute bottom-16 right-8 z-50">
        {" "}
        {isYearTransitionPending && <Loading />}
      </div>

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
              ? "rgba(0, 50, 255, 0.7)"
              : "rgba(255, 255, 255, 0.2)"
          }
          polygonCapColor={({ properties: d }: any) =>
            d?.NAME === selectedCountry && d?.NAME !== null
              ? "rgba(0, 50, 255, 0.3)"
              : "rgba(255, 255, 255, 0)"
          }
          polygonSideColor={({ properties: d }: any) => "rgba(50, 0, 255, 0)"}
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
        />
      )}
    </div>
  );
};

export default Earth;
