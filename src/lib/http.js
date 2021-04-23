import { Platform } from 'react-native';

// const developmentServer = Platform.OS === 'android' ? 'http://10.0.2.2:3000' : 'http://localhost:3000';
// const productionServer = developmentServer; //Needs to be updated with real serverUrl

// const API_URL = __DEV__ ? developmentServer : productionServer;

const developmentServer = 'https://truckinsurancesolutions.org/system/functions/api/mobile/';
const API_URL = developmentServer;

exports.URL_FOR = (endpoint) => {
  return `${API_URL}${endpoint}`;
}

exports.GET = async (endpoint) => {
  let requestEndpoint = endpoint;

  console.log(`${API_URL}${requestEndpoint}`);

  let response = await fetch(`${API_URL}${requestEndpoint}`);

  if (!response.ok){
     throw new Error(`HTTP_NOT_OK: ${await response.text()}`);
  }

  let json = response.json();
  
  return json;
}

exports.POST = async (endpoint, postData) => {
  let url = `${API_URL}${endpoint}`;

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(postData)
  });

  if (!response.ok) {
    throw new Error(`HTTP_NOT_OK, ${url}, ${JSON.stringify(postData)}, ${await response.text()}`);
  }

  let json = response.json();

  return json;
}

exports.DELETE = async (endpoint, postData) => {
  let url = `${API_URL}${endpoint}`;

  const response = await fetch(url, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(postData)
  });

  if (!response.ok) {
    throw new Error(`HTTP_NOT_OK, ${url}, ${JSON.stringify(postData)}, ${await response.text()}`);
  }

  let json = response.json();

  return json;
}