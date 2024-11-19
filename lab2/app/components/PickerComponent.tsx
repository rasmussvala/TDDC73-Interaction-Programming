import { useState } from "react";
import { View, Button, Platform, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { colors, sizes } from "../theme";

const PickerComponent: React.FC = () => {
  const [month, setMonth] = useState<string>("05");
  const [year, setYear] = useState<string>("2028");
  const [isMonthPickerOpen, setIsMonthPickerOpen] = useState<boolean>(false);
  const [isYearPickerOpen, setIsYearPickerOpen] = useState<boolean>(false);

  function openMonth() {
    setIsMonthPickerOpen(true);
    setIsYearPickerOpen(false);
  }

  function closeMonth() {
    setIsMonthPickerOpen(false);
  }

  function openYear() {
    setIsYearPickerOpen(true);
    setIsMonthPickerOpen(false);
  }

  function closeYear() {
    setIsYearPickerOpen(false);
  }

  return (
    <View>
      {/* iOS */}
      {Platform.OS == "ios" && (
        <>
          <View style={styles.buttonContainer}>
            <View style={styles.buttonIOS}>
              <Button
                title={month}
                onPress={isMonthPickerOpen ? closeMonth : openMonth}
              />
            </View>
            <View style={styles.buttonIOS}>
              <Button
                title={year}
                onPress={isYearPickerOpen ? closeYear : openYear}
              />
            </View>
          </View>
          {isMonthPickerOpen && (
            <View style={styles.pickerContainerIOS}>
              <Picker
                style={styles.pickerIOS}
                selectedValue={month}
                onValueChange={(itemValue) => setMonth(itemValue)}
              >
                <Picker.Item label="01" value="01" />
                <Picker.Item label="02" value="02" />
                <Picker.Item label="03" value="03" />
                <Picker.Item label="04" value="04" />
                <Picker.Item label="05" value="05" />
                <Picker.Item label="06" value="06" />
                <Picker.Item label="07" value="07" />
                <Picker.Item label="08" value="08" />
                <Picker.Item label="09" value="09" />
                <Picker.Item label="10" value="10" />
                <Picker.Item label="11" value="11" />
                <Picker.Item label="12" value="12" />
              </Picker>
            </View>
          )}

          {isYearPickerOpen && (
            <View style={styles.pickerContainerIOS}>
              <Picker
                style={styles.pickerIOS}
                selectedValue={year}
                onValueChange={(itemValue) => setYear(itemValue)}
              >
                <Picker.Item label="2024" value="2024" />
                <Picker.Item label="2025" value="2025" />
                <Picker.Item label="2026" value="2026" />
                <Picker.Item label="2027" value="2027" />
                <Picker.Item label="2028" value="2028" />
                <Picker.Item label="2029" value="2029" />
                <Picker.Item label="2030" value="2030" />
              </Picker>
            </View>
          )}
        </>
      )}

      {/* Android and Web */}
      {Platform.OS != "ios" && (
        <View style={styles.buttonContainer}>
          <View style={styles.pickerContainerWebAndAndroid}>
            <Picker
              style={styles.pickerWebAndAndroid}
              selectedValue={month}
              onValueChange={(itemValue) => setMonth(itemValue)}
            >
              <Picker.Item label="Java" value="java" />
              <Picker.Item label="JavaScript" value="js" />
            </Picker>
          </View>
          <View style={styles.pickerContainerWebAndAndroid}>
            <Picker
              style={styles.pickerWebAndAndroid}
              selectedValue={month}
              onValueChange={(itemValue) => setMonth(itemValue)}
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
  buttonContainer: {
    flexDirection: "row",
    gap: 8,
  },

  pickerContainerWebAndAndroid: {
    flex: 1,
    width: 0,
    height: 40,
  },

  pickerWebAndAndroid: {
    backgroundColor: colors.container,
    borderWidth: sizes.borderWidth,
    borderRadius: sizes.borderRadius,
    borderColor: colors.border,
    paddingHorizontal: 8,
    height: "100%",
  },

  buttonIOS: {
    backgroundColor: colors.container,
    borderWidth: sizes.borderWidth,
    borderRadius: sizes.borderRadius,
    borderColor: colors.border,
    flex: 0.5,
  },

  pickerContainerIOS: {
    backgroundColor: colors.container,
    borderWidth: sizes.borderWidth,
    borderRadius: sizes.borderRadius,
    borderColor: colors.border,

    position: "absolute",
    top: 48,
    height: 150,
    overflow: "hidden",
    width: "100%",
    zIndex: 999,
  },

  pickerIOS: {
    // Sry for bad code
    transform: [{ translateY: -35 }],
  },
});

export default PickerComponent;
