import axios from 'axios';


const es = 'http://localhost:8080/shops/';

export const sendToServer=(data)=> {
  return axios.post(es, data)
  .then(function (response) {
    console.log(response);
  }).catch(e =>{
    console.error(e);
  })
};

export const fetchFromServer=(req)=> {
  console.log(req.header)
  return axios.get(es,req);  
};

export const fetchNearbyFromServer=(param)=> {
  return axios.get(es.concat("pin/").concat("@").concat(param.req.geoPoint.lat).concat(",").concat(param.req.geoPoint.lon));  
};