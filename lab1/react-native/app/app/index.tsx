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
            <Text>button 1a</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Text>button 1b</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button}>
            <Text>button 2a</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Text>button 2b</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.inputContainer}>
        <Text>Cat name</Text>
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
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 50,
    marginVertical: 10,
  },

  button: {
    backgroundColor: "#BFFFE1",
    width: 100,
    height: 32,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
  },

  inputContainer: {
    flexDirection: "row",
    marginVertical: 10,
    marginHorizontal: 40,
    alignItems: "center",
  },

  inputField: {
    marginHorizontal: 16,
    borderWidth: 2,
    borderRadius: 4,
    borderColor: "grey",
    padding: 4,
  },

  imageContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
  },

  image: {
    width: 200,
    height: 200,
    backgroundColor: "#BFFFE1",
    borderRadius: "50%",
  },
});
