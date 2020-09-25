import * as React from "react";
import { Switch, View, Platform } from "react-native";
import { useFormik, FormikProps, FormikValues } from "formik";
import * as Yup from "yup";
import { FormDetails, FormValues, isRequired, notRequired } from "./Validation";
import Input from "./Input";
import { styles } from "./styles";
import DropDownPicker from "react-native-dropdown-picker";
import { Picker } from "@react-native-community/picker";

interface IOtherFromProps {
  formik: FormikProps<FormValues>;
  onChangeForm: (formDetails: FormDetails) => void;
}

type Fields = "email" | "phone";

const dropDownItems = [
  { label: "Email only", value: "email-only" },
  { label: "Email and Phone", value: "email-and-phone" },
];

type FormType = "email-only" | "email-and-phone";

type TypeFields = {
  [key: string]: Fields[];
};

const typeFields: TypeFields = {
  "email-only": ["email"],
  "email-and-phone": ["email", "phone"],
};

export default function OtherForm({ formik, onChangeForm }: IOtherFromProps) {
  //
  const [formType, setFormType] = React.useState<FormType>("email-only");

  const { values, errors, touched, setValues, handleBlur } = formik;

  const handleFormChange = (type: FormType) => {
    // Set required fields
    const fields = typeFields[type];
    setFormType(type);
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

  React.useEffect(() => {
    // Set up the initial values and validation schema on first render
    handleFormChange(formType);
  }, []);

  return (
    <View style={styles.subForm}>
      <Picker
        selectedValue={formType}
        style={{
          height: 40,
          width: "100%",
        }}
        onValueChange={(value: any) => handleFormChange(value)}
      >
        {dropDownItems.map((item) => (
          <Picker.Item value={item.value} key={item.value} label={item.label} />
        ))}
      </Picker>
      {!!formType &&
        typeFields[formType].map((field) => (
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
            touched={touched.subForm && touched.subForm[field]}
            onBlur={handleBlur("subForm." + field)}
          />
        ))}
    </View>
  );
}
