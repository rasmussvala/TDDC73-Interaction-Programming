import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from "react-native";

import { colors, sizes } from "./theme";
import Card from "./Card";
import PickerComponent from "./components/PickerComponent";

export default function App() {
  return (
    <View style={styles.wrapper}>
      <Card />
      <View style={styles.container}>
        <View style={styles.singleInputFieldContainer}>
          <Text style={styles.singleInputFieldText}>Card Number</Text>
          <TextInput style={styles.singleInputField} />
        </View>
        <View style={styles.singleInputFieldContainer}>
          <Text style={styles.singleInputFieldText}>Card Name</Text>
          <TextInput style={styles.singleInputField} />
        </View>
        <View style={styles.rowInputFieldContainer}>
          <View style={styles.expirationDatesInputsContainer}>
            <Text style={styles.singleInputFieldText}>Expiration Date</Text>
            <View style={styles.expirationDatesInputs}>
              <TextInput
                style={[styles.singleInputField, styles.datesInputFields]}
              />
              <TextInput
                style={[styles.singleInputField, styles.datesInputFields]}
              />
            </View>
          </View>
          <View style={styles.cvvContainer}>
            <Text style={styles.singleInputFieldText}>CVV</Text>
            <TextInput style={styles.singleInputField} />
          </View>
        </View>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
        <PickerComponent />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: "center",
    justifyContent: "center",
  },

  container: {
    width: 350,
    height: 400,
    marginVertical: 4,
    padding: 20,
    backgroundColor: colors.container,
    borderRadius: 2 * sizes.borderRadius,
    justifyContent: "flex-end",
    elevation: 10,
  },

  singleInputFieldContainer: {
    marginVertical: sizes.marginVertical,
  },

  singleInputFieldText: {
    color: colors.text,
    fontSize: 14,
  },

  singleInputField: {
    backgroundColor: colors.container,
    borderWidth: sizes.borderWidth,
    borderRadius: sizes.borderRadius,
    borderColor: colors.border,
    paddingHorizontal: 8,
    paddingVertical: 6,
    fontSize: 18,
  },

  rowInputFieldContainer: {
    flexDirection: "row",
    gap: 16,
    marginBottom: sizes.marginVertical,
  },

  expirationDatesInputsContainer: {
    flex: 0.67,
  },

  expirationDatesInputs: {
    flexDirection: "row",
    gap: 8,
    overflow: "hidden",
  },

  datesInputFields: {
    flex: 0.5,
    width: 0,
  },

  cvvContainer: {
    flex: 0.33,
  },

  button: {
    backgroundColor: colors.button,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: sizes.borderRadius,
    padding: 10,
    marginVertical: sizes.marginVertical,
  },
  buttonText: {
    fontSize: 18,
    color: colors.buttonText,
  },
});
