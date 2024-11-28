import React, { useState } from "react";
import { Image, StyleSheet, ImageSourcePropType, View } from "react-native";

type Props = {
  images: ImageSourcePropType[];
};

const Carousel = ({ images }: Props) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <View>
      {images.map((image, index) => (
        <View key={index}>
          {currentIndex === index && (
            <Image source={image} style={styles.image} />
          )}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    width: 200,
    height: 200,
  },
});

export default Carousel;
