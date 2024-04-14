// import SideBar from "@/components/SideBar";
// import Timeline from "@/components/Timeline";
// import React, { useContext, useEffect, useState } from "react";
// import { YearContext, EventsContext } from "./_app";
// import * as d3 from "d3";

// const Home: React.FC = () => {
//   const { selectedYear } = useContext(YearContext);
//   const { events } = useContext(EventsContext);
//   const [scriptLoaded, setScriptLoaded] = useState(false);

//   const fetchDataAndVisualize = async (geojson: string) => {
//     const colorScale = d3.scaleOrdinal(d3.schemeCategory10);

//     fetch(geojson)
//       .then((res) => {
//         return res.json();
//         // const jsonData = await res.json();
//         // return jsonData.geoJson;
//       })
//       // .then((geojson: any) => {
//       //   return JSON.parse(geojson);
//       //   })
//       .then((countries: any) => {
//         const world = Globe()
//           .width(950)
//           .height(600)
//           .globeImageUrl("/earthmap.jpeg")
//           .bumpImageUrl(
//             "/earthbump.jpeg"
//           )

//           .showGraticules(true)
//           .atmosphereAltitude("0.2")
//           .backgroundImageUrl(
//             "galaxy.png"
//           )
//           .lineHoverPrecision(0)
//           .polygonsData(countries.features)
//           .polygonAltitude((d: any) => 0.0) // Set a base altitude for all polygons
//           .polygonCapColor((d: any) => {
//             return "rgba(0, 0, 0, 0)";
//             // if (d === world.hoverD) {
//             //   // Different color for the selected (hovered) country
//             //   return "green";
//             // } else {
//             //   // Different color for each country based on a categorical color scale
//             //   return colorScale(d.properties.NAME);
//             // }
//           })
//           .polygonSideColor(() => "rgba(0, 0, 0, 1)")
//           .polygonStrokeColor(() => "white")
//           .polygonLabel(
//             ({ properties: d }: { properties: any }) => `
//             <b>${d.NAME}</b> <br />
//                    `
//           )
//           .onPolygonHover((hoverD: any) => {
//             world.polygonAltitude((d: any) => (d === hoverD ? 0.05 : 0.0)); // Elevate on hover
//           })
//           .onPolygonClick((selectedD: any) => {
//             // Update state

//             //fetch events from backend
//             fetch(`/api/events?country=${selectedD.properties.NAME}`)
//               .then((res) => res.json())
//               .then((events) => {
//                 // setEvents(events);
//               });
//             // Additional logic for handling click event, if needed
//           })
//           .polygonsTransitionDuration(300)(document.getElementById("globeViz"));

//         const globeMaterial = world.globeMaterial();
//         globeMaterial.bumpScale = 10;
//         // new THREE.TextureLoader().load(
//         //   "//unpkg.com/three-globe/example/img/earth-water.png",
//         //   (texture) => {
//         //     globeMaterial.specularMap = texture;
//         //     globeMaterial.specular = new THREE.Color("grey");
//         //     globeMaterial.shininess = 15;
//         //   }
//         // );
//       });
//   };

//   useEffect(() => {
//     const loadScripts = async () => {
//       // Load D3
//       const d3Script = document.createElement("script");
//       d3Script.src = "//unpkg.com/d3";
//       d3Script.async = true;
//       document.body.appendChild(d3Script);

//       const globeScript = document.createElement("script");
//       globeScript.src = "//unpkg.com/globe.gl";
//       globeScript.async = true;
//       document.body.appendChild(globeScript);

//       d3Script.onload = globeScript.onload = () => setScriptLoaded(true);
//     };

//     loadScripts();
//   }, []);

//   const availableyears = [
//     -123000, -10000, -8000, -5000, -4000, -3000, -2000, -1500, -1000, -700,
//     -500, -400, -323, -300, -200, -100, -1, 100, 200, 300, 400, 500, 600, 700,
//     800, 900, 1000, 1100, 1200, 1300, 1400, 1492, 1500, 1530, 1600, 1650, 1700,
//     1715, 1783, 1800, 1815, 1880, 1900, 1914, 1920, 1938, 1945, 1960, 1994,
//     2000, 2010,
//   ];

//   useEffect(() => {
//     const fetchAfterDelay = setTimeout(() => {
//       const [year, time] = selectedYear.split(" ");
//       let displayYear =
//         time === "BC" ? -parseInt(year, 10) : parseInt(year, 10);

//       const closestYearIdx = d3.bisectRight(availableyears, displayYear);
//       displayYear =
//         availableyears[closestYearIdx] - displayYear <
//         displayYear - availableyears[closestYearIdx - 1]
//           ? availableyears[closestYearIdx]
//           : availableyears[closestYearIdx - 1];

//       if (scriptLoaded) {
//         // const [year, time] = selectedYear.split(" ");
//         // const displayYear =
//         //   time === "BC" ? -parseInt(year, 10) : parseInt(year, 10);
//         // fetchDataAndVisualize(`https://histori.onrender.com/api/map?period=${displayYear}`)
//         displayYear < 0 && availableyears.indexOf(displayYear) !== -1
//           ? fetchDataAndVisualize(`geojson/world_bc${displayYear * -1}.geojson`)
//           : availableyears.indexOf(displayYear) !== -1
//           ? fetchDataAndVisualize(`geojson/world_${displayYear}.geojson`)
//           : fetchDataAndVisualize(`geojson/places.geojson`);
//       }
//     }, 500);
//     return () => clearTimeout(fetchAfterDelay);
//   }, [selectedYear, scriptLoaded]);

//   return (
//     <div className="pt-10 px-8">
//       <div className="relative z-10">
//         <Timeline />
//       </div>
//       <div className="flex items-center">
//         <div id="globeViz" className="basis-3/5"></div>

//         <div className="basis-2/5 mt-12">
//           <SideBar events={events} />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Home;
