import React from 'react';
import Navbar from '../../components/nav/Navbar';

function PostRequest() {
  const hashTheForm = () => {};

  const sendFile = () => {};
const zlib = require('zlib');
const { promisify } = require('util');

// Promisify the zlib methods for easier use with async/await
const gzip = promisify(zlib.gzip);
const gunzip = promisify(zlib.gunzip);

async function compressObject(obj) {
    try {
        // Convert the object to a JSON string
        const jsonString = JSON.stringify(obj);

        // Compress the JSON string
        const compressed = await gzip(jsonString);

        return compressed;
    } catch (err) {
        console.error('Compression error:', err);
    }
}

async function decompressObject(compressed) {
    try {
        // Decompress the data
        const decompressed = await gunzip(compressed);

        // Convert the decompressed data back to a JSON object
        const obj = JSON.parse(decompressed.toString());

        return obj;
    } catch (err) {
        console.error('Decompression error:', err);
    }
}

// Example usage
(async () => {
    const myObject = { name: 'John', age: 30, city: 'New York' };
    
    // Compress the object
    const compressed = await compressObject(myObject);
    console.log('Compressed:', compressed);

    // Decompress the object
    const decompressedObject = await decompressObject(compressed);
    console.log('Decompressed:', decompressedObject);
})();
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

export default PostRequest;
