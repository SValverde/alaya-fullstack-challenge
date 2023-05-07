import fetch from 'isomorphic-fetch';

export const API_URL = 'http://localhost:3000/api';

export default async (endpoint, method = 'get', body) => {
  return fetch(`${API_URL}/${endpoint}`, {
    headers: { 'content-type': 'application/json' },
    method,
    body: JSON.stringify(body),
  })
  .then(response => response.json().then(json => ({ json, response })))
  .then(({ json, response }) => {
    if (!response.ok) {
      return Promise.reject(json);
    }

    return json;
  })
  .then(
    response => response,
    error => error
  );
}

export const multiPartCall  = (endpoint, method='post', jsonBody) =>{
  console.log("Jsonbody:",jsonBody);
  const formData = new FormData();
  for ( var key in jsonBody ) {
    formData.append(key, jsonBody[key]);
  }
  return fetch(`${API_URL}/${endpoint}`, {
    method,
    body: formData
  })
  .then(response => response.json().then(json => ({ json, response })))
  .then(({ json, response }) => {
    if (!response.ok) {
      return Promise.reject(json);
    }

    console.log("Json response:",json);
    return json;
  })
  .then(
    response => response,
    error => error
  );
}
