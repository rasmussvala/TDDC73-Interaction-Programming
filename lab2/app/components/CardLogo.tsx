import React, { useEffect, useRef } from "react";
import { Image, Animated } from "react-native";
import type { ImageSourcePropType } from "react-native";

interface CardLogoProps {
  logoSource: ImageSourcePropType;
  logoHeight: number;
  logoWidth: number;
}

const CardLogo: React.FC<CardLogoProps> = ({
  logoSource,
  logoHeight,
  logoWidth,
}) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    fadeAnim.setValue(0);

    Animated.sequence([
      // Wait for logo to format
      Animated.delay(200),
      // Fade in
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: false,
      }),
    ]).start();
  }, [logoSource]);

  return (
    <Animated.View style={{ opacity: fadeAnim }}>
      <Image
        source={logoSource}
        style={{
          height: logoHeight,
          width: logoWidth,
          maxWidth: 80,
        }}
        resizeMode="contain"
      />
    </Animated.View>
  );
};

export default CardLogo;
