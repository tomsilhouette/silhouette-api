# Results

Initial Object

```js
{
    authentication: {
      id: 'sos_api',
      password: '', // Hashed password
    },
    method: {
      parameters: { software_type: 'SS', software_version: '4.5.770WD' },
      method_name: 'get_api_settings'
    },
  }
```

After running the hashing password function the result is

`PASSWORD FIELD:  66667776366565613d21`

New Object

```js
tempObj Password Update:  
authentication: {id: 'sos_api', password: '66667776366565613d21'}
method:
method_name: "get_api_settings"
parameters : {software_type: 'SS', software_version: '4.5.770WD'}
```

Convert object to json adn hash

```js
JSON REQUEST:  {"authentication":{"id":"sos_api","password":"66667776366565613d21"},"method":{"parameters":{"software_type":"SS","software_version":"4.5.770WD"},"method_name":"get_api_settings"}}

HASHED JSON:  510034fbff71ae23c578b0302b77b3de5e92629b
```

Add hashed JSON to original password field of object. 

```js
{
    authentication: {id: 'sos_api', password: '510034fbff71ae23c578b0302b77b3de5e92629b'}
    method
    : {parameters: {…}, method_name: 'get_api_settings'}
}
```

Send file 

Response to posted api request

```js
msg: "id/password invalid/not supplied"
status_code: "401"
```
