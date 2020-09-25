import React from "react";
import { TextInput, Text, TextInputProps, View } from "react-native";

interface IInputProps extends TextInputProps {
  error?: string;
}

export default function Input(props: IInputProps) {
  const { error, ...inputProps } = props;
  return (
    <View style={{ width: "100%", marginBottom: 10 }}>
      <TextInput {...inputProps} />
      {!!error && <Text style={{ color: "#f00" }}>{"* " + error}</Text>}
    </View>
  );
}
