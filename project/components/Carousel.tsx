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
  const [currentIndex, setCurrentIndex] = useState(-1);

  const handleNext = () => {
    setCurrentIndex((currentIndex + 1) % images.length);
  };

  const handlePrevious = () => {
    setCurrentIndex((currentIndex - 1) % images.length);
  };

  const getImageIndex = (index: number) => {
    return (index + images.length) % images.length;
  };

  return (
    <View style={styles.wrapper}>
      <View style={styles.imageContainer}>
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
      <View style={styles.buttonContainter}>
        <View style={styles.button}>
          <Button title="Previous" onPress={handlePrevious} />
        </View>
        <View style={styles.button}>
          <Button title="Next" onPress={handleNext} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    width: 220,
  },

  imageContainer: {
    flexDirection: "row",
    overflow: "hidden",
    justifyContent: "center",
    borderLeftWidth: 1,
    borderRightWidth: 1,
  },

  image: {
    width: 100,
    height: 100,
    margin: 10,
  },

  buttonContainter: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    gap: 10,
  },

  button: {
    width: 100,
  },
});

export default Carousel;
