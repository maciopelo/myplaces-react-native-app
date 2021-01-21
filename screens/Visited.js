import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Animated,
  ScrollView,
} from "react-native";
import { PlacesContext } from "../contexts/PlacesContext";

const VoivodeshipNameComponent = ({ name }) => {
  return (
    <View style={{ marginLeft: 5, marginTop: 10, marginBottom: 5 }}>
      <Text
        style={{
          fontWeight: "bold",
          fontSize: 24,
          fontStyle: "italic",
          fontFamily: Platform.OS == "ios" ? "Arial" : "sans-serif",
        }}
      >
        {name}
      </Text>
    </View>
  );
};

const ImagesFlexComponent = ({ name, image }) => {
  return (
    <View style={styles.places}>
      <Image
        style={{
          marginTop: 2,
          width: "80%",
          height: "75%",
        }}
        source={{ uri: image }}
      />
      <Text
        style={{
          paddingTop: 2,
          textAlign: "center",
        }}
      >
        {name}
      </Text>
    </View>
  );
};

function Visited() {
  const { myPlaces } = useContext(PlacesContext);
  const [isEmpty, setIsEmpty] = useState(true);

  const finalResult = myPlaces.map((voivodeship) => {
    if (voivodeship.data.length > 0) {
      //console.log(voivodeship.data);
      const places = voivodeship.data.map((city) => {
        console.log(city.image.value);
        return (
          <ImagesFlexComponent
            name={city.place.value.name}
            image={city.image.value}
          />
        );
      });
      return (
        <View>
          <VoivodeshipNameComponent name={voivodeship.name} />
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            {places}
          </View>
        </View>
      );
    }
  });

  useEffect(() => {
    const check = myPlaces.filter(
      (voivodeship) => voivodeship.data.length !== 0
    ).length;
    if (check > 0) {
      setIsEmpty(false);
    }
  }, [myPlaces]);

  return (
    <ScrollView
      style={{ height: "100%", backgroundColor: "rgba(180,180,180,0.2)" }}
    >
      <View
        style={{
          flex: 1,
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "stretch",
        }}
      >
        {!isEmpty ? (
          finalResult
        ) : (
          <View
            style={{
              height: 160,
              justifyContent: "center",
              alignSelf: "center",
            }}
          >
            <Text style={{ fontSize: 30, fontStyle: "italic" }}>
              No added places...
            </Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
}

export default Visited;

const styles = StyleSheet.create({
  places: {
    justifyContent: "center",
    alignItems: "center",
    margin: "1%",
    height: 135,
    width: "30%",
    backgroundColor: "rgba(245,245,245,0.8)",
    borderColor: "#000",
    borderWidth: 1,
  },
});
