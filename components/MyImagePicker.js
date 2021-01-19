import * as ImagePicker from "expo-image-picker";
import galleryImage from "../assets/photo-gallery.png";
import { Icon } from "react-native-elements";
import React, { useRef, useState, useEffect } from "react";
import {
  Image,
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Animated,
  Platform,
} from "react-native";

const MyImagePicker = ({ image }) => {
  const slideAnim = useRef(new Animated.Value(-50)).current;
  const chosenImage = image.value;
  const setChosenImage = image.setChosenImage;
  const [actualImage, setActualImage] = useState(galleryImage);

  const handleImagePick = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setChosenImage(result.uri);
      setActualImage(result.uri);
      slide(slideAnim, 20, 700);
    }
  };

  const handleRemoveImage = () => {
    setChosenImage(null);
    setActualImage(galleryImage);
    slide(slideAnim, -70, 700);
  };

  const slide = (anim, value, duration) => {
    Animated.timing(anim, {
      toValue: value,
      duration: duration,
      useNativeDriver: false,
    }).start();
  };

  const animtedIcons = (
    <>
      <Animated.View
        style={{
          position: "absolute",
          top: "35%",
          right: slideAnim,
        }}
      >
        <Icon
          name="reload"
          type="material-community"
          color="black"
          size={50}
          onPress={handleImagePick}
        />
      </Animated.View>
      <Animated.View
        style={{
          position: "absolute",
          top: "35%",
          left: slideAnim,
        }}
      >
        <Icon
          name="trash-can-outline"
          type="material-community"
          color="black"
          size={50}
          onPress={handleRemoveImage}
        />
      </Animated.View>
    </>
  );

  useEffect(() => {
    if (chosenImage == null) {
      setActualImage(galleryImage);
    } else {
      setActualImage(galleryImage);
    }
  }, [chosenImage]);

  return (
    <View style={styles.container}>
      {animtedIcons}
      <TouchableOpacity onPress={chosenImage == null ? handleImagePick : null}>
        <View style={chosenImage !== null && styles.image}>
          <Image
            source={actualImage}
            // source={chosenImage == null ? actualImage : { uri: chosenImage }}
            style={{
              width: 180,
              height: 180,
            }}
          />
        </View>
      </TouchableOpacity>
      {chosenImage === null && (
        <Text
          style={{
            fontSize: 18,
            fontStyle: "italic",
            fontFamily: Platform.OS == "ios" ? "Arial" : "sans-serif",
          }}
        >
          choose a photo
        </Text>
      )}
    </View>
  );
};

export default MyImagePicker;
const styles = StyleSheet.create({
  container: {
    marginTop: 5,
    alignItems: "center",
    backgroundColor: "white",
    paddingBottom: 15,
    position: "relative",
  },
  image: {
    width: 180,
    height: 180,
    marginTop: 15,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,

    elevation: 24,
  },
});
