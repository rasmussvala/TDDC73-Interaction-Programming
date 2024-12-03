# 🔒 PasswordStrengthMeter

A customizable React Native component for evaluating and displaying password strength. It provides password recommendations, dynamic status indicators, and support for password confirmation with visual feedback.

## Features

- **Password Strength Evaluation:** Dynamically evaluates the strength of a password, in the rage 0 to 1, based on configurable rules (length, uppercase, special characters, and numbers).
- Modify strength bar colors, warning colors.
- Shows user-friendly recommendations for creating strong passwords.
- Includes an optional confirm-password field to ensure password consistency.
- A visual indicator that adapts to the strength of the entered password.
- Mobile-friendly design with adjustable styles.

## Usage

Below is an example of how to use the PasswordStrengthMeter component in your project. This example demonstrates how to configure the component with various options, such as minimum password length, character requirements, and the callback for password strength changes.

```typescript
const App = () => {
  const handleStrengthChange = (strength: number) => {
    if (strength === 1) {
      // Password is strong. Do something
    }
  };

  return (
    <PasswordStrengthMeter
      nrOfChars={8}
      hasAtLeastOneUpperCase={true}
      hasAtLeastOneSpecialChar={true}
      hasAtLeastOneNumber={true}
      confirmPassword={true}
      onStrengthChange={handleStrengthChange}
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

## Props

| Name                       | Type       | Default Value                        | Description                                                                                  | Optional |
| -------------------------- | ---------- | ------------------------------------ | -------------------------------------------------------------------------------------------- | -------- |
| `nrOfChars`                | `number`   | `8`                                  | Minimum number of characters for a strong password.                                          | Yes      |
| `hasAtLeastOneUpperCase`   | `boolean`  | `true`                               | Whether the password must include at least one uppercase letter.                             | Yes      |
| `hasAtLeastOneSpecialChar` | `boolean`  | `true`                               | Whether the password must include at least one special character.                            | Yes      |
| `hasAtLeastOneNumber`      | `boolean`  | `true`                               | Whether the password must include at least one number.                                       | Yes      |
| `confirmPassword`          | `boolean`  | `true`                               | Whether to include the confirm password input field and its functionality.                   | Yes      |
| `onStrengthChange`         | `function` |                                      | Callback triggered when the password strength changes. Return a strength number between 0-1. | Yes      |
| `showRecomendations`       | `boolean`  | `true`                               | Whether to display password recommendations to the user.                                     | Yes      |
| `colorPalette`             | `object`   |                                      | Custom color palette for styling various components.                                         | Yes      |
| `colorPalette.firstColor`  | `string`   | `#e76f51`                            | Color for the weakest strength level.                                                        | Yes      |
| `colorPalette.secondColor` | `string`   | `#f4a261`                            | Color for the low strength level.                                                            | Yes      |
| `colorPalette.thirdColor`  | `string`   | `#bbce60`                            | Color for the medium strength level.                                                         | Yes      |
| `colorPalette.forthColor`  | `string`   | `#2a9d8f`                            | Color for the strongest strength level.                                                      | Yes      |
| `colorPalette.warning`     | `string`   | `#e76f5177`                          | Color for warnings (e.g., mismatched passwords).                                             | Yes      |
| `strengthText`             | `string[]` | `["Weak", "Okay", "Good", "Strong"]` | Custom labels for strength levels (array of exactly 4 strings).                              | Yes      |

# 🎠 Carousel

A React Native component for displaying a horizontally scrolling set of images. The Carousel is versatile, customizable, and can display 1–3 images at a time.

## Features

- Display 1–3 images simultaneously in a rotating carousel.
- Configurable image dimensions, margins, and border radius.
- Optional navigation buttons for manual control.
- Autoplay functionality with configurable intervals.
- Customizable button styles, including background color and icon color.

## Usage

To use the Carousel you need to pass the images as arguments to the Carousel component.

```typescript
const App = () => {
  const images = [
    require('./image1.jpg'),
    require('./image2.jpg'),
    require('./image3.jpg'),
    // Add all your images here
  ];

  return (
    <Carousel images={{images}}>
  );
};

export default Carousel;
```

## Props

| Name                    | Type                    | Default       | Description                                                                                                                     | Optional |
| ----------------------- | ----------------------- | ------------- | ------------------------------------------------------------------------------------------------------------------------------- | -------- |
| `images`                | `ImageSourcePropType[]` | **Required**  | An array of image sources to display in the carousel (e.g., `require('./image.png')`) Requires at least two images to function. | No       |
| `wrapperWidth`          | `number`                | `350`         | The width of the carousel wrapper in pixels.                                                                                    | Yes      |
| `imageWidth`            | `number`                | `200`         | The width of each image in pixels.                                                                                              | Yes      |
| `imageHeight`           | `number`                | `200`         | The height of each image in pixels.                                                                                             | Yes      |
| `imageMargin`           | `number`                | `5`           | The margin between individual images in pixels.                                                                                 | Yes      |
| `imageBorderRadius`     | `string`                | `5`           | The border radius for each image in the carousel.                                                                               | Yes      |
| `buttonBackgroundColor` | `string`                | `"#d3d3d3aa"` | The background color of navigation buttons.                                                                                     | Yes      |
| `buttonIconColor`       | `string`                | `"black"`     | The color of the navigation button icons.                                                                                       | Yes      |
| `autoplayTimer`         | `number`                | `-1`          | Interval in milliseconds for autoplay (min: 500ms). Set to `-1` to disable autoplay.                                            | Yes      |
| `toggleButtons`         | `boolean`               | `true`        | Whether to show navigation buttons (`true`) or hide them (`false`).                                                             | Yes      |
