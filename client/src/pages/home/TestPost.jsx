import React, { useEffect, useState } from 'react';
import Navbar from '../../components/nav/Navbar';
// Api
import client from '../../api/client';
// Password
import { createdPassword } from '../../components/PasswordCreate';
// Hashing
const sha1 = require('js-sha1');

function TestPost() {
  const [password, setPassword] = useState('');
  const [hashedForm, setHashedForm] = useState({});
  const [postData, setPostData] = useState({});

  const [requestData, setRequestData] = useState({
    authentication: {
      id: 'sos_api',
      password: '', // This will initially be undefined
    },
    method: {
      method_name: 'get_api_settings',
      parameters: {},
    },
  });

  const jsonObject1 = {"authentication":{"id":"sos_api","password":"66667776366565613d21"},"method":{"method_name":"get_api_settings","parameters":{}}}
  
  // Create password hashes
  useEffect(() => {
    const fetchData = async () => {
      const newPassword = await createdPassword();
      console.log('NEW PASSWORD: ', newPassword);
      setPassword(newPassword);
    };

    fetchData();
  }, []);

  // Add password to obejct and hash
  const hashTheForm = () => {
    console.log('');
    console.log('HASHING THE DATA');
    let tempObj = requestData;
    console.log('tempObj (original form): ', tempObj);

    console.log('ADDING PASSWORD');
    tempObj.authentication.password = password;

    console.log('tempObj Password Update: ', tempObj);

    const requestDataJSON = JSON.stringify(tempObj);
    console.log('JSON REQUEST: ', requestDataJSON);

    const hashedJSON = sha1(requestDataJSON);
    console.log('HASHED JSON: ', hashedJSON);

    setHashedForm(hashedJSON);
  };

  // Send form
  const sendFile = () => {
    console.log('SENDING');

    client
      .post('https://api.silhouettedesignstore.com/', postData)
      .then((res) => {
        console.log('res', res);
        console.log('res2', res.data);
      })

      .catch((err) => {
        console.error('Unable to get response', err);
      });
  };

  console.log('THE HASHED FORM: ', hashedForm);
  console.log('');

  console.log('PASSWORD FIELD: ', password);
  console.log('');

  return (
    <div className='grid main__bg font-poppins h-screen grid-rows-reg overflow-hidden max-h-screen'>
      <Navbar />
      {/* Main */}
      <main className='grid h-full p-1 items-center justify-center'>
        <section>
          <div className='grid text-center outline outline-2 outline-black rounded-xl bg-yellow-400 px-6 py-8'>
            <article className=''>
              <div>
                <h2 className='text-xl font-semibold'>Welcome To</h2>
                <h1 className='text-3xl font-poppins font-bold'>API MASTER</h1>
              </div>
            </article>
            <section className='pt-4'>
              <textarea
                name=''
                id=''
                cols='30'
                rows='10'
                className='rounded-lg p-1 text-2xl'
                placeholder='You can do IT!'
              ></textarea>
            </section>
            <section className='grid grid-cols-2 gap-2'>
              <button
                onClick={hashTheForm}
                className='bg-white text-xl font-semibold rounded-lg px-4 active:scale-95 py-2'
              >
                HASH
              </button>
              <button
                onClick={sendFile}
                className='bg-white text-xl font-semibold rounded-lg px-4 active:scale-95 py-2'
              >
                SEND
              </button>
            </section>
          </div>
        </section>
      </main>
    </div>
  );
}

export default TestPost;
