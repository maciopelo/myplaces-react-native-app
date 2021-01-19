import React, { useContext, useState } from "react";
import { Header } from "react-native-elements";
import { View, Switch, Text, StyleSheet } from "react-native";
import { ThemeContext } from "../contexts/ThemeContext";
import { MapContext } from "../contexts/MapContext";
import ZoomOutIcon from "../components/ZoomOutIcon";

export default function EnhancedHeader({ currentRouteName }) {
  const { theme } = useContext(ThemeContext);
  const { isZoomed } = useContext(MapContext);

  return (
    <View>
      <Header
        leftComponent={
          currentRouteName === "Map" && isZoomed && <ZoomOutIcon />
        }
        centerComponent={{
          text: "Places",
          style: {
            color: "#fff",
            fontStyle: "italic",
            fontSize: 24,
          },
        }}
        containerStyle={{
          backgroundColor: "rgba(100,100,100,1)", //"rgba(0,0,0,0.7)",
          borderBottomColor: "#000",
        }}
        rightComponent={
          <Switch
            trackColor={{ false: "#E0CEEA", true: "#81b0ff" }}
            thumbColor={theme.value ? "#f4f3f4" : "#f4f3f4"}
            ios_backgroundColor="#E0CEEA"
            value={theme.value}
            onValueChange={theme.onValueChange}
          />
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  fadingContainer: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: "powderblue",
  },
});
