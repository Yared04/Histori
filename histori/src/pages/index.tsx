import { randomInt } from "crypto";
import React, { useEffect } from "react";

const Home: React.FC = () => {
  const fetchDataAndVisualize = async () => {
    const colorScale = d3.scaleSequentialSqrt(d3.interpolateYlOrRd);

    const getVal = (feat: any) => 50000 / Math.max(1e5, 300);

    fetch("/bc_100.geojson")
      .then((res) => res.json())
      .then((countries) => {
        const maxVal = Math.max(...countries.features.map(getVal));
        colorScale.domain([0, maxVal]);

        const world = Globe()
          .globeImageUrl(
            "//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
          )
          .backgroundImageUrl(
            "//unpkg.com/three-globe/example/img/night-sky.png"
          )
          .lineHoverPrecision(0)
          .polygonsData(countries.features)
          .polygonAltitude(0.05)
          .polygonCapColor(() => "rgba(255, 255, 255, 1)")
          .polygonSideColor(() => "rgba(0, 0, 0, 1)")
          .polygonStrokeColor(() => "#111")
          .polygonLabel(
            ({ properties: d }: { properties: any }) =>
              `
                  <b>${d.NAME}</b> <br />
                  Part of: <i>${d.PARTOF}</i>
              `
          )
          .onPolygonHover((hoverD: any) =>
            world
              .polygonAltitude((d) => (d === hoverD ? 0.06 : 0.06))
              .polygonCapColor((d) =>
                d === hoverD ? "green" : colorScale(getVal(d))
              )
          )
          .onPolygonClick((d) => {
            console.log("Clicked on", d.properties.NAME);
          })
          .polygonsTransitionDuration(300)(
          document.getElementById("globeViz")
        );
      });
  };
  useEffect(() => {
    const loadScripts = () => {
      const d3Script = document.createElement("script");
      d3Script.src = "//unpkg.com/d3";
      d3Script.async = true;
      document.body.appendChild(d3Script);

      const globeScript = document.createElement("script");
      globeScript.src = "//unpkg.com/globe.gl";
      globeScript.async = true;
      document.body.appendChild(globeScript);

      d3Script.onload = globeScript.onload = fetchDataAndVisualize;
    };

    

    loadScripts();
  }, []);

  return(
    <div>
       <div id="globeViz" style={{ width: "100%", height: "50px" }}>hello world</div>
    </div>
  );
};

export default Home;
