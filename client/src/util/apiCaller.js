import fetch from 'isomorphic-fetch';
import { JWT_TOKEN } from '../User/UserActions';

export const API_URL = 'http://localhost:3000/api';

export default async (endpoint, method = 'get', body) => {

  const headers = {
    headers: { 'content-type': 'application/json' },
    method,
    body: JSON.stringify(body),
  }

  const jwtToken = localStorage.getItem(JWT_TOKEN);

  if(jwtToken) headers.headers.Authorization = `Bearer ${jwtToken}`;

  return fetch(`${API_URL}/${endpoint}`, headers)
  .then(response => {
    // TODO Handle non-json responses (e.g. passport errors) or handle in the server
    return response.json().then(json => ({ json, response }))}
    )
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
  const formData = new FormData();
  for ( var key in jsonBody ) {
    if(jsonBody[key]) formData.append(key, jsonBody[key]);
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

    return json;
  })
  .then(
    response => response,
    error => error
  );
}
