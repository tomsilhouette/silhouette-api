# Results

Previous Issue: The javascript SHA1 hashing algorythm was incorrectly encoding the results
Fix: `const hash = sha.update(slice, 'ascii').digest().subarray(0, 2);` Then converting the result back into a string

## Current output (Using no security browser)

Now i can make a request to various API urls from the API document and get the expected results
This returns a full list of machines.

```js
{success: true, status_code: '200', msg: 'success', data: {…}}
data: machines_list:
    alta1: true
    alta1-plus: true
    auto-sheet-feeder1: false
    cameo1: true
    cameo2: true
    cameo3: true
    cameo4: true
    cameo4-plus: true
    cameo4-pro: false
    curio1: true
    curio2: false
    mint1: true
    orig-silhouette: true
    portrait1: true
    portrait2: true
    portrait3: true
    sd: true

Object {}
msg: ""status_code: "200" success: true
```

## Output (Normal Browser)

With a normal browser we are still seeing the 'CORS' error.
Meaning the server is not allowed to commicate its results to our browser.
This is most likely because it lacks the header for access control origins. Which needs to include our IP addresses.

This is the same request but using a secure browser

```js

SENDING: 18370294a44f898ea167d74a7b84a27901800374

TestPost.jsx:68 NEW OBJECT {authentication: {…}, method: {…}}

t:1 Access to XMLHttpRequest at 'https://api.silhouettedesignstore.com/' from origin 'http://localhost:3000' has been blocked by CORS policy: Response to preflight request doesn't pass access control check: No 'Access-Control-Allow-Origin' header is present on the requested resource.
TestPost.jsx:88 Unable to get response AxiosError {message: 'Network Error', name: 'AxiosError', code: 'ERR_NETWORK', config: {…}, request: XMLHttpRequest, …}


POST https://api.silhouettedesignstore.com/ net::ERR_FAILED
```

## Potential Causes/Fixes

Here is a breakdown of the responses.

1. CORS Policy Violation: Your application running on http://localhost:3000 is trying to access resources from https://api.silhouettedesignstore.com/. Since these are different origins (different domains, protocols, or ports), the browser's CORS policy kicks in.

2. No 'Access-Control-Allow-Origin' Header: The error message indicates that the response from https://api.silhouettedesignstore.com/ does not include the necessary Access-Control-Allow-Origin header. This header is required for the browser to accept a response from a different origin. Without it, the browser will block the request.

3. Preflight Request Failure: Before sending the actual request, modern browsers send a preflight request (using the OPTIONS method) to check if the cross-origin call is allowed. The failure of this preflight request due to the missing CORS header leads to the entire request being blocked. - Same as 1

4. AxiosError: The error message you provided indicates that Axios (a popular HTTP client) was used to make the request. Axios correctly reports a 'Network Error' because the browser blocked the request.

To resolve this issue, there are a few possible approaches:

1. Server-Side Changes: The best solution is to modify the server (https://api.silhouettedesignstore.com/) to include the Access-Control-Allow-Origin header in the response. This header should specify which origins are allowed to access the resources or use \* to allow any origin.

2. Proxy Server: If you cannot modify the server's response headers, another option is to set up a proxy server. This server will make requests to the API on behalf of your application and then send the response back to your application.

3. Browser Extensions or Testing Flags: For development purposes, you can use certain browser extensions or flags to disable CORS policy enforcement. However, this is not recommended for production environments.

4. Local Testing: If you're just testing locally, some browsers allow you to temporarily disable CORS policy enforcement. This can be done through browser settings or command-line flags, but it should be used cautiously and never in a production environment.

## REQUEST

```
OPTIONS / HTTP/1.1
Host: api.silhouettedesignstore.com
Accept: */*
Access-Control-Request-Method: POST
Access-Control-Request-Headers: content-type
Origin: http://localhost:3000
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.6099.71 Safari/537.36
Sec-Fetch-Mode: cors
Sec-Fetch-Site: cross-site
Sec-Fetch-Dest: empty
Referer: http://localhost:3000/
Accept-Encoding: gzip, deflate, br
Accept-Language: en-GB,en-US;q=0.9,en;q=0.8
Priority: u=1, i
Connection: close

```

### Response (Failed)

```
HTTP/1.1 200 OK
Date: Tue, 19 Dec 2023 15:03:46 GMT
Server: Apache
Set-Cookie: silh_api_uuid=0509c90b-ef35-4cbd-8bf3-a5f8646a9e7d; expires=Wed, 18-Dec-2024 15:03:46 GMT; Max-Age=31536000; path=/
Set-Cookie: silh_api_uuid=0509c90b-ef35-4cbd-8bf3-a5f8646a9e7d; expires=Wed, 18-Dec-2024 15:03:46 GMT; Max-Age=31536000; path=/
Cache-Control: max-age=864000
Expires: Fri, 29 Dec 2023 15:03:46 GMT
Vary: Accept-Encoding
X-Frame-Options: sameorigin
Content-Length: 93
Connection: close
Content-Type: text/html; charset=UTF-8

{"success":false,"status_code":"400","msg":"invalid request\/request not supplied","data":[]}
```

### Response (CORS OFF)

Cache-Control: max-age=864000
Connection: Keep-Alive
Content-Encoding: gzip
Content-Length: 188
Content-Type: text/html; charset=UTF-8
Date: Tue, 19 Dec 2023 16:16:21 GMT
Expires: Fri, 29 Dec 2023 16:16:21 GMT
Keep-Alive: timeout=5, max=100
Server: Apache
Set-Cookie: silh_api_uuid=157ae169-77d3-4e08-bfce-930450dd96f1; expires=Wed, 18-Dec-2024 16:16:21 GMT; Max-Age=31536000; path=/
Set-Cookie: silh_api_uuid=157ae169-77d3-4e08-bfce-930450dd96f1; expires=Wed, 18-Dec-2024 16:16:21 GMT; Max-Age=31536000; path=/
Vary: Accept-Encoding
X-Frame-Options: sameorigin

Payload:
{"success":true,"status_code":"200","msg":"success","data":{"machines_list":{"alta1":true,"alta1-plus":true,"auto-sheet-feeder1":false,"cameo1":true,"cameo2":true,"cameo3":true,"cameo4":true,"cameo4-plus":true,"cameo4-pro":false,"curio1":true,"curio2":false,"mint1":true,"orig-silhouette":true,"portrait1":true,"portrait2":true,"portrait3":true,"sd":true},"msg":"","status_code":"200","success":true}}

### Expected

'Access-Control-Allow-Origin': silhouette.com
