import React, { useRef, useEffect, useState, useContext } from "react";
import AcceptButton from "../components/AcceptButton";
import SearchPlacesInput from "../components/SearchPlacesInput";
import MyImagePicker from "../components/MyImagePicker";
import ShortDescriptionField from "../components/ShortDescriptionField";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import usePlace from "../hooks/usePlace";
import { View, StyleSheet, ScrollView, Dimensions, Text } from "react-native";

const screen = Dimensions.get("screen");

function AddPlaces() {
  const scrollRef = useRef(null);
  const [shouldSlide, setShouldSlide] = useState(false);
  const { memory } = usePlace();

  const chosenPlaceTextComponent = memory.place.value !== null && (
    <View style={styles.placeTextContainer}>
      <View style={{ backgroundColor: "transparent" }}>
        <Text style={{ fontSize: 18 }}>
          {memory.place.value.name} -
          <Text style={{ fontWeight: "bold" }}>
            {memory.place.value.voivodeship}
          </Text>
        </Text>
      </View>
      <MaterialCommunityIcons
        size={30}
        color="black"
        name="close"
        style={{
          position: "absolute",
          right: "3%",
        }}
        onPress={() => memory.place.setChosenPlace(null)}
      />
    </View>
  );

  useEffect(() => {
    if (shouldSlide) {
      scrollRef.current.scrollToEnd({ duration: 1000 });
    } else {
      scrollRef.current.scrollTo({ x: 0, y: 0 });
    }
  });

  return (
    <View>
      <ScrollView
        ref={scrollRef}
        contentContainerStyle={{ backgroundColor: "rgba(120,120,120,0.2)" }}
        scrollEnabled={true}
      >
        <SearchPlacesInput place={memory.place} />
        {chosenPlaceTextComponent}
        <MyImagePicker image={memory.image} />
        <ShortDescriptionField
          desc={memory.desc}
          setShouldSlide={setShouldSlide}
        />
        <AcceptButton memory={memory} />
        <View
          style={{
            height: Math.round(screen.height / 2),
            backgroundColor: "transparent",
          }}
        />
      </ScrollView>
    </View>
  );
}

export default AddPlaces;

const styles = StyleSheet.create({
  placeTextContainer: {
    backgroundColor: "transparent",
    alignItems: "center",
    position: "relative",
  },
});
