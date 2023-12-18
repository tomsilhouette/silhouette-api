import React, { useContext, useEffect, useState } from 'react';
// Components
import Navbar from '../../components/nav/Navbar';
import { createdPassword } from '../../components/PasswordCreate';
// Context
import { ToggleContext } from '../../context/ToggleContext';
// Api
import client from '../../api/client';
import pako from 'pako';
// Encode
const sha1 = require('js-sha1');

function HomePage() {
  const { setActiveNav } = useContext(ToggleContext);

  const [password, setPassword] = useState();
  const [requestHash, setRequestHash] = useState('');

  const [requestData, setRequestData] = useState({
    authentication: {
      id: 'sos_api',
      password: password, // This will initially be undefined
    },
    method: {
      method_name: 'get_api_settings',
      parameters: {},
    },
  });

  const h1 = '284e1db0332a332a04fa546564246ac359a405f6'
  const h2 = 'a9997099e4b9258102a2fb89275effdd844f2587'
  const h3 = 'ccb34bfd6c1af5e12a66401caee50ed25ecf5baa'

  useEffect(() => {
    const fetchData = async () => {
      console.log('-- CREATING PASSWORD --');

      const newPassword = await createdPassword();
      setPassword(newPassword);
    };

    fetchData();
  }, []);

  useEffect(() => {
    // Update the requestData object with the new password
    console.log('-- UPDATE REQUEST --');
    setRequestData({
      ...requestData,
      authentication: {
        ...requestData.authentication,
        password: password,
      },
    });
  }, [password]);

  useEffect(() => {
    console.log('-- HASHING REQUEST --');
    console.log('-- PREHASH REQ: ', requestData);

    const hash = sha1(JSON.stringify(requestData)); // JSON.stringify to convert the object to a string

    console.log('-- HASHED -- ', hash);

    setRequestHash(hash);
  }, [requestData]);

  const convertZLib = () => {
    console.log('-- CONVERT ZLIB --');
    // Convert your data to a JSON string
    const jsonData = JSON.stringify(requestData);

    // Convert the string to a Uint8Array
    const uint8Data = new TextEncoder().encode(jsonData);

    // Compress the data using Pako
    const compressedData = pako.deflate(uint8Data);

    // Now 'compressedData' contains your zlib-compressed data
    console.log('Compressed Data:', btoa(String.fromCharCode.apply(null, compressedData)));
  }

  const makeAPIrequest = () => {
    console.log('-- SENDING REQ --');
    console.log('-- REQUEST: ', requestHash);

    client
      .post('https://api.silhouettedesignstore.com/', h2)
      .then((res) => {
        console.log('res', res);
        console.log('res2', res.data);
      })

      .catch((err) => {
        console.error('Unable to get response', err);
      });
  };

  const addNewPassword = () => {
    console.log('Requested hash ', requestHash);

    setRequestData({
      ...requestData,
      authentication: {
        ...requestData.authentication,
        password: requestHash,
      },
    });
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
                onClick={addNewPassword}
                className='bg-white text-xl font-semibold rounded-lg px-4 active:scale-95 py-2'
              >
                ADD PASS
              </button>
              <button
                onClick={convertZLib}
                className='bg-white text-xl font-semibold rounded-lg px-4 active:scale-95 py-2'
              >
                ZLIB
              </button>
              <button
                onClick={makeAPIrequest}
                className='bg-white text-xl font-semibold rounded-lg px-4 active:scale-95 py-2'
              >
                SEND
              </button>
              <button
                onClick={makeAPIrequest}
                className='bg-white text-xl font-semibold rounded-lg px-4 active:scale-95 py-2'
              >
                TEST
              </button>
            </section>
          </div>
        </section>
      </main>
    </div>
  );
}

export default HomePage;
