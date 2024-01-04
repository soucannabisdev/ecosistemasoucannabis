import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import User from "../../modules/User";
import directusRequestUpload from "../../modules/directusRequestUpload";
import apiRequest from "../../modules/apiRequest";

function ApproveAssociate() {
  useEffect(() => {
    (async () => {
      const userData = await User();
      setUser(userData);
    })();

    if (user.associate_status == 7) {
      setButton(true);
    }
  }, []);

  const [user, setUser] = useState({});
  const [button, setButton] = useState(false);
  const [msg, setMsg] = useState(false);

  const approve = async event => {
    event.preventDefault();

    await apiRequest("/api/directus/update", { userId: user.id, formData: { associate_status: 7, status: "aguardando-aprovacao" } }, "POST");

    setMsg(true);
  };

  return (
    <div className="form-container ">
      <h1 className="title">Aprovação de cadastro</h1>
      <br></br>
      {!msg && (
        <div>
          <h2 style={{ textAlign: "center" }}>Seus documentos e sua receita médica serão analisados e seu cadastro como associado será aprovado,
          para poder então fazer sua primeira compra.<br></br> Em caso de algum problema com seus dados, vocÊ será informado para editá-los.
          </h2>
          <h2 style={{textAlign:"center"}}>Aguarde nossa equipe de acolhimento entrar em contato.</h2>
        </div>
      )}

      {msg && (
        <div>
         <h2 style={{textAlign:"center"}}>Seus dados foram enviados para nossa equipe de acolhimento, você está em nossa lista de espera, em breve entraremos em contato.</h2>
         <h2 style={{textAlign:"center"}}>Obrigado.</h2>
        </div>
      )}
      {user.associate_status == 8 && <h1 className="sub-title">Cadastro Aprovado</h1>}
      {user.associate_status == 6 && (
        
      )}
    </div>
  );
}

export default ApproveAssociate;
