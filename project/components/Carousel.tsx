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
  imageSize: number;
  imageMargin: number;
};

const Carousel = ({ images, imageSize = 100, imageMargin = 5 }: Props) => {
  const [currentIndex, setCurrentIndex] = useState(-1);
  const translateX = useSharedValue(0);
  const translateXValue = imageSize + 2 * imageMargin;

  useEffect(() => {
    translateX.value = withTiming(0, { duration: 0 });
  }, [currentIndex]);

  const handleNext = () => {
    translateX.value = withTiming(-translateXValue, { duration: 300 }, () => {
      setCurrentIndex((currentIndex + 1) % images.length);
    });
  };

  const handlePrevious = () => {
    translateX.value = withTiming(translateXValue, { duration: 300 }, () => {
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

  const dynamicStyles = StyleSheet.create({
    image: {
      width: imageSize,
      height: imageSize,
      margin: imageMargin,
    },
  });

  return (
    <View style={styles.wrapper}>
      <View style={styles.imageContainer}>
        <Animated.View style={[styles.animatedImageContainer, animatedStyle]}>
          <Image
            source={images[getImageIndex(currentIndex - 2)]}
            style={dynamicStyles.image}
          />
          <Image
            source={images[getImageIndex(currentIndex - 1)]}
            style={dynamicStyles.image}
          />
          <Image
            source={images[getImageIndex(currentIndex)]}
            style={dynamicStyles.image}
          />
          <Image
            source={images[getImageIndex(currentIndex + 1)]}
            style={dynamicStyles.image}
          />
          <Image
            source={images[getImageIndex(currentIndex + 2)]}
            style={dynamicStyles.image}
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
