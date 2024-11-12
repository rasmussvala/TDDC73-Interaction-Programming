import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from "react-native";

export default function App() {
  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        <View style={styles.card}></View>
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
            <Text>Expiration Date</Text>
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
            <Text>CVV</Text>
            <TextInput style={styles.singleInputField} />
          </View>
        </View>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const colors = {
  background: "green",
  container: "red",
  border: "purple",
  text: "black",
  button: "blue",
  buttonText: "white",
};

const sizes = {
  borderWidth: 1,
  borderRadius: 6,
  marginVertical: 8,
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: "center",
    justifyContent: "center",
  },

  container: {
    marginVertical: 4,
    padding: 20,
    backgroundColor: colors.container,
    borderRadius: 2 * sizes.borderRadius,
  },

  card: {
    transform: [{ translateY: -100 }],
    backgroundColor: "purple",
    height: 200,
    width: 300,
  },

  singleInputFieldContainer: {
    marginVertical: sizes.marginVertical,
  },

  singleInputFieldText: {
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
  },

  datesInputFields: {
    flex: 0.5,
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
