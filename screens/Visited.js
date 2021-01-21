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
import { Col, Row, Grid } from "react-native-easy-grid";

const VoivodeshipNameComponent = ({ name }) => {
  return (
    <Row>
      <View style={{ paddingLeft: 5, paddingTop: 10 }}>
        <Text
          style={{
            fontWeight: "bold",
            fontSize: 22,
            fontStyle: "italic",
            fontFamily: Platform.OS == "ios" ? "Arial" : "sans-serif",
          }}
        >
          {name}
        </Text>
      </View>
    </Row>
  );
};

const PhotoPlaceComponent = ({ name, display }) => {
  return (
    <Col style={{ padding: 8 }}>
      <View
        style={{
          display: display ? "flex" : "none",
          borderBottomColor: "black",
          borderWidth: 1,
          backgroundColor: "#fefefe",
          alignItems: "center",
          height: "100%",
        }}
      >
        <Image
          style={{
            marginTop: 10,
            width: 90,
            height: 90,
          }}
          source={require("../assets/image.jpg")}
        />
        <View style={{ marginTop: 5 }}>
          <Text
            numberOfLines={2}
            style={{
              textAlign: "center",
              fontStyle: "italic",
              fontFamily: Platform.OS == "ios" ? "Arial" : "sans-serif",
            }}
          >
            {name}
          </Text>
        </View>
      </View>
    </Col>
  );
};

function Visited() {
  const { myPlaces } = useContext(PlacesContext);
  const [isEmpty, setIsEmpty] = useState(true);

  const finalResult = myPlaces.map((voivodeship, i, arr) => {
    if (voivodeship.data.length > 0) {
      const numOfPlaces =
        voivodeship.data.length +
        (voivodeship.data.length % 3 == 0
          ? 0
          : 3 - (voivodeship.data.length % 3));
      let rows = [];
      let rowsChildren = [];
      let tmp = [];

      for (let index = 0; index < numOfPlaces; index++) {
        if (voivodeship.data[index] != null) {
          tmp[index % 3] = (
            <PhotoPlaceComponent
              name={voivodeship.data[index].place.value.name}
              display={true}
            />
          );
        } else {
          tmp[index % 3] = (
            <PhotoPlaceComponent name={"null"} display={false} />
          );
        }

        if (index % 3 == 0) {
          rowsChildren.push(tmp);
        }
      }

      for (let index = 0; index < Math.floor(numOfPlaces / 3); index++) {
        rows[index] = (
          <Row style={{ height: 160, backgroundColor: "gray" }}>
            {rowsChildren}
          </Row>
        );
      }

      return (
        <>
          <VoivodeshipNameComponent
            name={voivodeship.name}
            key={voivodeship.name}
          />
          {rows}
        </>
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
      style={{ height: "100%", backgroundColor: "rgba(120,120,120,0.2)" }}
    >
      <View>
        <Grid>
          {!isEmpty ? (
            finalResult
          ) : (
            <Row
              style={{
                height: 160,
                backgroundColor: "transparent",
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  marginTop: "10%",
                  color: "#000",
                  fontStyle: "italic",
                  fontSize: 20,
                }}
              >
                No visited places !
              </Text>
            </Row>
          )}
          <Row />
        </Grid>
      </View>
    </ScrollView>
  );
}

export default Visited;

const styles = StyleSheet.create({
  container: {},
});
