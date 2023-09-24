import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import User from '../../modules/User'
import apiRequest from '../../modules/apiRequest';

function Contact() {
  useEffect(() => {
    (async () => {
      const userData = await User();
      setUser(userData);
    })()

  }, []);


  const [user, setUser] = useState({});

  if (user.associate_status > 5) {
    window.location.assign("/")
  }

  const medicalAppointmentYes = async () => {

    await apiRequest("/api/directus/update", {"userId":user.id, "formData":{"associate_status": 5} }, "POST")

    .then(response => {
        console.log(response)
      })
      .catch(error => {
        console.error(error);
      });

      window.location.assign("/receita-medica");

  }

  const medicalAppointmentYNo = async () => {
      window.location.href = `https://agendamento.ecosistemasoucannabis.ong.br/?u=${user.user_code}`
    }


  return (
    <div>
      <form  className="form-container ">
          <h1 className="sub-title">Você ja tem uma Prescrição Médica?</h1>
          <br></br>
          <div className="form-control input-login" id="responsable_type">
            <input type="radio" className="btn-check" onClick={medicalAppointmentYes}  name="resposable" id="btnradio1" value="yes" ></input>
            <label className="btn btn-outline-primary radio-input" htmlFor="btnradio1">
              Sim, já realizei uma consulta médica e tenho minha receita.
            </label>
            <input type="radio" className="btn-check" onClick={medicalAppointmentYNo} name="resposable" id="btnradio2" value="no" ></input>
            <label className="btn btn-outline-primary radio-input" htmlFor="btnradio2">
              Não, gostaria de agendar uma consulta médica.
            </label>
          </div>
          </form>
       
    </div>
  );
}

export default Contact;
