import React, { useRef, useState } from "react";

export const MapContext = React.createContext();

const MapProvider = ({ children }) => {
  const mapRef = useRef(null);
  const [isZoomed, setIsZoomed] = useState(false);
  return (
    <MapContext.Provider value={{ mapRef, setIsZoomed, isZoomed }}>
      {children}
    </MapContext.Provider>
  );
};

export default MapProvider;
