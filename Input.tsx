import React from "react";
import { TextInput, Text, TextInputProps, View } from "react-native";

interface IInputProps extends TextInputProps {
  error?: string;
  touched?: boolean;
}

export default function Input(props: IInputProps) {
  const { error, touched, ...inputProps } = props;
  return (
    <View style={{ width: "100%", marginBottom: 10 }}>
      <TextInput {...inputProps} />
      {!!error && !!touched && (
        <Text style={{ color: "#f00" }}>{"* " + error}</Text>
      )}
    </View>
  );
}
