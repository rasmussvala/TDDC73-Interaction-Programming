import { TextInput, View } from "react-native";
import { colors, styles } from "../../styles/styles";

type ConfirmPasswordInputProps = {
  value: string;
  onChangeText: React.Dispatch<React.SetStateAction<string>>;
  isCorrect: boolean;
  showInput: boolean;
  visible?: boolean;
};

const ConfirmPasswordInput = ({
  visible = true,
  value,
  onChangeText,
  isCorrect,
  showInput,
}: ConfirmPasswordInputProps) => {
  return (
    <View>
      {visible && (
        <View
          key={"key-" + isCorrect}
          style={[
            styles.inputWrapper,
            { backgroundColor: isCorrect ? "none" : colors.warning },
          ]}
        >
          <TextInput
            style={styles.input}
            placeholder="Confirm password"
            value={value}
            onChangeText={onChangeText}
            secureTextEntry={!showInput}
          />
        </View>
      )}
    </View>
  );
};

export default ConfirmPasswordInput;
