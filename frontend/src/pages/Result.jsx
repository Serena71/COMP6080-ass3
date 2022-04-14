import React from 'react';
// import { apiCall } from '../components/Helper';
import { NavTabs } from '../components/NavTab';
import { useNavigate, useLocation } from 'react-router-dom';

export default function Result () {
  const navigate = useNavigate();
  const token = localStorage.getItem('authToken');
  React.useEffect(() => {
    if (!token) {
      navigate('/login');
    }
  });

  const location = useLocation();
  const pathname = location.pathname;
  console.log(pathname);

  return (
    <>
      <NavTabs />
      <h1>This is a result page</h1>
    </>
  );
}
