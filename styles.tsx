import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    padding: 30,
    paddingVertical: 60,
  },
  input: {
    borderWidth: 0.2,
    borderColor: "#ccc",
    width: 300,
    height: 40,
    paddingLeft: 15,
  },
  output: {
    backgroundColor: "#eee",
    width: "100%",
  },
});
