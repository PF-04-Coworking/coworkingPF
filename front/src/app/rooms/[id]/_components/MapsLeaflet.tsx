"use client";

import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useState, useEffect } from "react";
import geocodeAddress from "./GeoCoder";
import L from "leaflet";
import image from "../../../../../public/images/png-transparent-orange-and-white-location-icon-map-computer-icons-location-logo-text-orange-pin.png";
import { ILeafletMapComponentProps, ILocation } from "@/types/types";
import { Paragraph } from "@/components/common/Paragraph";

const img = image.src;

const MarkerLeaflet = L.icon({
  iconUrl: img,
  iconSize: [50, 50],
});

const LeafletMapComponent = ({ location }: ILeafletMapComponentProps) => {
  const [coordinates, setCoordinates] = useState<ILocation>({ lat: 0, lng: 0 });

  useEffect(() => {
    const fetchCoordinates = async () => {
      try {
        const response = await geocodeAddress(location);
        setCoordinates(response);
      } catch (error) {
        console.error("Error en la geocodificación:", error);
      }
    };
    fetchCoordinates();
  }, [location]);

  return (
    <>
      {coordinates.lat && coordinates.lng ? (
        <div className="h-full bg-secondaryDark rounded-2xl">
          <MapContainer
            center={[coordinates.lat, coordinates.lng]}
            zoom={17}
            style={{
              height: "100%",
              borderRadius: "1rem",
              width: "100%",
              zIndex: 0,
              display: "block",
            }}
          >
            <TileLayer
              attribution="Google Maps"
              url="https://www.google.cn/maps/vt?lyrs=m@189&gl=cn&x={x}&y={y}&z={z}"
            />
            <Marker
              position={[coordinates.lat, coordinates.lng]}
              icon={MarkerLeaflet}
            />
            <Popup position={[coordinates.lat + 0.0001, coordinates.lng]}>
              <Paragraph
                variant="primary"
                className="!text-primary text-center font-medium"
              >
                ¡Esta es la ubicación de tu oficina!
              </Paragraph>
            </Popup>
          </MapContainer>
        </div>
      ) : (
        <div className="flex-col gap-4 w-full flex items-center justify-center">
          <div className="w-20 h-20 border-4 border-transparent text-primary text-4xl animate-spin flex items-center justify-center border-t-primary rounded-full">
            <div className="w-16 h-16 border-4 border-transparent text-primary text-2xl animate-spin flex items-center justify-center border-t-primary rounded-full"></div>
          </div>
        </div>
      )}
    </>
  );
};

export default LeafletMapComponent;
