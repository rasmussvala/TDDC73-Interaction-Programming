import React from "react";
import { View, Image, StyleSheet, ImageSourcePropType } from "react-native";

type Props = {
  images: ImageSourcePropType[];
};

const Carousel: React.FC<Props> = ({ images }) => {
  return (
    <View>
      {images.map((image, index) => (
        <Image key={index} source={image} style={styles.image} />
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
