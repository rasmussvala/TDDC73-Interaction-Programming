import React, { useState, useEffect } from "react";
import {
  Image,
  StyleSheet,
  ImageSourcePropType,
  View,
  TouchableOpacity,
  Text,
} from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

type Props = {
  images: ImageSourcePropType[];
  wrapperWidth?: number;

  imageWidth?: number;
  imageHeight?: number;
  imageMargin?: number;

  buttonBackgroundColor?: string;
  buttonIconColor?: string;
};

/**
 * Carousel Component
 *
 * A React Native component for displaying a horizontally scrolling set of images.
 * Learn more about how to use this component in the: [Carousel README](https://www.google.se)
 *
 * @component
 * @param {Object} props - The props for the component.
 * @param {ImageSourcePropType[]} props.images - An array of image sources to display in the carousel (e.g., require('./image.png')).
 * @param {number} props.wrapperWidth - The width of the carousel wrapper in pixels. Default is 220.
 * @param {number} props.imageWidth - The width of each image in pixels. Default is 100.
 * @param {number} props.imageHeight - The height of each image in pixels. Default is 100.
 * @param {number} props.imageMargin - The margin between individual images in pixels. Default is 5.
 * @param {string} props.buttonBackgroundColor - The background color of navigation buttons. Default is "#d3d3d3aa".
 * @param {string} props.buttonIconColor - The color of the navigation button icons. Default is "black".
 * @returns The rendered carousel component.
 *
 * @example
 * const images = [
 *   require("./image1.png"),
 *   require("./image2.png"),
 *   require("./image3.png"),
 * ];
 *
 * <Carousel images={images} />
 */
const Carousel = ({
  images,
  wrapperWidth = 220,
  imageWidth = 100,
  imageHeight = 100,
  imageMargin = 5,
  buttonBackgroundColor = "#d3d3d3aa",
  buttonIconColor = "black",
}: Props) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const translateX = useSharedValue(0);
  const translateXValue = imageWidth + 2 * imageMargin;

  useEffect(() => {
    translateX.value = 0;
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

  const styles = StyleSheet.create({
    wrapper: {
      width: wrapperWidth,
    },

    image: {
      width: imageWidth,
      height: imageHeight,
      margin: imageMargin,
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

    buttonWrapper: {
      justifyContent: "center",
      alignItems: "center",
    },

    buttonContainter: {
      width: "100%",
      justifyContent: "space-between",
      alignItems: "center",
      padding: 5,
      height: "100%",
      position: "absolute",
      flexDirection: "row",
    },

    button: {
      backgroundColor: buttonBackgroundColor,
      justifyContent: "center",
      alignItems: "center",
      width: 35,
      height: 35,
      borderRadius: "50%",
      overflow: "hidden",
    },

    buttonIcon: {
      color: buttonIconColor,
    },
  });

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
      <View style={styles.buttonWrapper}></View>
      <View style={styles.buttonContainter}>
        <TouchableOpacity style={styles.button} onPress={handlePrevious}>
          <Text style={styles.buttonIcon}>🡨</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleNext}>
          <Text style={styles.buttonIcon}>🡪</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Carousel;
