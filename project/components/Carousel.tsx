import React, { useState, useEffect } from "react";
import {
  Image,
  StyleSheet,
  ImageSourcePropType,
  View,
  Button,
} from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

type Props = {
  images: ImageSourcePropType[];
};

const Carousel = ({ images }: Props) => {
  const [currentIndex, setCurrentIndex] = useState(-1);
  const translateX = useSharedValue(0);

  useEffect(() => {
    translateX.value = withTiming(0, { duration: 0 });
  }, [currentIndex]);

  const handleNext = () => {
    translateX.value = withTiming(-100, { duration: 300 }, () => {
      setCurrentIndex((currentIndex + 1) % images.length);
    });
  };

  const handlePrevious = () => {
    translateX.value = withTiming(100, { duration: 300 }, () => {
      setCurrentIndex((currentIndex - 1 + images.length) % images.length);
    });
  };

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }],
    };
  });

  const getImageIndex = (index: number) => {
    return (index + images.length) % images.length;
  };

  return (
    <View style={styles.wrapper}>
      <View style={styles.imageContainer}>
        <Animated.View style={[styles.animatedImageContainer, animatedStyle]}>
          <Image
            source={images[getImageIndex(currentIndex - 2)]}
            style={styles.image}
          />
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
          <Image
            source={images[getImageIndex(currentIndex + 2)]}
            style={styles.image}
          />
        </Animated.View>
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
    overflow: "hidden",
    borderLeftWidth: 1,
    borderRightWidth: 1,
  },

  animatedImageContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },

  image: {
    width: 100,
    height: 100,
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
