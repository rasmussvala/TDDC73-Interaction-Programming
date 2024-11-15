import {
  View,
  StyleSheet,
  ImageBackground,
  Text,
  Image,
  Platform,
} from "react-native";
import { colors, sizes } from "./theme";
import { useEffect, useState } from "react";

export default function CardBack() {
  // Same as in cardFront
  const logoHeight = 40;
  const [logoWidth, setlogoWidth] = useState<number>(-1);
  const logoSource = require("./assets/images/mastercard.png");

  useEffect(() => {
    let calculatedWidth = -1;

    if (Platform.OS == "web") {
      Image.getSize(logoSource.uri, (width, height) => {
        const aspectRatio = width / height;
        calculatedWidth = logoHeight * aspectRatio;
        setlogoWidth(calculatedWidth);
      });
    }
    // Android and iOS
    else {
      const { width, height } = Image.resolveAssetSource(logoSource);
      const aspectRatio = width / height;
      calculatedWidth = logoHeight * aspectRatio;
      setlogoWidth(calculatedWidth);
    }
  }, []);

  return (
    <ImageBackground
      source={require("./assets/images/21.jpeg")}
      style={styles.card}
    >
      <View style={styles.contentContainer}>
        <View style={styles.containerTop}>
          <View style={styles.blackBar} />
        </View>
        <View style={styles.containerCenter}>
          <View style={styles.cvvTextContainer}>
            <Text style={styles.cvvText}>CVV</Text>
          </View>
          <View style={styles.cvvInputContainer}>
            <Text>3231</Text>
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
    padding: 8,
    alignItems: "flex-end",
  },

  containerBottom: {
    flex: 1,
    alignItems: "flex-end",
    justifyContent: "center",
    marginHorizontal: 8,
  },
});
