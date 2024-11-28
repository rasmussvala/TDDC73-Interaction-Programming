import React, { useState } from "react";
import {
  Image,
  StyleSheet,
  ImageSourcePropType,
  View,
  Button,
} from "react-native";

type Props = {
  images: ImageSourcePropType[];
};

const Carousel = ({ images }: Props) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrevious = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  const getImageIndex = (index: number) => {
    return (index + images.length) % images.length;
  };

  return (
    <>
      <View style={styles.container}>
        <Image
          source={images[getImageIndex(currentIndex - 1)]}
          style={styles.image}
        />
        <Image
          source={images[getImageIndex(currentIndex)]}
          style={styles.image}
        />
        <Image
          source={images[getImageIndex(currentIndex + 1)]}
          style={styles.image}
        />
      </View>
      <View style={styles.buttons}>
        <Button title="Previous" onPress={handlePrevious} />
        <Button title="Next" onPress={handleNext} />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },

  image: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },

  buttons: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
  },
});

export default Carousel;
