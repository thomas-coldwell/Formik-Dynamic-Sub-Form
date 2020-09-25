import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    justifyContent: "flex-start",
    alignItems: "center",
    padding: 30,
    paddingVertical: 60,
  },
  subForm: {
    width: "100%",
    backgroundColor: "#eef",
    padding: 10,
    marginBottom: 20,
  },
  input: {
    borderWidth: 0.2,
    borderColor: "#ccc",
    width: "100%",
    height: 40,
    paddingLeft: 15,
  },
  output: {
    backgroundColor: "#eee",
    width: "100%",
    marginBottom: 10,
    padding: 10,
  },
});
