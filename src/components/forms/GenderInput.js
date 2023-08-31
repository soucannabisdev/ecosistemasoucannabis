import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';

const GenderSelect = ({ handleChangeInput }) => {
  const [hiddenInput, setHiddenInput] = useState(false);

  return (
    <Formik
      initialValues={{ gender: '', other_gender: '' }}
      onSubmit={(values) => {
        console.log(values);
      }}
    >
      {({ handleChange }) => (
        <Form>
          <Field
            className="form-control" 
            as="select"
            id="gender"
            name="gender"
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
            <option value="masculino">Masculino</option>
            <option value="feminino">Feminino</option>
            <option value="outro">Outro</option>
          </Field>
          {hiddenInput && (
            <Field  className="form-control" type="text" name="gender" placeholder="Digite outro gênero"  
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

export default GenderSelect;
