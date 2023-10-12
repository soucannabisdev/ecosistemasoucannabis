import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';

const GenderSelect = ({ handleChangeInput }) => {
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
            id="gender"
            name="gender"
            onChange={(e) => {
              handleChange(e);
              handleChangeInput(e);
            }}
          >
            <option value="">Selecione...</option>
            <option value="masculino">Masculino</option>
            <option value="feminino">Feminino</option>
            <option value="outro">Outro Gênero</option>
          </select>
          <br></br>
          <br></br>
          {hiddenInput && (
            <input   className="form-input" type="text" name="gender" placeholder="Digite o gênero que se identifica"  
            onChange={(e) => {
                handleChangeInput(e);
              }}/>
          )}
        </form>
  );
};

export default GenderSelect;
