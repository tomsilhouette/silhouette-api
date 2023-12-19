// EXAMPLE ONLY WRITE YOUR OWN EACH TIME
import axios from 'axios';
import pako from 'pako';
const host = process.env.REACT_APP_API_URL;
const tokenKey = process.env.REACT_APP_USER_TOKEN;

const client = {
  get: (path) => {
    const url = `${path}`;
    let headers = {};

    headers[
      'Authorization'
    ] = `kkfpy7jdevnwxewoqbrq6742lmujkdkq4tgwxblrsbbkan6jby5a`;
    return axios.get(url, { headers });
  },

  getData: (path, data) => {
    // Create a FormData object for handling multipart/form-data

    // Set the Content-Type header to multipart/form-da
    return axios.post(path);
  },

  getData2: async (path, data) => {
    console.log('-- COMPRESSING DATA --');

    // Convert your data to a JSON string
    const jsonData = JSON.stringify(data);

    // Convert the string to a Uint8Array
    const uint8Data = new TextEncoder().encode(jsonData);
    
    console.log('unit', uint8Data);
    // Compress the data using Pako
    const compressedData = pako.deflate(uint8Data);

    // Create a FormData object for handling multipart/form-data
    const formData = new FormData();

    // Append the compressed data as a Blob with a random filename
    const compressedBlob = new Blob([compressedData]);
    formData.append('file', compressedBlob, 'compressed_request.bin');

    // Set the Content-Type header to multipart/form-data
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      withCredentials: true,
    };

    console.log('-- SENDING COMPRESSED REQ --');
    console.log('-- REQUEST DATA: ', formData);

    try {
      const response = await axios.post(path, formData, config);
      console.log('response', response);
      return response;
    } catch (error) {
      console.error('Unable to get response', error);
      throw error;
    }
  },

  post: (path, data) => {
    const url = `${path}`;

    return axios.post(url, data);
  },

  postCredentials: (path, data) => {
    const url = `${path}`;

    return axios.post(url, data, { withCredentials: true });
  },

  patch: (path, data, withToken = true) => {
    const url = `${host}${path}`;
    const token = localStorage.getItem(tokenKey);
    let headers = {};
    if (withToken) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    return axios.patch(url, data, { headers });
  },

  delete: (path) => {
    const url = `${host}${path}`;
    const headers = {
      Authorization: `Bearer ${localStorage.getItem(tokenKey)}`,
    };

    return axios.delete(url, { headers });
  },
};

export default client;
