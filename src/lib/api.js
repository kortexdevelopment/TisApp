import * as HTTP from './http';

exports.verifyLogin = async (user, pass) => {
  let endpoint = `login.php`;

  let urlParams = `?user_name=${user}&user_password=${pass}`

  let data = HTTP.GET(`${endpoint}${urlParams}`);

  return data;
}

exports.clientData = async (client_id) => {
  let endpoint = `clientData.php`;

  let urlParams = `?client_id=${client_id}`

  let data = HTTP.GET(`${endpoint}${urlParams}`);

  return data;
}

exports.clientCompanies = async (cid) => {
  let endpoint = `clientCompaniesList.php`;

  let urlParams = `?cid=${cid}`

  let data = HTTP.GET(`${endpoint}${urlParams}`);

  return data;
}

exports.clientCertificates = async (cid) => {
  let endpoint = `clientCertificates.php`;

  let urlParams = `?cid=${cid}`

  let data = HTTP.GET(`${endpoint}${urlParams}`);

  return data;
}

exports.clientLibrary = async (cid) => {
  let endpoint = `clientLibrary.php`;

  let urlParams = `?cid=${cid}`

  let data = HTTP.GET(`${endpoint}${urlParams}`);

  return data;
}

exports.deleteCompany = async (cid) => {
  let endpoint = `deleteCompany.php`;

  let urlParams = `?cid=${cid}`

  let data = HTTP.GET(`${endpoint}${urlParams}`);

  return data;
}

exports.createCertLog = async (cid) => {
  let endpoint = `createCertLog.php`;

  let urlParams = `?cid=${cid}`

  let data = HTTP.GET(`${endpoint}${urlParams}`);

  return data;
}

exports.createCertPdf = async (lid) => {
  let endpoint = `createCertPdf.php`;

  let urlParams = `?lid=${lid}`

  let data = HTTP.GET(`${endpoint}${urlParams}`);

  return data;
}

exports.sendCertMail = async (to, pid) => {
  let endpoint = `sendCertMail.php`;

  let urlParams = `?to=${to}&pid=${pid}`

  let data = HTTP.GET(`${endpoint}${urlParams}`);

  return data;
}

exports.sendFileMail = async (to, file) => {
  let endpoint = `sendFileMail.php`;

  let urlParams = `?to=${to}&file=${file}`

  let data = HTTP.GET(`${endpoint}${urlParams}`);

  return data;
}

exports.createCompany = async (cid, name, street, city, state, zip) => {
  let endpoint = `createCompany.php`;

  const postData = {}
  postData['cid'] = cid;
  postData['name'] = name;
  postData['street'] = street;
  postData['city'] = city;
  postData['state'] = state;
  postData['zip'] = zip;
  
  let data = HTTP.POST(endpoint, postData);

  return data;
}