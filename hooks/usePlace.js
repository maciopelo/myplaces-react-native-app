import { useState } from "react";

const usePlace = () => {
  const [chosenPlace, setChosenPlace] = useState(null);
  const [chosenImage, setChosenImage] = useState(null);
  const [description, setDescription] = useState("");

  return {
    memory: {
      place: {
        value: chosenPlace,
        setChosenPlace,
      },
      image: {
        value: chosenImage,
        setChosenImage,
      },
      desc: {
        value: description,
        setDescription,
      },
    },
  };
};

export default usePlace;
