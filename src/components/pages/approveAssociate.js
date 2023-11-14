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
      {msg && (
        <div>
          <h1 className="sub-title">Seus dados estão sendo analisados por nossa equipe de acolhimento, em breve você recebrá o retorno.</h1>
          <h1 className="sub-title">Um e-mail será enviado quando sua aprovação for efetivada.</h1>
          <h1 className="sub-title">Ou recarregue a página para verificar sua aprovação.</h1>
        </div>
      )}
      {user.associate_status == 8 && <h1 className="sub-title">Cadastro Aprovado</h1>}
      {user.associate_status == 6 && (
        <div className="d-flex justify-content-center align-items-center">
          <button onClick={approve} type="button" class="btn btn-success btn-lg" hidden={msg}>
            Solicitar aprovação do cadastro
          </button>
        </div>
      )}
    </div>
  );
}

export default ApproveAssociate;
