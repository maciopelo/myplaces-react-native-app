import React, { useContext, useRef, useState, useEffect } from "react";
import { ThemeContext } from "../contexts/ThemeContext";
import { PlacesContext } from "../contexts/PlacesContext";
import { MapContext } from "../contexts/MapContext";
import darkMapStyle from "../mapStyles/darkMapStyle.json";
import lightMapStyle from "../mapStyles/lightMapStyle.json";
import borders from "../data/voivodeshipsFinal";
import { isPointInPolygon } from "geolib";
import PlaceMarker from "../components/PlaceMarker";
import { View, StyleSheet, Dimensions, Image, Text } from "react-native";

import MapView, {
  PROVIDER_GOOGLE,
  Polygon,
  Marker,
  Callout,
} from "react-native-maps";
import data from "../data/voivodeshipsFinal";

const Map = () => {
  const initialCamera = {
    center: { latitude: 51.969462, longitude: 19.071232 },
    pitch: 0,
    heading: 0,
    altitude: 0,
    zoom: 5.7,
  };

  const { theme } = useContext(ThemeContext);
  const { myPlaces } = useContext(PlacesContext);
  const { mapRef, isZoomed, setIsZoomed } = useContext(MapContext);

  const markers = myPlaces.map((voivodeship) =>
    voivodeship.data.map(({ place, image }, index) => {
      return (
        <PlaceMarker
          key={place.value.latitude + ":" + place.value.longitude + ":" + index}
          place={place}
          image={image}
        />
      );
    })
  );

  const voivodeships = borders.map(({ coords, name }) => (
    <Polygon
      key={name}
      name={name}
      coordinates={coords}
      fillColor={theme.value ? "rgba(255,255,255,0.4)" : "rgba(0,0,0,0.4)"}
      strokeWidth={1}
    />
  ));

  const handleZoom = (point) => {
    const clickedVoivodeshipName = checkPoint(point);
    if (clickedVoivodeshipName !== null) {
      const [{ coords, value }] = data
        .filter((voivodeship) => clickedVoivodeshipName === voivodeship.name)
        .map((voivodeship) => voivodeship.zoom);

      const camera = {
        center: coords,
        zoom: value,
      };
      setIsZoomed(true);
      mapRef.current.animateCamera(camera, { duration: 900 });
    }
  };

  const checkPoint = (point) => {
    const result = voivodeships.filter((voivodeship) =>
      isPointInPolygon(point, voivodeship.props.coordinates)
    );
    return result.length > 0 ? result[0].key : null;
  };

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        provider={PROVIDER_GOOGLE}
        camera={initialCamera}
        style={styles.defaultMapStyle}
        customMapStyle={theme.value ? darkMapStyle : lightMapStyle}
        zoomEnabled={false}
        scrollEnabled={false}
        rotateEnabled={false}
        loadingEnabled={true}
        zoomTapEnabled={false}
        onPress={(e) => {
          handleZoom(e.nativeEvent.coordinate);
        }}
      >
        {voivodeships}
        {markers}
      </MapView>
    </View>
  );
};

export default Map;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    position: "relative",
  },
  defaultMapStyle: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});
