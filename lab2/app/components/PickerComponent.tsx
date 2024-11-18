import { useState } from "react";
import { View, Button, Platform, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { colors, sizes } from "../theme";

const PickerComponent: React.FC = () => {
  const [selectedLanguage, setSelectedLanguage] = useState<string>("java");
  const [isPickerOpen, setIsPickerOpen] = useState<boolean>(false);

  function open() {
    setIsPickerOpen(true);
  }

  function close() {
    setIsPickerOpen(false);
  }

  return (
    <View>
      {/* iOS */}
      {Platform.OS == "ios" && (
        <>
          <Button
            title={isPickerOpen ? "Close Picker" : "Open Picker"}
            onPress={isPickerOpen ? close : open}
          />
          {isPickerOpen && (
            <Picker
              selectedValue={selectedLanguage}
              onValueChange={(itemValue) => setSelectedLanguage(itemValue)}
            >
              <Picker.Item label="Java" value="java" />
              <Picker.Item label="JavaScript" value="js" />
            </Picker>
          )}
        </>
      )}

      {/* Android and Web */}
      {Platform.OS != "ios" && (
        <View style={styles.container}>
          <View style={styles.pickerContainer}>
            <Picker
              style={styles.picker}
              selectedValue={selectedLanguage}
              onValueChange={(itemValue) => setSelectedLanguage(itemValue)}
            >
              <Picker.Item label="Java" value="java" />
              <Picker.Item label="JavaScript" value="js" />
            </Picker>
          </View>
          <View style={styles.pickerContainer}>
            <Picker
              style={styles.picker}
              selectedValue={selectedLanguage}
              onValueChange={(itemValue) => setSelectedLanguage(itemValue)}
            >
              <Picker.Item label="Java" value="java" />
              <Picker.Item label="JavaScript" value="js" />
            </Picker>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 8,
  },

  pickerContainer: {
    flex: 1,
    width: 0,
    height: 40,
  },

  picker: {
    backgroundColor: colors.container,
    borderWidth: sizes.borderWidth,
    borderRadius: sizes.borderRadius,
    borderColor: colors.border,
    paddingHorizontal: 8,
    height: "100%",
  },
});

export default PickerComponent;
