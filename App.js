import React, { useRef, useState, useEffect } from "react";
import { StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import Map from "./screens/Map";
import AddPlaces from "./screens/AddPlaces";
import Visited from "./screens/Visited";
import EnhancedHeader from "./components/EnhancedHeader";

import ThemeProvider from "./contexts/ThemeContext";
import AddPlaceProvider from "./contexts/PlacesContext";
import MapProvider from "./contexts/MapContext";

const Tab = createMaterialBottomTabNavigator();

function App() {
  const routeNameRef = React.useRef(null);
  const navigationRef = React.useRef(null);
  const [currentRouteName, setCurrentRouteName] = useState("Map");
  return (
    <NavigationContainer
      ref={navigationRef}
      onReady={() =>
        (routeNameRef.current = navigationRef.current.getCurrentRoute().name)
      }
      onStateChange={() => {
        setCurrentRouteName(navigationRef.current.getCurrentRoute().name);
        routeNameRef.current = currentRouteName;
      }}
    >
      <StatusBar backgroundColor="black" />
      <AddPlaceProvider>
        <ThemeProvider>
          <MapProvider>
            <EnhancedHeader currentRouteName={currentRouteName} />
            <Tab.Navigator
              initialRouteName="Map"
              inactiveColor="#000"
              barStyle={{
                backgroundColor: "rgba(100,100,100,1)",
                borderTopColor: "#000",
              }}
            >
              <Tab.Screen
                name="Map"
                component={Map}
                options={{
                  tabBarLabel: "Map",
                  tabBarIcon: () => (
                    <MaterialCommunityIcons
                      name="map"
                      color={styles.iconColor}
                      size={26}
                    />
                  ),
                }}
              />

              <Tab.Screen
                name="AddPlaces"
                component={AddPlaces}
                options={{
                  tabBarLabel: "Add",
                  tabBarIcon: () => (
                    <MaterialCommunityIcons
                      name="plus"
                      color={styles.iconColor}
                      size={26}
                    />
                  ),
                }}
              />
              <Tab.Screen
                name="Visited"
                component={Visited}
                options={{
                  tabBarLabel: "Visited",
                  tabBarIcon: () => (
                    <MaterialCommunityIcons
                      name="map-check"
                      color={styles.iconColor}
                      size={26}
                    />
                  ),
                }}
              />
            </Tab.Navigator>
          </MapProvider>
        </ThemeProvider>
      </AddPlaceProvider>
    </NavigationContainer>
  );
}
export default App;

const styles = {
  iconColor: "rgba(255,255,255,0.8)",
};
