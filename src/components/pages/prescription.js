import React, { useState, useEffect } from 'react';
import directusRequest from '../../modules/apiRequest'
import User from '../../modules/User'

function Prescription() {
  useEffect(() => {
    (async () => {
      const userData = await User();
      setUser(userData);
    })()

  }, []);

  const [user, setUser] = useState({});


  return (
    <div>prescrição</div>
    
  );
}

export default Prescription;
