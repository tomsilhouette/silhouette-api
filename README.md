# Test

chrome.exe --user-data-dir="C://Chrome dev session" --disable-web-security

## Table of contents

- [Test](#test)
  - [Table of contents](#table-of-contents)
  - [General info](#general-info)
  - [Technologies](#technologies)
  - [Run this project locally](#run-this-project-locally)
  - [Testing](#testing)
  - [Error](#error)

## General info

## Technologies

App developed with:

Frontend: React, JavaScript, Tailwind, Axios, validator

Backend: Express, Prisma, JavaScript

## Run this project locally

1. Fork this repository and clone the fork to your machine.
2. Navigate to client and server files and run
3. `npm install`
4. `npm start`

## Testing

API tests run through Insomnia testing suit.
Check server dir for test files.

## Error

curl -X POST -H "Content-Type: application/json" -d '{"authentication": {"id": "sos_api","password": "284e1db0332a332a04fa546564246ac359a405f6"},"method": {"method_name": "get_api_settings","parameters": {}}}' https://api.silhouettedesignstore.com/

localhost/:1 Access to XMLHttpRequest at 'https://api.silhouettedesignstore.com/' from origin 'http://localhost:3000' has been blocked by CORS policy: Response to preflight request doesn't pass access control check: No 'Access-Control-Allow-Origin' header is present on the requested resource.
HomePage.jsx:69 Unable to get stuff AxiosError {message: 'Network Error', name: 'AxiosError', code: 'ERR_NETWORK', config: {…}, request: XMLHttpRequest, …}code: "ERR_NETWORK"config: {transitional: {…}, adapter: Array(2), transformRequest: Array(1), transformResponse: Array(1), timeout: 0, …}message: "Network Error"name: "AxiosError"request: XMLHttpRequest {onreadystatechange: null, readyState: 4, timeout: 0, withCredentials: false, upload: XMLHttpRequestUpload, …}stack: "AxiosError: Network Error\n at XMLHttpRequest.handleError (http://localhost:3000/static/js/bundle.js:53666:14)"[[Prototype]]: Error

(anonymous) @ HomePage.jsx:69
Promise.catch (async)
makeAPIrequest @ HomePage.jsx:66
callCallback @ react-dom.development.js:4164
invokeGuardedCallbackDev @ react-dom.development.js:4213
invokeGuardedCallback @ react-dom.development.js:4277
invokeGuardedCallbackAndCatchFirstError @ react-dom.development.js:4291
executeDispatch @ react-dom.development.js:9041
processDispatchQueueItemsInOrder @ react-dom.development.js:9073
processDispatchQueue @ react-dom.development.js:9086
dispatchEventsForPlugins @ react-dom.development.js:9097
(anonymous) @ react-dom.development.js:9288
batchedUpdates$1 @ react-dom.development.js:26140
batchedUpdates @ react-dom.development.js:3991
dispatchEventForPluginEventSystem @ react-dom.development.js:9287
dispatchEventWithEnableCapturePhaseSelectiveHydrationWithoutDiscreteEventReplay @ react-dom.development.js:6465
dispatchEvent @ react-dom.development.js:6457
dispatchDiscreteEvent @ react-dom.development.js:6430

client.js:18
POST https://api.silhouettedesignstore.com/ net::ERR_FAILED
