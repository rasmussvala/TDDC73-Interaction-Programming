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
  imageBorderRadius?: number;

  buttonBackgroundColor?: string;
  buttonIconColor?: string;

  autoplayTimer?: number;
  toggleButtons?: boolean;
};

/**
 * Carousel Component
 *
 * A React Native component for displaying a horizontally scrolling set of images. 1 - 3 images can be visable at the same time.
 * Learn more about how to use this component in the: [Carousel README](https://www.google.se)
 *
 * @component
 * @param {Object} props - The props for the component.
 * @param {ImageSourcePropType[]} props.images - An array of image sources to display in the carousel (e.g., require('./image.png')). Requires at least two images to function.
 * @param {number} props.wrapperWidth - The width of the carousel wrapper in pixels. Default is 220.
 * @param {number} props.imageWidth - The width of each image in pixels. Default is 100.
 * @param {number} props.imageHeight - The height of each image in pixels. Default is 100.
 * @param {number} props.imageMargin - The margin between individual images in pixels. Default is 5.
 * @param {string} props.imageBorderRadius - The border radius for each image in the carousel.
 * @param {string} props.buttonBackgroundColor - The background color of navigation buttons. Default is "#d3d3d3aa".
 * @param {string} props.buttonIconColor - The color of the navigation button icons. Default is "black".
 * @param {number} props.autoplayTimer - The interval of how long an image is visible. Minimum is 500 ms. If no value is given autoplay is off.
 * @param {boolean} props.toggleButtons - Toggle buttons on (true) or off (false). Default is true.
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
  wrapperWidth = 350,
  imageWidth = 200,
  imageHeight = 200,
  imageMargin = 5,
  imageBorderRadius = 5,
  buttonBackgroundColor = "#d3d3d3aa",
  buttonIconColor = "black",
  autoplayTimer = -1,
  toggleButtons = true,
}: Props) => {
  useEffect(() => {
    if (images.length < 2)
      throw new Error(
        "The Carousel component requires at least two images to function correctly. Please provide an array with two or more images."
      );
  }, [images]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const translateX = useSharedValue(0);
  const translateXValue = imageWidth + 2 * imageMargin;

  const handleNext = () => {
    translateX.value = withTiming(-translateXValue, { duration: 300 }, () => {
      setCurrentIndex((i) => (i + 1) % images.length);
    });
  };

  const handlePrevious = () => {
    translateX.value = withTiming(translateXValue, { duration: 300 }, () => {
      setCurrentIndex((i) => (i - 1 + images.length) % images.length);
    });
  };

  useEffect(() => {
    if (autoplayTimer < 500) return;

    const t = setInterval(() => {
      handleNext();
    }, autoplayTimer);

    return () => {
      clearInterval(t);
    };
  }, [autoplayTimer]);

  useEffect(() => {
    translateX.value = 0;
  }, [currentIndex]);

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
      borderRadius: imageBorderRadius,
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
      padding: 10,
      height: "100%",
      position: "absolute",
      flexDirection: "row",
    },

    button: {
      backgroundColor: buttonBackgroundColor,
      justifyContent: "center",
      alignItems: "center",
      width: 45,
      height: 45,
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
      {toggleButtons && (
        <View style={styles.buttonContainter}>
          <TouchableOpacity style={styles.button} onPress={handlePrevious}>
            <Text style={styles.buttonIcon}>←</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleNext}>
            <Text style={styles.buttonIcon}>→</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default Carousel;
