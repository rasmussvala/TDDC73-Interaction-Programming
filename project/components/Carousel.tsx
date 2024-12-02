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
  imageWidth?: number;
  imageHeight?: number;
  imageMargin?: number;
  wrapperWidth?: number;
};

/**
 * Carousel Component
 *
 * A React Native component for displaying a horizontally scrolling set of images.
 * It supports customization of image size, margin, and the overall wrapper width.
 *
 * @param {Object} props - The props for the component.
 * @param {ImageSourcePropType[]} props.images - An array of image sources to display in the carousel (e.g., require('./image.png')).
 * @param {number} [props.imageWidth=100] - The width of each image in pixels. Default is 100.
 * @param {number} [props.imageHeight=100] - The height of each image in pixels. Default is 100.
 * @param {number} [props.imageMargin=5] - The margin between individual images in pixels. Default is 5.
 * @param {number} [props.wrapperWidth=220] - The width of the carousel wrapper in pixels. Default is 220.
 * @returns The rendered carousel component.
 */
const Carousel = ({
  images,
  imageWidth = 100,
  imageHeight = 100,
  imageMargin = 5,
  wrapperWidth = 220,
}: Props) => {
  const [currentIndex, setCurrentIndex] = useState(-1);
  const translateX = useSharedValue(0);
  const translateXValue = imageWidth + 2 * imageMargin;

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
      width: imageWidth,
      height: imageHeight,
      margin: imageMargin,
    },

    wrapper: {
      width: wrapperWidth,
    },
  });

  return (
    <View style={dynamicStyles.wrapper}>
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
