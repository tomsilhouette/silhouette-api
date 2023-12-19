import React from 'react';
import { gzip, ungzip } from 'pako';

function Post2() {
  // Example object to be compressed
  const exampleObject = { name: 'John', age: 30, city: 'New York' };

  async function compressObject(obj) {
    try {
      const jsonString = JSON.stringify(obj);
      const compressed = gzip(jsonString, { to: 'string' });
      console.log('Compressed:', compressed);
      return compressed;
    } catch (err) {
      console.error('Compression error:', err);
    }
  }

  async function decompressObject(compressed) {
    try {
      const decompressed = ungzip(compressed, { to: 'string' });
      const obj = JSON.parse(decompressed);
      console.log('Decompressed:', obj);
      return obj;
    } catch (err) {
      console.error('Decompression error:', err);
    }
  }

  // Example usage
  (async () => {
    const compressed = await compressObject(exampleObject);
    const decompressedObject = await decompressObject(compressed);
  })();

  return (
    <div>Post2</div>
  )
}

export default Post2;
