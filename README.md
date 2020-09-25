# Formik Dynamic Sub Form

An example project showing how dynamic sub forms can be achieved with Formik and Yup. This example has a form with a drop down to select the form type. When this is selected it looks up what fields are required for this form and sets their values and corresponding Yup schema dynamically as props to Formik.

This is a bit of a silly use case here, but is a very real issue a lot of people tend to run into. For example, we had a dynamic form where you could add a photo and then select a copyright license for that photo whihc had certain required fields dependant upon the license type selected.
