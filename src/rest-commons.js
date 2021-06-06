import axios from 'axios';


export const sendToServer=(data)=> {
  return axios.post('http://localhost:8080/shop/', data)
  .then(function (response) {
    console.log(response);
  }).catch(e =>{
    console.error(e);
  })
};

export const fethFromServer=(header,requestParam)=> {
  return axios.get('http://localhost:8080/shop/',{requestParam})
  .then(function (response) {
    console.log(response);
  }).catch(e =>{
    console.error(e);
  })
};
