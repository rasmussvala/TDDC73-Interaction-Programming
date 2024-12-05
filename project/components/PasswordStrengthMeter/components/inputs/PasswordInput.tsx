import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { styles } from "../../styles/styles";

type Props = {
  value: string;
  onChangeText: (value: string) => void;
  showInput: boolean;
  setShowInput: (value: boolean) => void;
  placeholder: string;
};

const PasswordInput = ({
  value,
  onChangeText,
  showInput,
  setShowInput,
  placeholder,
}: Props) => {
  const handleChangeText = (text: string) => {
    const filteredText = text.replace(/\s/g, "");
    onChangeText(filteredText);
  };

  return (
    <View style={styles.inputWrapper}>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        value={value}
        onChangeText={handleChangeText}
        secureTextEntry={!showInput}
      />
      <TouchableOpacity
        style={styles.showButton}
        onPress={() => setShowInput(!showInput)}
      >
        <Text>{showInput ? "Hide" : "Show"}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default PasswordInput;
