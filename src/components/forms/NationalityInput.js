import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';

const NationalityInput = ({ handleChangeInput }) => {
  const [hiddenInput, setHiddenInput] = useState(false);

  function handleChange(e){
    if (e.target.value === 'outro') {
      setHiddenInput(true);
    } else {
      setHiddenInput(false);
    }

  }

  return (
        <form>
          <select
            className="form-input" 
            as="select"
            id="nationality"
            name="nationality"
            onChange={(e) => {
              handleChange(e);
              handleChangeInput(e);
            }}
          >
            <option value="">Selecione...</option>
            <option value="brasileiro(a)">Brasileiro(a)</option>
            <option value="outro">Outra nacionalidade</option>
          </select>
          <br></br>
          <br></br>
          {hiddenInput && (
            <input placeholder='Digite sua nacionalidade'  className="form-input" type="text"  name="nationality" 
            onChange={(e) => {
                handleChangeInput(e);
              }}/>
          )}
        </form>
  );
};

export default NationalityInput;
