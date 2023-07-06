import React, { useState, useEffect } from 'react';
import directusRequest from '../../modules/directusRequest'
import User from '../../modules/User'

function Contact() {
  useEffect(() => {
    (async () => {
      const userData = await User();
      setUser(userData);
    })()

  }, []);

  const [user, setUser] = useState({});


  const copyText = () => {
    const textToCopy = user.user_code
    navigator.clipboard.writeText(textToCopy)
      .then(() => {
        console.log('Texto copiado com sucesso!');
      })
      .catch((error) => {
        console.error('Erro ao copiar o texto:', error);
      });
  }

  const medicalAppointmentSuccess = async () => {
    await directusRequest("/items/Users/" + user.id, { associate_status: 5 }, "PATCH")
      .then(response => {
        console.log(response)
      })
      .catch(error => {
        console.error(error);
      });

      window.location.reload();

  }


  return (
    <div style={{textAlign:"center", fontSize:"18px"}}>
     <div>Acesse agendarapido.soucannabis.ong.br para agendar a sua consulta médica.</div> 
     <br></br>
      <div style={{color:"red", fontSize:"20px"}}>IMPORTANTE</div> 
      <br></br>
      <div>Informe o seu código de usuário no agendamento da consulta</div> 
      <br></br>
      <b style={{fontSize:"22px"}}>{user.user_code}</b>
      <br></br>
      <br></br>
      <button onClick={copyText}>Copiar código do usuário</button>
      <br></br>
      <br></br>
      <button onClick={medicalAppointmentSuccess}>Já realizei minha consulta</button>
    </div>
    
  );
}

export default Contact;
