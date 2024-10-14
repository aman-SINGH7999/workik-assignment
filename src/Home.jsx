import React, {useState, useEffect} from 'react'
import axios from 'axios';

export default function Home() {
    const [user, setUser] = useState(null);

    // Fetch user data when the component mounts
    useEffect(() => {
      axios.get('http://localhost:4001/user', { withCredentials: true })
        .then(response => {
          if (response.data.user) {
            console.log(response.data.user)
            setUser(response.data.user);
          }
        })
        .catch(err => console.log(err));
    }, []);


    const createWebhook = (e) => {
        e.preventDefault();

        axios.post('http://localhost:4001/create-webhook', { withCredentials: true })
          .then(response => {
            console.log('Webhook created:', response.data);
          })
          .catch(error => {
            console.error('Error creating webhook:', error);
          });
      };

  return (
    <div className=''>
        <div className='flex my-24 justify-center items-center'>
        {
            user ? 
            <div>
                <div className=''>Hello {user.username}</div>
                <div className='flex my-48 flex-col justify-center items-center'>
                    <h1>GitHub PR AI Review</h1>
                    <button className='mx-3 hover:bg-black hover:text-white px-3 py-1 rounded-3xl border-[1px] border-black bg-white' onClick={createWebhook}>Create Webhook</button>
                </div>
            </div>

            : <div> welcome to Workik</div>
        }
        </div>

        
    </div>
  )
}
