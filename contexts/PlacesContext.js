import React, { useState, useReducer } from "react";
import data from "../data/voivodeshipsFinal";

const ACTIONS = {
  ADD_PLACE: "add-place",
  REMOVE_PLACE: "remove-place",
};

const initialArrayOfPlaces = () => {
  const result = [];
  data.map((voivodeship) => result.push({ name: voivodeship.name, data: [] }));
  return result;
};

function reducer(myState, action) {
  switch (action.type) {
    case ACTIONS.ADD_PLACE:
      const voivodeshipOfPlaceToBeAdded =
        action.payload.newPlace.place.value.voivodeship;
      return myState.map((voivodeship) => {
        if (voivodeship.name === voivodeshipOfPlaceToBeAdded) {
          return {
            ...voivodeship,
            data: [...voivodeship.data, action.payload.newPlace],
          };
        }
        return voivodeship;
      });
    case ACTIONS.REMOVE_PLACE:
  }
}

export const PlacesContext = React.createContext();

const AddPlaceProvider = ({ children }) => {
  const [myPlaces, dispatch] = useReducer(reducer, initialArrayOfPlaces());

  const handlePlace = {
    myPlaces,
    dispatch,
  };

  return (
    <PlacesContext.Provider value={handlePlace}>
      {children}
    </PlacesContext.Provider>
  );
};

export default AddPlaceProvider;
