import { debounce } from "lodash";
import { ScrollView } from "react-native-gesture-handler";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import React, { useState, useCallback, useEffect, useRef } from "react";
import {
  StyleSheet,
  TextInput,
  View,
  TouchableOpacity,
  Text,
  Platform,
  Animated,
  Keyboard,
  Dimensions,
} from "react-native";

// import DATA from "../data/places/output";

const screen = Dimensions.get("screen");

function SearchPlacesInput({ place }) {
  const [query, setQuery] = useState("");
  const [places, setPlaces] = useState([]);
  const setChosenPlace = place.setChosenPlace;
  const resultsHeightAnim = useRef(new Animated.Value(80)).current;
  const mainContainerHeightAnim = useRef(new Animated.Value(85)).current;
  const borderWidthAnim = useRef(new Animated.Value(0)).current;

  const slide = (animatedProp, value, duration) => {
    Animated.timing(animatedProp, {
      toValue: value,
      duration: duration,
      useNativeDriver: false,
    }).start();
  };

  const findPlace = (query) => {
    if (query === "") {
      setPlaces([]);
    } else {
      const regex = new RegExp(`${query.trim()}`, "i");
      setPlaces(tmpData.filter((place) => place.name.search(regex) >= 0));
    }
  };

  const updateQuery = () => {
    findPlace(query);
  };

  const delayedQuery = useCallback(debounce(updateQuery, 300), [query]);

  const handlePlaceChoice = (place) => {
    Keyboard.dismiss();
    setChosenPlace(place);
    setQuery("");
  };

  useEffect(() => {
    delayedQuery();
    return delayedQuery.cancel;
  }, [query, delayedQuery]);

  useEffect(() => {
    if (places.length > 0) {
      if (places.length === 1) {
        slide(resultsHeightAnim, 25, 1000);
        slide(mainContainerHeightAnim, 100, 1000);
      } else if (places.length === 2) {
        slide(resultsHeightAnim, 50, 1000);
        slide(mainContainerHeightAnim, 165, 1000);
      } else if (places.length === 3) {
        slide(resultsHeightAnim, 75, 1000);
        slide(mainContainerHeightAnim, 190, 1000);
      } else {
        slide(resultsHeightAnim, 100, 1000);
        slide(mainContainerHeightAnim, 215, 1000);
      }
      slide(borderWidthAnim, 1, 1000);
    } else {
      slide(resultsHeightAnim, 0, 450);
      slide(mainContainerHeightAnim, Math.round(screen.height / 7), 450);
      slide(borderWidthAnim, 0, 450);
    }
  }, [places]);

  return (
    <Animated.View
      style={[styles.mainContainer, { height: mainContainerHeightAnim }]}
    >
      <View style={styles.innerContainer}>
        <TextInput
          style={styles.textInput}
          underlineColor="transparent"
          underlineColorAndroid="transparent"
          selectionColor="black"
          placeholder="Enter a place you look for..."
          value={query}
          onChangeText={(text) => setQuery(text)}
        />
        {Platform.OS === "ios" && (
          <MaterialCommunityIcons
            size={24}
            color="black"
            name="feature-search-outline"
            style={{ position: "absolute", right: "4%", top: 10 }}
          />
        )}

        <Animated.View
          style={[
            styles.resultsContainer,
            {
              height: resultsHeightAnim,
              borderWidth: borderWidthAnim,
            },
          ]}
        >
          <ScrollView>
            {places.map((place, i) => (
              <TouchableOpacity key={place.toString() + i}>
                <Text
                  style={styles.listItem}
                  onPress={() => handlePlaceChoice(place)}
                >
                  {place.name} - {place.voivodeship}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </Animated.View>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: "white",
    alignItems: "center",
  },

  innerContainer: {
    width: "80%",
    backgroundColor: "white",
    marginTop: 20,
    position: "relative",
    alignItems: "center",
  },

  textInput: {
    fontSize: 16,
    paddingLeft: 10,
    width: "100%",
    borderWidth: 1,
    borderColor: "black",
    borderTopRightRadius: 50,
    borderTopLeftRadius: 50,
    borderRadius: 50,
    backgroundColor: "#E0CEEA",
    height: 45,
    shadowColor: "gray",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
  },

  resultsContainer: {
    backgroundColor: "#fbfbfb",
    height: 100,
    width: "100%",
    borderTopWidth: 0,
    borderBottomEndRadius: 20,
    borderBottomStartRadius: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderColor: "black",
    borderWidth: 1,
  },

  listItem: {
    fontSize: 16,
    paddingBottom: 3,
    paddingTop: 3,
    paddingLeft: 12,
  },
});

export default SearchPlacesInput;

const tmpData = [
  {
    name: "Abramowice",
    voivodeship: "Małopolskie",
    latitude: 49.8,
    longitude: 20.2,
  },
  {
    name: "Abramowice Kościelne",
    voivodeship: "Lubelskie",
    latitude: 51.2,
    longitude: 22.5833,
  },
  {
    name: "Abramowice Prywatne",
    voivodeship: "Lubelskie",
    latitude: 51.2167,
    longitude: 22.6,
  },
  {
    name: "Abramów",
    voivodeship: "Lubelskie",
    latitude: 51.45,
    longitude: 22.3167,
  },
  {
    name: "Abramów",
    voivodeship: "Lubelskie",
    latitude: 51.05,
    longitude: 22.5333,
  },
  {
    name: "Kralowe",
    voivodeship: "Lubelskie",
    latitude: 51.05,
    longitude: 22.5333,
  },
  {
    name: "Krynia",
    voivodeship: "Lubelskie",
    latitude: 51.05,
    longitude: 22.5333,
  },
  {
    name: "Krzewy",
    voivodeship: "Lubelskie",
    latitude: 51.05,
    longitude: 22.5333,
  },
];
