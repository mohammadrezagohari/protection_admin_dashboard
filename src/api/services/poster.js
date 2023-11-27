import { useQuery } from "react-query";
import apiClient from "../apiClient"; 


const auth_header_files = {
  "Content-Type": "multipart/form-data",
  "Accept": "application/json",
};
const auth_header = {
  "Content-Type": "multipart/form-data",
  "Accept": "application/json",
};

export const getPoster = async () => {
  const response = await apiClient.get("/poster?count=100", {
    headers: auth_header,
  });
  if (!response.status) {
    return null;
  }
  return response?.data;
};


export const createPoster = (values, userToken) => {
  auth_header_files.Authorization = `Bearer ${userToken}`;

  const response = apiClient
    .post(
      `/poster/store`,
      {
        poster: values.poster,
        title: values.title,
        category_id: values.category_id,
       },
     
      {
        headers: auth_header_files,
      }
    )
    .then((response) => {
      if (response.status !== 200) {
        return null;
      }
      return response;
    });
  return response;
};
    

export const showPoster = async (id,userToken) => {
  auth_header.Authorization = `Bearer ${userToken}`;
  const response = await apiClient.get(`poster/show/${id}`, {
    headers: auth_header_files,
  });
  if (!response.status) { 
    return null;
  }
  return response?.data;
};

export const updatePoster = async (id, values, userToken) => {
  auth_header_files.Authorization = `Bearer ${userToken}`;
  const response = await apiClient.patch(
    `poster/update/${id}`,
    {
      poster: values.poster,
      title: values.title,
      category_id: values.category_id,
    },
    {
      headers: auth_header_files,
    } 
  );
  if (!response.status) {
    return null;
  }
  return response?.data;
};

export const deletePoster = async (id, userToken) => {
  auth_header_files.Authorization = `Bearer ${userToken}`;
  const response = await apiClient.delete(`poster/delete/${id}`, {
    headers: auth_header_files,
  });
  if (!response.status) {
    return null;
  }
  return response?.data;
};


// let myHeaders = new Headers();
// myHeaders.append("Content-Type", "application/json");
// myHeaders.append("Accept", "application/json");
// var  requestOptions = {
//   method: 'GET',
//   headers: myHeaders,
//   redirect: 'follow'
// };

// const getPoster = ()=>{
//   fetch("https://product.gandom.link/api/poster", requestOptions)
//   .then(response => response.text())
//   .then(result => console.log(result))
//   .catch(error => console.log('error', error));
// }

// const showPoster = () =>{
//   fetch("https://product.gandom.link/api/poster/show/reiciendis", requestOptions)
//   .then(response => response.text())
//   .then(result => console.log(result))
//   .catch(error => console.log('error', error));
// }


// let raw = JSON.stringify({
//   "title": title,
//   "category_id": category_id
// });

// var requestOptions2 = {
//   method: 'POST',
//   headers: myHeaders,
//   body: raw,
//   redirect: 'follow'
// };

// const createPoster = () =>{
//   fetch("https://product.gandom.link/api/poster/store", requestOptions2)
//   .then(response => response.text())
//   .then(result => console.log(result))
//   .catch(error => console.log('error', error));
// }


// var requestOptions3 = {
//   method: 'PATCH',
//   headers: myHeaders,
//   body: raw,
//   redirect: 'follow'
// };


// const updatePoster = () =>{
// fetch("https://product.gandom.link/api/poster/update/fugiat", requestOptions3)
//   .then(response => response.text())
//   .then(result => console.log(result))
//   .catch(error => console.log('error', error));

// }



// var requestOptions4 = {
//   method: 'DELETE',
//   headers: myHeaders,
//   redirect: 'follow'
// };

// const deletePoster = () =>{
// fetch("https://product.gandom.link/api/poster/delete/tempora", requestOptions4)
//   .then(response => response.text())
//   .then(result => console.log(result))
//   .catch(error => console.log('error', error));
// } 