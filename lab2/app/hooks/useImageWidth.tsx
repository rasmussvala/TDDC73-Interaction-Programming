import { useState, useEffect } from "react";
import { Image, Platform } from "react-native";

const useImageWidth = (image: Object, imageHeight: number): number => {
  const [imageWidth, setImageWidth] = useState<number>(0);

  useEffect(() => {
    if (Platform.OS === "web") {
      // Handle required image
      Image.getSize(image.uri, (width, height) => {
        const aspectRatio = width / height;
        setImageWidth(imageHeight * aspectRatio);
      });
    } else {
      const { width, height } = Image.resolveAssetSource(image);
      const aspectRatio = width / height;
      setImageWidth(imageHeight * aspectRatio);
    }
  }, [image, imageHeight]);

  return imageWidth;
};

export default useImageWidth;
