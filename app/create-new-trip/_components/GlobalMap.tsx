import "mapbox-gl/dist/mapbox-gl.css";
import mapboxgl from "mapbox-gl";
import { useEffect, useRef } from "react";

function GlobalMap() {
  const mapContainerRef = useRef(null);

  useEffect(() => {
    mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_API_KEY;
    const map = new mapboxgl.Map({
      container: mapContainerRef?.current ?? "",
      style: "mapbox://styles/mapbox/streets-v12",
      center: [-74.5, 40],
      zoom: 1.7,
      projection:'globe'
    });
  }, []);

  return (
    <div>
      <div
        ref={mapContainerRef}
        style={{
          width: "95%",
          height: "85vh",
          borderRadius: 20,
        }}
      ></div>
    </div>
  );
}

export default GlobalMap;
