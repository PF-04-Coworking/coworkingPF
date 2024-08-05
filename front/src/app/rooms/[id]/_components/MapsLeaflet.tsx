import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useState, useEffect } from "react";
import geocodeAddress from "./GeoCoder";
import L from "leaflet";
import image from "../../../../../public/images/png-transparent-orange-and-white-location-icon-map-computer-icons-location-logo-text-orange-pin.png";
import { ILeafletMapComponentProps, ILocation } from "@/types/types";

const img = image.src;

const MarkerLeaflet = L.icon({
  iconUrl: img,
  iconSize: [55, 58],
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

  console.log("coord nuevas:", coordinates);
  return (
    <>
      {coordinates.lat && coordinates.lng ? (
        <div className="h-full bg-secondaryDark p-5 rounded-2xl w-[72rem]">
          <MapContainer
            center={[coordinates.lat, coordinates.lng]}
            zoom={17}
            style={{ height: "100%", borderRadius: "1rem", width: "100%" }}
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <Marker
              position={[coordinates.lat, coordinates.lng]}
              icon={MarkerLeaflet}
            />
            <Popup position={[coordinates.lat + 0.0001, coordinates.lng]}>
              <div>
                <h1 className="text-primary font-bold text-center">
                  ¡Esta es la ubicación de tu oficina!
                </h1>
                <p className="text-center font-semibold">
                  Puedes reservarla ahora o ir a visitarla en cualquier momento,
                  estaremos encantados de recibirte.
                </p>
              </div>
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
