import * as React from "react";
import { Switch, View, Platform } from "react-native";
import { useFormik, FormikProps, FormikValues } from "formik";
import * as Yup from "yup";
import { FormDetails, FormValues, isRequired, notRequired } from "./Validation";
import Input from "./Input";
import { styles } from "./styles";
import DropDownPicker from "react-native-dropdown-picker";

interface IOtherFromProps {
  formik: FormikProps<FormValues>;
  onChangeForm: (formDetails: FormDetails) => void;
}

type Fields = "email" | "phone";

const dropDownItems = [
  { label: "Email only", value: "email-only" },
  { label: "Email and Phone", value: "email-and-phone" },
];

type TypeFields = {
  [key: string]: Fields[];
};

const typeFields: TypeFields = {
  "email-only": ["email"],
  "email-and-phone": ["email", "phone"],
};

export default function OtherForm({ formik, onChangeForm }: IOtherFromProps) {
  //
  const [requiredFields, setRequiredFields] = React.useState<Fields[]>([]);

  const { values, errors, handleChange, setValues, setFieldValue } = formik;

  const handleFormChange = (type: "email-only" | "email-and-phone") => {
    // Set required fields
    const fields = typeFields[type];
    setRequiredFields(fields);
    // Create the values object from the array of required fields
    // re-using previously entered values if present
    const formValues = fields.reduce(
      (obj, item) => ({
        ...obj,
        [item]: values.subForm[item] ? values.subForm[item] : "",
      }),
      {}
    );
    // Create the validation schema to require each of these values
    const formSchema = fields.reduce(
      (obj, item) => ({ ...obj, [item]: isRequired }),
      {}
    );
    // Set the initial values and validation schema for the form in its new state
    onChangeForm({
      values: {
        subForm: formValues,
      },
      validation: {
        subForm: Yup.object(formSchema),
      },
    });
    // Set the current live values
    setValues({ ...values, subForm: formValues });
  };

  return (
    <>
      <DropDownPicker
        containerStyle={{
          height: 40,
          width: 300,
          marginBottom: 100,
        }}
        items={dropDownItems}
        onChangeItem={(item) => handleFormChange(item.value)}
      />
      {requiredFields.map((field) => (
        <Input
          key={field}
          style={styles.input}
          placeholder={field}
          onChangeText={(text) =>
            setValues({
              ...values,
              subForm: { ...values.subForm, [field]: text },
            })
          }
          value={values.subForm[field]}
          error={errors.subForm && errors.subForm[field]}
        />
      ))}
    </>
  );
}
