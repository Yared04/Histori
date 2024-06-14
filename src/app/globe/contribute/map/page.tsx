import dynamic from "next/dynamic";

const MapBox = dynamic(() => import("./MapBox"), {
  ssr: false,
});

export default function page() {
  return <MapBox />;
}
