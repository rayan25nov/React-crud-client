import { React, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const RequireAuth = (Component) => {
  const [token, setToken] = useState(null);
  const navigate = useNavigate();

  const checkAuth = async () => {
    const token = await localStorage.getItem("token");
    setToken(token);
    if (!token) {
      navigate("/");
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return <>{token ? <Component /> : null}</>;
};

export default RequireAuth;
