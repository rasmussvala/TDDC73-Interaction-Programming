import { useState } from "react";
import { View, Button, Text, Platform } from "react-native";
import { Picker } from "@react-native-picker/picker";

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
      <Text>Selected Language: {selectedLanguage}</Text>

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
    </View>
  );
};

export default PickerComponent;
