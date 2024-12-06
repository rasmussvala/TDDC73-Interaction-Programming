import { StyleSheet } from "react-native";

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

export const styles = StyleSheet.create({
  wrapper: {
    padding: 4,
    width: 300,
  },
  inputWrapper: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    height: 40,
    borderWidth: 1,
    borderRadius: 8,
    marginVertical: 4,
  },
  input: {
    padding: 10,
    borderRadius: 8,
    flex: 1,
  },

  showButton: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },

  status: {
    height: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 4,
  },

  statusItem: {
    backgroundColor: colors.gray,
    flex: 1,
    marginTop: 4,
    borderRadius: 10,
  },

  statusTextWrapper: {
    height: 16,
  },

  statusText: {
    fontSize: 12,
    color: colors.darkGray,
  },

  recommendContainer: {
    marginTop: 8,
  },

  recommendHeader: {
    fontSize: 12,
    fontWeight: "bold",
  },

  recommendTextIcon: {
    fontSize: 12,
    fontWeight: "900",
  },

  recommendText: {
    fontSize: 12,
  },

  recommendation: {
    flexDirection: "row",
    gap: 4,
  },
});
