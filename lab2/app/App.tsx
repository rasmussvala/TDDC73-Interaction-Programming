import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from "react-native";

import { colors, sizes } from "./theme";
import Card from "./Card";
import { useState, useEffect } from "react";

export default function App() {
  const cardNameInit = "FULL NAME";
  const cvvInit = "";
  const carNumberInit = "################";

  const [inFocus, setInFocus] = useState<string>("");

  const [cardNumber, setCardNumber] = useState<string>(carNumberInit);
  const [cardNumberInputValue, setCardNumberInputValue] = useState<string>("");
  const [cardNumberArray, setCardNumberArray] = useState<Array<string>>([]);

  const [cardName, setCardName] = useState<string>(cardNameInit);
  const [cardNameInputValue, setCardNameInputValue] = useState<string>("");

  const [cvvNumbers, setCVVNumbers] = useState<string>(cvvInit);
  const [cvvNumberInputValue, setCVVNumberInputValue] = useState<string>("");

  const handleTextChange = (
    text: string,
    textInit: string,
    stateInputUpdater: React.Dispatch<React.SetStateAction<string>>,
    stateUpdater: React.Dispatch<React.SetStateAction<string>>
  ) => {
    const filteredText = text.replace(/[^a-zA-ZÅÄÖåäö\s]/g, "").toUpperCase();

    stateInputUpdater(filteredText);
    stateUpdater(filteredText ? filteredText : textInit);
  };

  const handleNumberChange = (
    number: string,
    stateInputUpdater: React.Dispatch<React.SetStateAction<string>>,
    stateUpdater: React.Dispatch<React.SetStateAction<string>>,
    maxNumbers?: number
  ) => {
    let filteredText = number.replace(/[^0-9]/g, "");
    if (maxNumbers) filteredText = filteredText.slice(0, maxNumbers);

    stateInputUpdater(filteredText);
    stateUpdater(filteredText);
  };

  const setFocus = (areaName: string) => {
    setInFocus(areaName);
  };

  useEffect(() => {
    const numberString = cardNumber !== "" ? cardNumber : carNumberInit;

    const chunks = numberString.match(/.{1,4}/g) || [];
    setCardNumberArray(chunks);
  }, [cardNumber]);

  return (
    <View style={styles.wrapper}>
      <Card
        inFocus={inFocus}
        cardName={cardName}
        cvvText={cvvNumbers}
        cardNumbers={cardNumberArray}
      />
      <View style={styles.container}>
        <View style={styles.singleInputFieldContainer}>
          <Text style={styles.singleInputFieldText}>Card Number</Text>
          <TextInput
            style={styles.singleInputField}
            value={cardNumberInputValue}
            onChangeText={(value) =>
              handleNumberChange(
                value,
                setCardNumberInputValue,
                setCardNumber,
                32
              )
            }
            onFocus={() => setFocus("cardNumber")}
            onBlur={() => setFocus("")}
          />
        </View>
        <View style={styles.singleInputFieldContainer}>
          <Text style={styles.singleInputFieldText}>Card Name</Text>
          <TextInput
            style={styles.singleInputField}
            value={cardNameInputValue}
            onChangeText={(value) =>
              handleTextChange(
                value,
                cardNameInit,
                setCardNameInputValue,
                setCardName
              )
            }
            placeholder="Enter cardholder's name"
            onFocus={() => setFocus("cardHolder")}
            onBlur={() => setFocus("")}
          />
        </View>
        <View style={styles.rowInputFieldContainer}>
          <View style={styles.expirationDatesInputsContainer}>
            <Text style={styles.singleInputFieldText}>Expiration Date</Text>
            <View style={styles.expirationDatesInputs}>
              <TextInput
                style={[styles.singleInputField, styles.datesInputFields]}
                onFocus={() => setFocus("expires")}
                onBlur={() => setFocus("")}
              />
              <TextInput
                style={[styles.singleInputField, styles.datesInputFields]}
                onFocus={() => setFocus("expires")}
                onBlur={() => setFocus("")}
              />
            </View>
          </View>
          <View style={styles.cvvContainer}>
            <Text style={styles.singleInputFieldText}>CVVV</Text>
            <TextInput
              style={styles.singleInputField}
              value={cvvNumberInputValue}
              onChangeText={(value) =>
                handleNumberChange(
                  value,
                  setCVVNumberInputValue,
                  setCVVNumbers,
                  3
                )
              }
              onFocus={() => setFocus("cvv")}
              onBlur={() => setFocus("")}
            />
          </View>
        </View>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
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
    // phone
    elevation: 10,
    // web
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 40,
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
    paddingVertical: 10,
    fontSize: 14,
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
