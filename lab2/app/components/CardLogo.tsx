import React, { useEffect, useRef } from "react";
import { Image, Animated } from "react-native";
import type { ImageSourcePropType } from "react-native";

interface CardLogoProps {
  firstFourDigits: string;
  logoSource: ImageSourcePropType;
  logoHeight: number;
  logoWidth: number;
}

const CardLogo: React.FC<CardLogoProps> = ({
  firstFourDigits,
  logoSource,
  logoHeight,
  logoWidth,
}) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const prevLengthRef = useRef<number>(0);

  useEffect(() => {
    if (!firstFourDigits || firstFourDigits === "####") return;

    const currentLength = firstFourDigits.length;
    const prevLength = prevLengthRef.current;

    const thresholdDown = prevLength >= 4 && currentLength < 4;
    const thresholdUp = prevLength < 4 && currentLength >= 4;

    if (thresholdDown) {
      Animated.sequence([
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: false,
        }),
      ]).start();
    } else if (thresholdUp) {
      Animated.sequence([
        Animated.delay(200),
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: false,
        }),
      ]).start();
    }

    // Update the ref for next render
    prevLengthRef.current = currentLength;
  }, [firstFourDigits]);

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
