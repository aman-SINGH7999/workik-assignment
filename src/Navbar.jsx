import React, { useState, useEffect} from 'react'
import axios from 'axios';

export default function Navbar() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:4001/user', { withCredentials: true })
          .then(response => {
            if (response.data.user) {
              setUser(response.data.user);
            }
          })
          .catch(err => console.log(err));
      }, []);
    

      const handleLogin = () => {
        window.open('http://localhost:4001/auth/github', '_self');
      };
    
      const handleLogout = () => {
        window.open('http://localhost:4001/logout', '_self');
        setUser(null);
      };

  return (
    <div className='flex justify-between px-8 bg-gray-300 py-2 items-center'>
      <div className='text-4xl font-semibold shadow-lg'>WORKIK</div>
      <div className='mx-3 hover:bg-black hover:text-white px-3 py-1 rounded-3xl border-[1px] border-black bg-white'>
        {
            user ? <button onClick={handleLogout}>Logout</button>
            : <button onClick={handleLogin}>Login with GitHub</button>
        }
      </div>
    </div>
  )
}
