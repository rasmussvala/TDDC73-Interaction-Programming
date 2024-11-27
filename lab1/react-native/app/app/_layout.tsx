import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerStyle: {
            backgroundColor: "#bfffe1", // Green background
          },
          headerTitleAlign: "center", // Center the header title
          headerTitle: "React Native",
          headerTitleStyle: {
            color: "#587567", // White font color
            fontSize: 24, // Increase font size
          },
        }}
      />
    </Stack>
  );
}
