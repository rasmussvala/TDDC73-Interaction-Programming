import React, { useState } from "react";
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from "react-native";

export default function Index() {
  const [catName, setCatName] = useState("");

  return (
    <View>
      <View style={styles.imageContainer}>
        <View style={styles.imageBackground}></View>
        <Image
          source={{
            uri: "https://icons.iconarchive.com/icons/iconarchive/cute-animal/512/Cute-Cat-icon.png",
          }}
          style={styles.image}
        />
      </View>
      <View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>BUTTON</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>BUTTON</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>BUTTON</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>BUTTON</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.inputText}>Cat name</Text>
        <TextInput
          style={styles.inputField}
          onChangeText={(inputName) => setCatName(inputName)}
          value={catName}
          placeholder="Enter cat name here..."
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    width: 200,
    height: 200,
  },

  imageContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    margin: 60,
  },

  imageBackground: {
    position: "absolute",
    width: 200,
    height: 200,
    backgroundColor: "#BFFFE1",
    borderRadius: 100,
  },

  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },

  button: {
    backgroundColor: "#d6d7d7",
    width: 160,
    height: 60,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    margin: 4,
  },

  buttonText: { fontSize: 16 },

  inputContainer: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  inputField: {
    borderWidth: 1,
    borderRadius: 4,
    borderColor: "grey",
    padding: 4,
    fontSize: 18,
    color: "grey",
  },

  inputText: {
    fontSize: 20,
    marginRight: 20,
  },
});
