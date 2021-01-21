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
          backgroundColor: "rgba(100,100,100,1)",
          borderBottomColor: "#000",
        }}
        rightComponent={
          currentRouteName === "Map" && (
            <Switch
              trackColor={{
                false: "rgba(255,255,255,0.2)",
                true: "rgba(255,255,255,0.2)",
              }}
              thumbColor={theme.value ? "#f4f3f4" : "#f4f3f4"}
              ios_backgroundColor="rgba(255,255,255,0.2)"
              value={theme.value}
              onValueChange={theme.onValueChange}
            />
          )
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
