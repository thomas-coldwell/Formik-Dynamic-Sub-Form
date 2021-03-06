import * as React from "react";
import { Text, View, Button, ScrollView } from "react-native";
import { useFormik } from "formik";
import OtherForm from "./OtherForm";
import Input from "./Input";
import { styles } from "./styles";
import { FormDetails, formValidation, FormValues } from "./Validation";

export const mainFormInitialValues = {
  name: "",
  subForm: {},
};

export default function App() {
  // The output of the form
  const [result, setResult] = React.useState({});

  const [initialValues, setInitialValues] = React.useState<FormValues>(
    mainFormInitialValues
  );
  const [validation, setValidation] = React.useState(formValidation);

  // Just save the output of the form to be
  const onSubmit = (values: FormValues) => setResult(values);

  // Define the formik hook
  const formik = useFormik({
    initialValues,
    validationSchema: validation,
    onSubmit: (values) => onSubmit(values),
    validateOnBlur: true,
  });

  // Destructure the formik bag
  const {
    values,
    errors,
    touched,
    handleChange,
    handleSubmit,
    validateForm,
    handleBlur,
  } = formik;

  // Any time we dynamically change the validation schema revalidate the
  // form
  React.useEffect(() => {
    validateForm();
  }, [validation]);

  // If a dynamic form changes then handle the update of the initial values
  // and validation schema here
  const handleFormChange = (formDetails: FormDetails) => {
    // Set the intitial values and validation schema based on the form change
    setInitialValues({ ...initialValues, ...formDetails.values });
    const newSchema = validation.shape(formDetails.validation);
    setValidation(newSchema);
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Input
          style={styles.input}
          placeholder="name"
          onChangeText={handleChange("name")}
          onBlur={handleBlur("name")}
          value={values.name}
          error={errors.name}
          touched={touched.name}
        />
        <OtherForm
          formik={formik}
          onChangeForm={(formDetails: FormDetails) =>
            handleFormChange(formDetails)
          }
        />
        <View style={{ width: "100%", marginBottom: 20 }}>
          <Button onPress={handleSubmit as any} title="Submit" />
        </View>
        <Text style={styles.output}>
          {"Initial Values: " + JSON.stringify(initialValues, null, 2)}
        </Text>
        <Text style={styles.output}>
          {"Live Values: " + JSON.stringify(values, null, 2)}
        </Text>
        <Text style={styles.output}>
          {"Form Output: " + JSON.stringify(result, null, 2)}
        </Text>
      </View>
    </ScrollView>
  );
}
