import axios from 'axios';
const baseUrl = "http://localhost:5000/";

export function getRequest(path) {
  let url = `${baseUrl}${path}`;
  return axios.get(`${url}`);
}

export function postRequest(path, data) {
  let url = `${baseUrl}${path}`;
  return axios.post(`${url}`, data);
}


export function addRecipe(data) {
  return postRequest('addRecipe', data)
}

export function addCustomRecipe(data) {
  return postRequest('addCustomRecipe', data)
}

export function fetchRecipe(data) {
  return postRequest('fetchRecipe', data)
}

export function updateRecipe(data) {
  return postRequest('updateRecipe', data)
}
