import React, { useContext, useEffect } from "react";
import { View, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { PlacesContext } from "../contexts/PlacesContext";
import { Icon } from "react-native-elements";

const AcceptButton = ({ memory }) => {
  const { dispatch } = useContext(PlacesContext);
  const memoryToBeAdded = {
    place: memory.place,
    image: memory.image,
    desc: memory.desc,
  };

  const handleAccept = () => {
    console.log("click");
    if (memory.place.value == null || memory.image.value == null) {
      const text =
        memory.place.value == null ? "No place selected" : "No image selected";
      Alert.alert(text, "", [{ text: "Back" }]);
      return;
    }
    if (memory.desc.value === "") {
      const msg = `You have not entered a description, are you sure ?`;

      Alert.alert("Warning", msg, [
        {
          text: "Yes",
          onPress: () => {
            dispatch({
              type: "add-place",
              payload: { newPlace: memoryToBeAdded },
            });
            memory.place.setChosenPlace(null);
            memory.image.setChosenImage(null);
            memory.desc.setDescription("");
          },
        },
        { text: "Back" },
      ]);
      return;
    }

    dispatch({ type: "add-place", payload: { newPlace: memoryToBeAdded } });
    memory.place.setChosenPlace(null);
    memory.image.setChosenImage(null);
    memory.desc.setDescription("");
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        activeOpacity={0.5}
        style={styles.button}
        onPress={handleAccept}
      >
        <Icon name="check" type="material-community" color="black" size={30} />
      </TouchableOpacity>
    </View>
  );
};

export default AcceptButton;
const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    alignItems: "center",
  },
  button: {
    alignItems: "center",
    backgroundColor: "#E0CEEA",
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 10,
  },
});
