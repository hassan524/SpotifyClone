import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/context';

const Callback = () => {
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const { SetToken, Token } = useAppContext();
  const navigate = useNavigate();

  useEffect(() => {
    const code = new URLSearchParams(location.search).get('code');

    const fetchToken = async () => {
      if (!code) return setLoading(false);

      try {
        const res = await window.electronAPI.exchangeCode(code);
        await window.electronAPI.closeAuthWindow();
        await SetToken(res); 
      } catch (err) {
        console.error('Token exchange failed:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchToken();
  }, [location]);

  return (
    <div className="h-screen w-screen bg-black flex items-center justify-center">
      {loading && (
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-white"></div>
      )}
    </div>
  );
};

export default Callback;
