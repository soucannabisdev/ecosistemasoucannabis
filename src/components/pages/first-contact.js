import React, { useState, useEffect } from 'react';
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
  const [formData, setFormData] = useState({
    name: null,
    phone: null,
    email: null
  })

  const associate_status = user.associate_status

  if (associate_status > 2) {
    window.location.assign("/")
  }

  const nocontact = async (event) => {
    event.preventDefault();
    var value = event.target.value

    await apiRequest("/directus/update", { "userId": user.id, "formData": { "associate_status": value } }, "POST")
      .then(response => {
      })
      .catch(error => {
        console.error(error);
      });

    window.location.assign("/cadastro-associado");

  }


  const contact = async (event) => {
    event.preventDefault();
    var value = event.target.value

    console.log(formData)

    await apiRequest("/chatwoot/send-message-api", JSON.stringify(formData), "POST")
      .then(response => {
      })
      .catch(error => {
        console.error(error);
      });

    await apiRequest("/chatwoot/send-message-chat", JSON.stringify({
      "email": formData.email,
      "name": formData.name,
      "phone_number": formData.phone
    }), "POST")
      .then(response => {
      })
      .catch(error => {
        console.error(error);
      });

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
          <label for="name">Nome completo:</label>
          <input type="text" class="form-control" onChange={handleChangeInput} value={formData.name} id="name" name="name" placeholder=""></input>
        </div>
        <div class="form-group">
          <label for="email">E-mail:</label>
          <input type="text" class="form-control" onChange={handleChangeInput} value={formData.email} id="email" name="email" placeholder=""></input>
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


      <div>
        <div className="form-container">
          <button type="button" onClick={nocontact} value={2} class="btn btn-success">Seguir com o cadastro</button>
        </div>
      </div>


    </div>
  );
}

export default Contact;
