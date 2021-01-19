import React, { useContext } from "react";
import { View } from "react-native";
import { Icon } from "react-native-elements";
import { MapContext } from "../contexts/MapContext";

const ZoomOutIcon = () => {
  const { mapRef, isZoomed, setIsZoomed } = useContext(MapContext);
  const handleDefaultZoom = () => {
    const camera = {
      center: { latitude: 51.969462, longitude: 19.071232 },
      pitch: 0,
      heading: 0,
      altitude: 0,
      zoom: 5.7,
    };
    setIsZoomed(false);
    mapRef.current.animateCamera(camera, { duration: 900 });
  };
  return (
    <View>
      <Icon
        name="magnify-minus-outline"
        type="material-community"
        color="white"
        size={34}
        onPress={handleDefaultZoom}
      />
    </View>
  );
};

export default ZoomOutIcon;
