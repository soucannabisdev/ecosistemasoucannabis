import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const PopupComponent = () => {
  const [showPopup, setShowPopup] = useState(false);

  const handleClose = () => setShowPopup(false);
  const handleShow = () => setShowPopup(true);

  const handleChoice = (choice) => {
    // Faça algo com a escolha do usuário aqui
    console.log(`Usuário escolheu: ${choice}`);
    handleClose();
  };

  return (
    <div>
      <Button variant="primary" onClick={handleShow}>
        Abrir Popup
      </Button>

      <Modal show={showPopup} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Escolha uma opção</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Escolha uma das opções abaixo:</p>
          <Button variant="secondary" onClick={() => handleChoice('Opção 1')}>
            Opção 1
          </Button>
          <Button variant="primary" onClick={() => handleChoice('Opção 2')}>
            Opção 2
          </Button>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default PopupComponent;
