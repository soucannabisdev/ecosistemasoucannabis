import React, { useState, useEffect } from 'react';
import directusRequest from '../../modules/directusRequest'
import User from '../../modules/User'
import whatsappRequest from '../../modules/whatsappRequest';

function Contact() {
  useEffect(() => {
    (async () => {
      const userData = await User();
      setUser(userData);

      await whatsappRequest(JSON.stringify({
        "number": "5548999287996",
        "body": "Teste de solicitação de contato"
      }))
    })()

  

  }, []);


  const [user, setUser] = useState({});
  const [formData, setFormData] = useState({
    name:null,
    email:null,
    phone:null
    
  })

  const associate_status = user.associate_status

  if(associate_status > 2){
    window.location.assign("/")
  }

  const contact = (event) => {
    event.preventDefault();

    console.log(formData)
  }

  const handleChangeInput = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });

    
  };

  return (
    <div>
       <form onSubmit={contact}>
            <div class="form-group">
              <label for="email">Nome completo:</label>
              <input type="text" class="form-control" onChange={handleChangeInput} value={formData.name} id="name" name="name" placeholder=""></input>
            </div>
            <div class="form-group">
              <label for="password">Email:</label>
              <input type="email" class="form-control" onChange={handleChangeInput} value={formData.email} id="email" name="email" placeholder=""></input>
            </div>
            <div class="form-group">
              <label for="password">Telefone:</label>
              <input type="text" class="form-control" onChange={handleChangeInput} value={formData.phone} id="phone" name="phone" placeholder=""></input>
            </div>
            <br></br>
            <button type="submit" onClick={contact} class="btn btn-primary">Solicitar contato</button>
          </form>
    <br></br>
    <br></br>
    <br></br>
      {user.associate_status === 0 && (
        <div>
          <div className="form-container">
            <button type="button" onClick={contact} class="btn btn-primary">Entrar em contato</button>
          </div>
        </div>
      )}

      {user.associate_status === 1 && (
        <div>
          <div className="form-container">
            <button type="button" class="btn btn-primary">Já entrei em contato</button>
          </div>
        </div>
      )}

    </div>
  );
}

export default Contact;
