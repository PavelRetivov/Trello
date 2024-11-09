import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

function ProtectedRouteLoginAndRegister(): React.ReactElement | null {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  console.log(token);

  useEffect(() => {
    if (token) {
      navigate('/');
    }
  }, [token, navigate]);

  return !token ? <Outlet /> : null;
}

export default ProtectedRouteLoginAndRegister;
