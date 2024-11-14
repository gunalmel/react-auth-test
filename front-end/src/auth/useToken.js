import {useState} from 'react';

export const useToken = () => {
  const [token, setToken] = useState(() => {
    return localStorage.getItem('token');
  });

  const setTokenWrapper = newToken => {
    localStorage.setItem('token', newToken);
    setToken(newToken);
  };

  return [token, setTokenWrapper];
}
