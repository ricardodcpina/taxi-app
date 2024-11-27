import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export default function RedirectToRequest() {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to '/request' when the app starts
    navigate('/request', { replace: true });
  }, [navigate]);

  return null; 
}
