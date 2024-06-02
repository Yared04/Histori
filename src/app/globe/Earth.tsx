"use client";
import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  useTransition,
} from "react";
import Globe from "react-globe.gl";
import TimelineContext from "./timeline/TimelineContext";
import Loading from "../components/Loading";

type DebounceFunction<T extends (...args: any[]) => void> = (
  fn: T,
  delay: number
) => (...args: Parameters<T>) => void;

// Debounce function
export const useDebouncedValue = (inputValue: any, delay: any) => {
  const [debouncedValue, setDebouncedValue] = useState(inputValue);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(inputValue);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [inputValue, delay]);

  return debouncedValue;
};

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

  // Function to fetch map data
  const fetchMapData = async (year?: number, setData?: (data: any) => void) => {
    startYearTransition(async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/map/temp?period=${year}`
        );
        if (!response.ok) {
          return;
        }
        const data = await response.json();
        setData!(data.map.features);
      } catch (error) {
        console.error("Error fetching GeoJSON data:", error);
      }
    });
  };

  const debouncedYear = useDebouncedValue(selectedYear, 1000);

  useEffect(() => {
    const year =
      Number(debouncedYear.split(" ")[0]) *
      (debouncedYear.includes("BC") ? -1 : 1);
    fetchMapData(year, setData);
  }, [debouncedYear]);

  return (
    <div className="relative">
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
