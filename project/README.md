# 🔒 PasswordStrengthMeter

A customizable React Native component for evaluating and displaying password strength. It provides password recommendations, dynamic status indicators, and support for password confirmation with visual feedback.

## Features

- **Password Strength Evaluation:** Dynamically evaluates the strength of a password based on configurable rules (length, uppercase, special characters, and numbers).
- **Customizable Color Palette:** Modify strength bar colors, warning colors, and other visual elements via props.
- **Recommendations Display:** Shows user-friendly recommendations for creating strong passwords.
- **Password Confirmation:** Includes an optional confirm-password field to ensure password consistency.
- **Dynamic Strength Bar:** A visual indicator that adapts to the strength of the entered password.
- **Fully Responsive:** Mobile-friendly design with adjustable width and styles.

## Usage

Below is an example of how to use the PasswordStrengthMeter component in your project. This example demonstrates how to configure the component with various options, such as minimum password length, character requirements, and the callback for password strength changes.

Simply follow the instructions to integrate it into your project and customize it according to your needs.

```typescript
const YourApp = () => {
  return (
    <PasswordStrengthMeter
      nrOfChars={8}
      hasAtLeastOneUpperCase={true}
      hasAtLeastOneSpecialChar={true}
      hasAtLeastOneNumber={true}
      confirmPassword={true}
      onStrengthChange={(strength) =>
        console.log("Password strength:", strength)
      }
      showRecomendations={true}
      colorPalette={{
        firstColor: "#ffcccc",
        secondColor: "#ffe066",
        thirdColor: "#9bf6ff",
        forthColor: "#2a9d8f",
        warning: "#e76f51",
      }}
      streangthText={["Weak", "Okay", "Good", "Strong"]}
    />
  );
};

export default YourApp;
```

# Styles and Colors

The default color palette is defined in the `styles` folder and can be overridden using the `colorPalette` prop.

```JavaScript
export const colors = {
  green: "#2a9d8f",
  yellow: "#bbce60",
  orange: "#f4a261",
  red: "#e76f51",
  gray: "#d3d3d3",
  darkGray: "#808080",
  black: "#000",
  warning: "#e76f5177",
};
```

## Props

| Name                           | Type       | Default Value | Description                                                                 |
| ------------------------------ | ---------- | ------------- | --------------------------------------------------------------------------- |
| `nrOfChars`                    | `number`   | `8`           | Minimum number of characters for a strong password.                         |
| `hasAtLeastOneUpperCase`       | `boolean`  | `true`        | Whether the password must include at least one uppercase letter.            |
| `hasAtLeastOneSpecialChar`     | `boolean`  | `true`        | Whether the password must include at least one special character.           |
| `hasAtLeastOneNumber`          | `boolean`  | `true`        | Whether the password must include at least one number.                      |
| `confirmPassword`              | `boolean`  | `true`        | Whether to include the confirm password input field and it's functionality. |
| `onStrengthChange`             | `function` | `undefined`   | Callback triggered when the password strength changes.                      |
| `showRecomendations`           | `boolean`  | `true`        | Whether to display password recommendations to the user.                    |
| `colorPalette`                 | `object`   | `undefined`   | Custom color palette for styling various components.                        |
| `colorPalette.firstColor`      | `string`   | `undefined`   | Color for the weakest strength level.                                       |
| `colorPalette.secondColor`     | `string`   | `undefined`   | Color for the low strength level.                                           |
| `colorPalette.thirdColor`      | `string`   | `undefined`   | Color for the medium strength level.                                        |
| `colorPalette.forthColor`      | `string`   | `undefined`   | Color for the strongest strength level.                                     |
| `colorPalette.warning`         | `string`   | `undefined`   | Color for warnings (e.g., mismatched passwords).                            |
| `colorPalette.darkColor`       | `string`   | `undefined`   | Dark color for text or other components.                                    |
| `colorPalette.mediumDarkColor` | `string`   | `undefined`   | Medium-dark color for secondary elements.                                   |
| `colorPalette.lightColor`      | `string`   | `undefined`   | Light color for backgrounds or accents.                                     |
| `streangthText`                | `string[]` | `undefined`   | Custom labels for strength levels (array of exactly 4 strings).             |
