import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  ImageBackground,
  Text,
  Image,
  Animated,
} from "react-native";
import { colors, sizes } from "./theme";
import useImageWidth from "./hooks/useImageWidth";
import { getCardType, getLogo } from "./cardLogoUtils";
import { getBackgroundImage } from "./backgroundImageUtils";

interface CardBackProps {
  cvvText?: string;
  card4FirstNumbers?: string;
  backgroundImageIndex?: string;
}

export default function CardBack({
  cvvText = "",
  card4FirstNumbers = "",
  backgroundImageIndex = "21",
}: CardBackProps) {
  const backgroundImage = getBackgroundImage(backgroundImageIndex);

  const logoHeight = 40;
  const logoSource = getLogo(getCardType(card4FirstNumbers));
  const logoWidth = useImageWidth(logoSource, logoHeight);

  const [cvvTextArray, setCVVTextArray] = useState<Array<string>>([]);
  const [animations, setAnimations] = useState<Array<Animated.Value>>([]);

  useEffect(() => {
    const newCvvTextArray = cvvText.split("");

    // If the text is growing, add new animations for the new characters
    if (newCvvTextArray.length > cvvTextArray.length) {
      const newAnimations = newCvvTextArray
        .slice(cvvTextArray.length)
        .map(() => new Animated.Value(0));
      setAnimations((prevAnimations) => [...prevAnimations, ...newAnimations]);

      // Trigger fade-in animation for the new characters added
      newAnimations.forEach((animation) => {
        Animated.timing(animation, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }).start();
      });
    }

    // If the text is shrinking (characters are removed), handle fade-out animation
    if (newCvvTextArray.length < cvvTextArray.length) {
      const removedCharactersCount =
        cvvTextArray.length - newCvvTextArray.length;
      const remainingAnimations = animations.slice(0, newCvvTextArray.length);

      // Animate fade-out for removed characters
      for (let i = 0; i < removedCharactersCount; i++) {
        const animation = animations[cvvTextArray.length - 1 - i];
        Animated.timing(animation, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }).start();
      }

      setAnimations(remainingAnimations);
    }

    // Update the cvvTextArray state
    setCVVTextArray(newCvvTextArray);
  }, [cvvText]);

  return (
    <ImageBackground source={backgroundImage} style={styles.card}>
      <View style={styles.contentContainer}>
        <View style={styles.containerTop}>
          <View style={styles.blackBar} />
        </View>
        <View style={styles.containerCenter}>
          <View style={styles.cvvTextContainer}>
            <Text style={styles.cvvText}>CVV</Text>
          </View>
          <View style={styles.cvvInputContainer}>
            {cvvTextArray.map((char, index) => {
              const animation = animations[index];

              return (
                <Animated.Text
                  key={index}
                  style={{
                    opacity: animation ? animation : 1,
                    transform: animation
                      ? [
                          {
                            translateY: animation.interpolate({
                              inputRange: [0, 1],
                              outputRange: [30, 0],
                            }),
                          },
                        ]
                      : [],
                  }}
                >
                  {char}
                </Animated.Text>
              );
            })}
          </View>
        </View>
        <View style={styles.containerBottom}>
          <View>
            <Image
              source={logoSource}
              style={{
                height: logoHeight,
                width: logoWidth,
                maxWidth: 80,
              }}
              resizeMode="contain"
            />
          </View>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    flex: 1,
    paddingVertical: 16,
    transform: [{ scaleX: -1 }],
  },

  card: {
    flex: 1,
    transform: [{ scaleX: -1 }],
  },

  containerTop: {
    flex: 1,
    justifyContent: "flex-end",
  },

  blackBar: {
    backgroundColor: "#0b0f14",
    height: 40,
    marginBottom: 5,
  },

  containerCenter: {
    flex: 1,
  },

  cvvTextContainer: {
    alignItems: "flex-end",
  },

  cvvText: {
    marginHorizontal: 8,
    paddingHorizontal: 8,
    fontSize: 12,
    color: colors.cardText,
  },

  cvvInputContainer: {
    backgroundColor: "white",
    borderRadius: sizes.borderRadius,
    marginHorizontal: 8,
    paddingHorizontal: 8,
    alignItems: "center",
    justifyContent: "flex-end",
    height: 28,
    flexDirection: "row",
  },

  containerBottom: {
    flex: 1,
    alignItems: "flex-end",
    justifyContent: "center",
    marginHorizontal: 8,
  },
});
