import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import PhoneInput from 'react-phone-number-input'


const PhoneNumberInput = () => {
  const [phone, setPhone] = useState('');
  const [buttonDisable, setButtonDisable] = useState(true);

  const [value, setValue] = useState()

  return (
    <div>
      <Formik
        initialValues={{ phone: '' }}
        validate={values => {

          console.log(values.phone)

          const errors = {};

          if (!values.phone) {
            errors.phone = 'Required';
          }
          return errors;
        }}
      >
        {({ handleChange }) => (
          <Form>
            <PhoneInput
              id="phone"            
              placeholder="Enter phone number"
              value={value}
              onChange={setValue}
              name="phone" />          
            <ErrorMessage name="phone" component="div" />
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default PhoneNumberInput;
