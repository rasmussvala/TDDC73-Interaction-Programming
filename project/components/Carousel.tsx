import React from "react";
import {
  Image,
  StyleSheet,
  ImageSourcePropType,
  ScrollView,
} from "react-native";

type Props = {
  images: ImageSourcePropType[];
};

const Carousel: React.FC<Props> = ({ images }) => {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.container}
    >
      {images.map((image, index) => (
        <Image key={index} source={image} style={styles.image} />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    // ADD SOMETHING
  },

  image: {
    width: 200,
    height: 200,
    margin: 5,
  },
});

export default Carousel;
