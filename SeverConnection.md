# Connecting to Silhouette Design Store API

## Main Issue

I have been trying to connect to the Silhouette Design Store API from my react Website I am building.
Using the documenet 'Silhouette Web API V1.41.2' and following the connection instructions.

I am getting two different issues when trying to connect.

1. When trying to recieve data from the server, we get 'CORS error' cross origin errors.

```js
Access to XMLHttpRequest at 'https://api.silhouettedesignstore.com/' from origin 'http://localhost:3000' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.
```

Cause:
Potentially due to lack or CORS policy on the server, the server needs to allow connections from origin 'http://localhost:3000' and eventually our new Silhouette Web domain name.
CORS is only a browser issue and is designed to help protect users from connection to untrustowrthy databases and having access to materials. So the team working on the Desktop and Mobile version do not seem to encounter this issue.

Tests:
I have opened the API testing file in a browser with security, including CORS, disabled. This was able to let me connect to the server and reseave correct responses.

Potential fixes:
From looking at other service running on Silhouette Design Store, such as google and facebook cookies, i can see that when they make a request to the server. Some of the send a pre-flight request which may handle any CORS requests ahead of time? The requests all return a 'Allow-Origin: www.silhouettedesign.com' header. Which is what allows your browser to review the data. There is nothing in the API documents about this however.

Without knowing more about the server and how its designed and programmed. I can only guess at the issues and fixes. I hope i can explain this issue well enough that you will understand my issue.

Here is an example of a request/response cycle and the code that sends it.

REQUEST:

```js
POST / HTTP/1.1
Host: api.silhouettedesignstore.com
Content-Length: 149
Sec-Ch-Ua: "Not_A Brand";v="8", "Chromium";v="120"
Accept: application/json, text/plain, *
Content-Type: application/x-www-form-urlencoded
Sec-Ch-Ua-Mobile: ?0
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.6099.71 Safari/537.36
Sec-Ch-Ua-Platform: "Windows"
Origin: http://localhost:3000
Sec-Fetch-Site: cross-site
Sec-Fetch-Mode: cors
Sec-Fetch-Dest: empty
Referer: http://localhost:3000/
Accept-Encoding: gzip, deflate, br
Accept-Language: en-GB,en-US;q=0.9,en;q=0.8
Priority: u=1, i
Connection: close

{"authentication":{"id":"sos_api","password":"284e1db0332a332a04fa546564246ac359a405f6"},"method":{"method_name":"get_api_settings","parameters":{}}}
```

RESPONSE:

```js
HTTP/1.1 200 OK
Date: Wed, 13 Dec 2023 09:45:18 GMT
Server: Apache
Set-Cookie: silh_api_uuid=6f895bf7-5a7f-4de7-b445-606803c713b4; expires=Thu, 12-Dec-2024 09:45:18 GMT; Max-Age=31536000; path=/
Set-Cookie: silh_api_uuid=6f895bf7-5a7f-4de7-b445-606803c713b4; expires=Thu, 12-Dec-2024 09:45:18 GMT; Max-Age=31536000; path=/
Cache-Control: max-age=864000
Expires: Sat, 23 Dec 2023 09:45:18 GMT
Vary: Accept-Encoding
X-Frame-Options: sameorigin
Content-Length: 90
Connection: close
Content-Type: text/html; charset=UTF-8

{"success":false,"status_code":"401","msg":"id\/password invalid\/not supplied","data":[]}
```

This returns in the browser (a broswer with all security turned off so i can access the server):

```js
Access to XMLHttpRequest at 'https://api.silhouettedesignstore.com/' from origin 'http://localhost:3000' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.
```

The response header/s i may need include something similar to this

```js
Access-Control-Allow-Origin: *
Access-Control-Allow-Methods: *
Access-Control-Allow-Headers: *
```
The '\*' can be replaced with a url of accepted origins.

There is a small chance this is not a CORS issue, i have experience with the CORS responses being sent when issues have include, server-timeout and broken api links. 

1. When making the API requests with the security disabled so i can view the responses. I recieve a new error which is:

```js
{"success":false,"status_code":"401","msg":"id\/password invalid\/not supplied","data":[]}
```

So i am connecting to the service but not sending the correct data. I have collaborated with the team who work the API on the desktop version. They are confident I am making a very similar request and completing all requirements laid out in the documents.

The process include:

1. Creating a object to send as a request body.

```js
{
authentication: {
    id: 'sos_api',
    password: '', // This will initially be undefined
},
method: {
    method_name: 'get_api_settings',
    parameters: {},
},
  }
```

2. Hash the 10 slices into SHA1 and take the first 2 letters of each slice and compile into a new string.
3. Applying this hash to the paswsord field of the object.
4. Converting the object to JSON
5. Hasing the JSON object
6. Add this hash to the password field of the original object.
7. Convert the object into JSON 
8. Send the JSON as the body of a post request. 

Here is the code: 

```js
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

  // Create password hashes
  useEffect(() => {
    const fetchData = async () => {

      const newPassword = await createdPassword();
      setPassword(newPassword);
    };

    fetchData();
  }, []);

  // Add password to obejct and hash
  const hashTheForm = () => {
    let tempObj = requestData;

    tempObj.authentication.password = password;

    const requestDataJSON = JSON.stringify(tempObj);

    const hashedJSON = sha1(requestDataJSON);

    setHashedForm(hashedJSON);
  };

  // Add hashed form to password field.
  const addPasswordToForm = () => {
    let newForm = requestData;

    newForm.authentication.password = hashedForm;

    const fullJSONRequest = JSON.stringify(newForm);

    setPostData(fullJSONRequest);
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


export async function createdPassword() {
  const slices = [
    'UOCjn',
    '{t\\K_]|{]l|',
    'XCgdFCOroCe[nd',
    'l\\{qgS',
    'MJQUJn|xWXvAPX',
    'SicaN',
    '\\wItxsSCfC',
    'FadP{Vj^',
    'QRBLIBHCYv',
    'emfdZ',
  ];

  let passString = '';

  for (const slice of slices) {

    // Hash the bytes
    const hash = sha1(slice);

    let hashChars = hash.slice(0, 2);
    passString = passString + hashChars;
  }

  return passString;
}
```

## Summary

I am hoping to have a code block added to the server which will allow me to communicate with the servers through APIs.

If there are any issues in my code causing me to get the password incorrect when sent, please could you advice where the issue is.

