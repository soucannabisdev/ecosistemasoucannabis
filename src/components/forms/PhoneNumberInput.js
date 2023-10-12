import React, { useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const PhoneNumberInput = ({handleChangeInput}) => {
  const [phone, setPhone] = useState("");

  const handleChange = (value, country) => {
    setPhone(value);
  };

  return (
    <div>
      <PhoneInput
        className="form-control-phone"
        country={"br"}
        value={phone}
        onChange={(e) => {
          handleChange(e);
          handleChangeInput(e);
        }}
        inputProps={{
          name: "phone",
          required: true,
        }}
      />
    </div>
  );
};

export default PhoneNumberInput;
