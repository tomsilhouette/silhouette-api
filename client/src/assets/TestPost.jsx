import React, { useEffect, useState } from 'react';
import Navbar from '../../components/nav/Navbar';
import client from '../../api/client';
import { createdPassword } from '../../components/PasswordCreate';
const sha1 = require('js-sha1');

function TestPost() {
  const h1 = '284e1db0332a332a04fa546564246ac359a405f6';
  const h2 = 'a9997099e4b9258102a2fb89275effdd844f2587';
  const h3 = 'ccb34bfd6c1af5e12a66401caee50ed25ecf5baa';

  const [password, setPassword] = useState('');
  const [hashedForm, setHashedForm] = useState({});

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

  useEffect(() => {
    const fetchData = async () => {
      console.log('-- CREATING PASSWORD --');

      const newPassword = await createdPassword();
      console.log('new password: ', newPassword);
      setPassword(newPassword);
    };

    fetchData();
  }, []);

  useEffect(() => {
    console.log('OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO');
  }, []);

  const testPost = () => {
    console.log('POSTING -----------------');
    console.log('PASSWORD', password);
    const requestDataJSON = JSON.stringify(requestData);

    // Now, requestDataJSON contains the JSON representation of your object
    console.log('DATA TO SEND: ', requestDataJSON);

    client
      .post('https://api.silhouettedesignstore.com/', requestDataJSON)
      .then((res) => {
        console.log('res', res);
        console.log('res2', res.data);
      })

      .catch((err) => {
        console.error('Unable to get response', err);
      });

    // Make a POST request using fetch
    // fetch('https://api.silhouettedesignstore.com/', {
    //   method: 'POST',
    //   body: formData,
    //   headers: {
    //     'Content-Type': 'multipart/form-data',
    //   },
    // })
    //   .then((response) => {
    //     if (!response.ok) {
    //       throw new Error('Network response was not ok');
    //     }
    //     return response.text();
    //   })
    //   .then((responseText) => {
    //     // Handle the successful response
    //     console.log(responseText);
    //   })
    //   .catch((error) => {
    //     // Handle errors
    //     console.error(
    //       'There was a problem with the fetch operation:',
    //       error.message
    //     );
    //   });
  };

  const startDaProcess = () => {
    console.log('---- STARTING ----');
    console.log('password', password);

    let form = requestData;
    console.log('FORM', form);

    const hashedForm = sha1(JSON.stringify(form)); // JSON.stringify to convert the object to a string
    console.log('hashedForm', hashedForm);

    setHashedForm(hashedForm)
  };

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
            <section className='grid grid-cols-4 gap-2'>
              <button
                onClick={startDaProcess}
                className='bg-white text-xl font-semibold rounded-lg px-4 active:scale-95 py-2'
              >
                START
              </button>
              <button
                onClick={testPost}
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
