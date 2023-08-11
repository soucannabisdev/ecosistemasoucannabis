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

  const medicalAppointmentSuccess = async () => {

    await apiRequest("/directus/update", {"userId":user.id, "formData":{"associate_status": 5} }, "POST")

    .then(response => {
        console.log(response)
      })
      .catch(error => {
        console.error(error);
      });

      window.location.assign("/receita-medica");

  }


  return (
    <div style={{textAlign:"center", fontSize:"18px"}}>
     <div>Clique no botão abaixo para agendar sua consulta médica</div> 
     <br></br>
     <Link to={`http://localhost/easyappointments2/?u=${user.user_code}`}>Agendar Consulta</Link>
      <b style={{fontSize:"22px"}}></b>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <button onClick={medicalAppointmentSuccess}>Já realizei minha consulta</button>
    </div>
    
  );
}

export default Contact;
