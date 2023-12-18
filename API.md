1. Create a list from the 'Slices'

```js
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
```

2. Hash each slice using 'SHA1' algorithm
3. Take the first 2 characters from the start of each hashed slice
4. Add the characters sequentially to create a new string.
5. Take this completed string and add it to the password field of the request template

```js
const [requestData, setRequestData] = useState({
  authentication: {
    id: 'sos_api',
    password: '189b393a6954abfdd53d451fcce9149554153a95', // Add here
  },
  method: {
    parameters: { software_type: 'SS', software_version: '4.5.770WD' },
    method_name: 'get_api_settings',
  },
});
```

6. Convert this object into JSON object
7. Hash this JSON object using the 'SHA1' algorithm 
8. Add this hash to the password field of the original request object
9. zlib compress the object
10. Send output as request body using a POST request. 