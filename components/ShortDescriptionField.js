import React, { useState } from "react";
import { Dimensions, StyleSheet, TextInput, View } from "react-native";

const screen = Dimensions.get("screen");

const ShortDescriptionField = ({ setShouldSlide, desc }) => {
  const [text, setText] = useState("");
  const setDescription = desc.setDescription;

  // const hanldeDescSet = () => {
  //   setDescription(text);
  // };

  return (
    <View style={styles.container}>
      <View style={styles.descriptionView}>
        <TextInput
          value={desc.value}
          numberOfLines={2}
          multiline
          textAlignVertical="top"
          placeholder="Enter a short description ..."
          maxLength={100}
          style={styles.descriptionInput}
          onFocus={() => setShouldSlide(true)}
          onBlur={() => setShouldSlide(false)}
          onChangeText={(desc) => setDescription(desc)}
          // onEndEditing={hanldeDescSet}
        />
      </View>
    </View>
  );
};

export default ShortDescriptionField;

const styles = StyleSheet.create({
  container: {
    marginTop: screen.height > 680 ? 50 : 25,
    backgroundColor: "transparent",
    alignItems: "center",
  },
  descriptionView: {
    width: "70%",
    alignItems: "center",
  },
  descriptionInput: {
    fontSize: 16,
    height: 120,
    width: "100%",
    borderColor: "black",
    backgroundColor: "rgba(255,255,255,0.8)",
    borderWidth: 1,
    padding: 10,
    paddingTop: 8,
    borderRadius: 20,
    shadowColor: "gray",
  },
});
