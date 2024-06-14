"use client";
import React, { useEffect } from "react";
import { useState, useCallback } from "react";
import ControlPanel from "./ControlPanel";
import ReferenceImage from "./ReferenceImage";
import ReferenceImageControl from "./ReferenceImageControl";
import dynamic from "next/dynamic";

const Map = dynamic(() => import("react-map-gl"), {
  ssr: false,
});

const DrawControl = dynamic(() => import("./DrawControl"), {
  ssr: false,
});

export default function MapBox() {
  const [features, setFeatures] = useState({});
  const [imagePreview, setImagePreview] = useState<string | null>();
  const [opacity, setOpacity] = useState(1);

  const [isLocked, setIsLocked] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [clear, setClear] = useState(false);
  const onUpdate = useCallback((e: any) => {
    setFeatures((currFeatures) => {
      const newFeatures: any = { ...currFeatures };
      for (const f of e.features) {
        newFeatures[f.id] = f;
      }
      return newFeatures;
    });
  }, []);

  const onDelete = useCallback((e: any) => {
    setFeatures((currFeatures) => {
      const newFeatures: any = { ...currFeatures };
      for (const f of e.features) {
        delete newFeatures[f.id];
      }
      return newFeatures;
    });
  }, []);

  return (
    <div className="h-[91.5vh] flex overflow-hidden relative">
      <ControlPanel
        polygons={Object.values(features)}
        setPolygons={setFeatures}
        setImagePreview={setImagePreview}
        imagePreview={imagePreview}
        setClear={setClear}
      />

      <ReferenceImageControl
        setImagePreview={setImagePreview}
        setOpacity={setOpacity}
        opacity={opacity}
        isLocked={isLocked}
        setIsLocked={setIsLocked}
        imagePreview={imagePreview || ""}
      />
      <Map
        style={{ width: "100%", height: "100%" }}
        initialViewState={{
          longitude: -91.874,
          latitude: 42.76,
          zoom: 12,
        }}
        mapStyle="mapbox://styles/mapbox/satellite-v9"
        mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
      >
        <DrawControl
          position="top-left"
          displayControlsDefault={true}
          controls={{
            polygon: true,
            trash: true,
          }}
          defaultMode="draw_polygon"
          onCreate={onUpdate}
          onUpdate={onUpdate}
          onDelete={onDelete}
          clear={clear}
        />
      </Map>

      <ReferenceImage
        image={imagePreview || ""}
        opacity={opacity}
        isLocked={isLocked}
      />
    </div>
  );
}
