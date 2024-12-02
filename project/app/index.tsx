import { View } from "react-native";
import { StatusBar } from "expo-status-bar";
import PasswordStrengthMeter from "@/components/PasswordStrengthMeter";
import Carousel from "@/components/Carousel";

export default function Index() {
  const images = [
    require("../assets/images/carousel/1.png"),
    require("../assets/images/carousel/2.png"),
    require("../assets/images/carousel/3.png"),
    require("../assets/images/carousel/4.png"),
    require("../assets/images/carousel/5.png"),
    require("../assets/images/carousel/6.png"),
  ];

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <StatusBar style="auto"></StatusBar>
      <Carousel
        images={images}
        imageWidth={10}
        imageHeight={100}
        imageMargin={50}
        wrapperWidth={250}
      />
    </View>
  );
}
