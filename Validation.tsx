import * as Yup from "yup";

// Basic string required / not required schemas
export const isRequired = Yup.string().required("Required");
export const notRequired = Yup.string().notRequired();

// Default form validation
export const formValidation = Yup.object().shape({
  name: isRequired,
  subForm: Yup.object().notRequired(),
});

// Structure of form
export type FormValues = {
  name: string;
  subForm: {
    email?: string;
    phone?: string;
  };
};

export interface FormDetails {
  values: Partial<FormValues>;
  validation: {
    [key: string]: Yup.ObjectSchema<any>;
  };
}
