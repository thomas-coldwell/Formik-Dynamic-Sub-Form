import * as Yup from "yup";

export const isRequired = Yup.string().required("Required");

export const notRequired = Yup.string().notRequired();

export const formValidation = Yup.object().shape({
  name: isRequired,
  subForm: Yup.object(),
});

export type FormValues = {
  name: string;
  subForm: {
    email?: string;
    phone?: string;
  };
};

export interface FormDetails {
  values: {};
  validation: any;
}
