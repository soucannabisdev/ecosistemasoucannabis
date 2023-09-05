import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';

const EmailInput = ({ handleChangeInput, onBlur, setButtonDisabled }) => (

  <div>
    <Formik
      initialValues={{ email: '' }}
      validate={values => {
        const errors = {};
        if (!values.email) {
          setButtonDisabled(true)
        } else if (
          !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
        ) {
          errors.email = 'Endereço de e-mail inválido';
          setButtonDisabled(true)
        } else {
          setButtonDisabled(false)
        }
        
        return errors;
      }}
    >
      {({ handleChange, handleBlur }) => (
        <Form>
          <Field
          id="email"
            class="form-control"
            type="email"
            name="email"
            onBlur={(e) => {
              handleBlur(e);
              onBlur(e);
            }}
            onChange={(e) => {
              handleChange(e);
              handleChangeInput(e);
            }}
          />
          <ErrorMessage name="email" component="div" class="errorInput" />
        </Form>
      )}
    </Formik>
  </div>
);

export default EmailInput;
