import React, { useState, useEffect } from "react";
import User from "../../modules/User";

function Home() {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const userData = await User();
      setUser(userData);
    })();
  }, []);

  if (user.associate_status == 0) {
    window.location.assign("/bem-vindo");
  }

  if (user.associate_status < 2) {
    window.location.assign("/cadastro-associado");
  }

  if (user.associate_status == 2) {
    window.location.assign("/cadastro-associado");
  }
  if (user.associate_status == 3) {
    window.location.assign("/documentos");
  }
  if (user.associate_status == 4) {
    window.location.assign("/consulta");
  }
  if (user.associate_status == 5) {
    window.location.assign("/receita-medica");
  }
  if (user.associate_status >= 6) {
    window.location.assign("/cadastro");
  }

  return <></>;
}

export default Home;
