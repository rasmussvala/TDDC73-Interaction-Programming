import { ImageSourcePropType } from "react-native";

export function getCardType(firstFourDigits: string): string {
  if (
    !firstFourDigits ||
    firstFourDigits.length !== 4 ||
    isNaN(Number(firstFourDigits))
  ) {
    return "Invalid input";
  }

  // Check the exact 4-digit prefix
  if (cardPrefixMap[firstFourDigits]) {
    return cardPrefixMap[firstFourDigits];
  }

  // Otherwise, check shorter prefixes (3 digits, 2 digits)
  for (let i = 3; i > 0; i--) {
    const prefix = firstFourDigits.slice(0, i);

    if (cardPrefixMap[prefix]) {
      return cardPrefixMap[prefix];
    }
  }

  return "Unknown";
}

export function getLogo(name: string): ImageSourcePropType {
  return logoMapping[name] || require("./assets/images/mastercard.png");
}

const cardPrefixMap: { [key: string]: string } = {
  "4": "Visa",
  "51": "Mastercard",
  "52": "Mastercard",
  "53": "Mastercard",
  "54": "Mastercard",
  "55": "Mastercard",
  "2221": "Mastercard",
  "2720": "Mastercard",
  "36": "Diners_Club",
  "38": "Diners_Club",
  "39": "Diners_Club",
  "6011": "Discover",
  "6221": "Discover",
  "6222": "Discover",
  "644": "Discover",
  "645": "Discover",
  "646": "Discover",
  "647": "Discover",
  "648": "Discover",
  "649": "Discover",
  "65": "Discover",
  "3528": "JCB",
  "3529": "JCB",
  "3530": "JCB",
  "3531": "JCB",
  "3532": "JCB",
  "3533": "JCB",
  "3534": "JCB",
  "3535": "JCB",
  "3536": "JCB",
  "3537": "JCB",
  "3538": "JCB",
  "3539": "JCB",
  "9792": "Troy",
  "62": "UnionPay",
};

const logoMapping: { [key: string]: ImageSourcePropType } = {
  Visa: require("./assets/images/visa.png"),
  Mastercard: require("./assets/images/mastercard.png"),
  Diners_Club: require("./assets/images/dinersclub.png"),
  Discover: require("./assets/images/discover.png"),
  JCB: require("./assets/images/jcb.png"),
  Troy: require("./assets/images/troy.png"),
  UnionPay: require("./assets/images/unionpay.png"),
};
