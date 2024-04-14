import { select } from "d3";
import Globe from "globe.gl";
import React, { useEffect, useRef } from "react";
interface EarthProps {
  selectedYear: number;
}

const Earth: React.FC<any> = ({ selectedYear }: EarthProps) => {
  console.log(selectedYear);
  const canvasRef = useRef<HTMLDivElement>(null);
  const world = Globe({ waitForGlobeReady: false });
  useEffect(() => {
    world.width(950);
    world.height(640);
    world.backgroundImageUrl("galaxy.png");
    world.globeImageUrl("/earthmap.jpeg");
    world.bumpImageUrl("/earthbump.jpeg");
    // world.showGraticules(true);
    world.atmosphereAltitude(0.2);
    world.pointOfView({ lat: 0, lng: 0, altitude: 1.5 }, 1000);
    world(canvasRef.current!!);

  }, []);

  useEffect(() => {
    fetch(`https://histori.onrender.com/api/map?period=${selectedYear}`)
      .then((res) => res.json())
      .then((countries) => {
        console.log(countries)
        world.polygonsData(countries.features);
        world.polygonLabel(
          ({ properties: d }: any) => `<b>${d.NAME}</b> <br />`
        );
        world.polygonCapColor(() => {
          return "rgba(0, 0, 0, 0)";
        });
        world.polygonSideColor(() => "rgba(0, 0, 0, 1)");
        world.polygonStrokeColor(() => "white");
        world.polygonsTransitionDuration(10);
        world(canvasRef.current!!);
      });
  }, [selectedYear]);
  return <div ref={canvasRef}></div>;
};

export default Earth;
