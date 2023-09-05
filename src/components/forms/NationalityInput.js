import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';

const NationalityInput = ({ handleChangeInput }) => {
  const [hiddenInput, setHiddenInput] = useState(false);

  return (
    <Formik
      initialValues={{ nationality: '' }}
      onSubmit={(values) => {
      }}
    >
      {({ handleChange }) => (
        <Form>
          <Field
            className="form-control" 
            as="select"
            id="nationality"
            name="nationality"
            onChange={(e) => {
              handleChange(e);
              handleChangeInput(e);
              if (e.target.value === 'outro') {
                setHiddenInput(true);
              } else {
                setHiddenInput(false);
              }
            }}
          >
            <option value="">Selecione...</option>
            <option value="brasileiro(a)">Brasileiro(a)</option>
            <option value="outro">Outra nacionalidade</option>
          </Field>
          <br></br>
          {hiddenInput && (
            <Field  className="form-control" type="text"  name="nationality" 
            onChange={(e) => {
                handleChange(e);
                handleChangeInput(e);
              }}/>
          )}
        </Form>
      )}
    </Formik>
  );
};

export default NationalityInput;
