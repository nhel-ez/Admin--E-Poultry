import React, { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase";
import "mapbox-gl/dist/mapbox-gl.css";
import mapboxgl from "mapbox-gl"; // or "const mapboxgl = require('mapbox-gl');"
import AdminHeader from "../AdminHeader";
import AdminFooter from "../AdminFooter";

mapboxgl.accessToken =
  "pk.eyJ1IjoibmhlbC1lejA0MDEiLCJhIjoiY2t3Z2k4aDAyMHAxODJucXRwNWYyc25jcCJ9.LYFdPS3AvGxwXbcI9GASMQ";

const AdminTracking = (props) => {
  const [admin, loading] = useAuthState(auth);
  const navigate = useNavigate();
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(121.4692);
  const [lat, setLat] = useState(14.1407);
  const [zoom, setZoom] = useState(9);

  useEffect(() => {
    if (loading) return;
    if (!admin) return navigate("/");
  }, [admin, loading, navigate]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [lng, lat],
      zoom: zoom,
    });
  });

  useEffect(() => {
    if (!map.current) return; // wait for map to initialize
    map.current.on("move", () => {
      setLng(map.current.getCenter().lng.toFixed(4));
      setLat(map.current.getCenter().lat.toFixed(4));
      setZoom(map.current.getZoom().toFixed(2));
    });
  });

  return (
    <>
      <AdminHeader />
      <div className="sidebar">
        Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
      </div>
      <div ref={mapContainer} className="map-container" />
      <AdminFooter />
    </>
  );
};
export default AdminTracking;
