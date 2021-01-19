import React from "react";
import { View, Image, Text } from "react-native";
import { Marker, Callout } from "react-native-maps";

const PlaceMarker = ({ place, image }) => {
  return (
    <Marker
      image={require("../assets/favicon.png")}
      coordinate={{
        latitude: place.value.latitude,
        longitude: place.value.longitude,
      }}
    >
      <Callout>
        <View
          style={{
            flex: 1,
            flexDirection: "column",
            alignContent: "center",
            alignItems: "center",
          }}
        >
          <View>
            <Image
              style={{
                width: 100,
                height: 100,
                borderColor: "#000",
                margin: 3,
              }}
              source={{ uri: image.value }}
            />
          </View>

          <View style={{ width: 100 }}>
            <Text numberOfLines={2} style={{ textAlign: "center" }}>
              {place.value.name}
            </Text>
          </View>
        </View>
      </Callout>
    </Marker>
  );
};

export default PlaceMarker;
