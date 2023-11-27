
import { useQuery } from "react-query";
import apiClient from "../apiClient";
import baseUrl from "@/configs/base-url";

const auth_header = {
  "Content-Type": "application/json",
  Accept: "application/json",
  "Access-Control-Request-Method": "POST",
  "Access-Control-Request-Headers": "Content-Type, Accept",
};

const auth_header_files = {
  "Content-Type": "multipart/form-data",
  Accept: "application/json",
  "Access-Control-Request-Method": "POST",
  "Access-Control-Request-Headers": "Content-Type, Accept",
};


export const getCategorysList = async (count=10) => {
    const response = await apiClient.get(`/category?count=${count}`, {
      headers: auth_header,
    });
    if (!response.status) {
      return null;
    }
    return response?.data;
  };
  

var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");
myHeaders.append("Accept", "application/json");

export const getCategory = async (count=10,userToken=null) => {
    auth_header.Authorization = `Bearer ${userToken}`;
    const response = await apiClient.get(`/category?count=${count}`, {
      headers: auth_header,
    });
    console.log('resp',response)
    if (response.status !== 200) {
      return null;
    }
    return response?.data;
};

export const showCategory = async (id, userToken) => {
//   myHeaders.append("Authorization", `Bearer ${userToken}`);
//   const requestOptions = {
//     method: "GET",
//     headers: myHeaders,
//     redirect: "follow",
//   };
//   let mainResult = null;
//   await fetch(`${baseUrl}/api/category/show/${id}`, requestOptions)
//     .then((response) => response.text())
//     .then((result) => {
//       mainResult = result;
//       console.log("video", result);
//     })
//     .catch((error) => console.log("error", error));
//   return JSON.parse(mainResult);


  auth_header.Authorization = `Bearer ${userToken}`;

  const response = await apiClient.get(`/category/show/${id}`, {
    headers: auth_header,
  });
  console.log("status", response);
  if (response.status !== 200) {
    return null;
  }
  return response?.data;
};

export const createCategory = async (name,icon, userToken) => {
  auth_header_files.Authorization = `Bearer ${userToken}`;
  const response = apiClient
    .post(
      `/category/store`,
      {
        name: name,
        icon: icon,
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

export const updateCategory = async (id, values, userToken) => {
  myHeaders.append("Authorization", `Bearer ${userToken}`);
  var raw = JSON.stringify({
    name: values.name,
    icon: values.icon,
  });
  const requestOptions = {
    method: "PATCH",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };
  let mainResult = null;
  await fetch(`${baseUrl}/api/category/update/${id}`, requestOptions)
    .then((response) => response.text())
    .then((result) => {
      mainResult = result;
      console.log("update category", result);
    })
    .catch((error) => console.log("error", error));
  return JSON.parse(mainResult);
};

export const deleteCategory = async (id, userToken) => {
  myHeaders.append("Authorization", `Bearer ${userToken}`);
  const requestOptions = {
    method: "DELETE",
    headers: myHeaders,
    redirect: "follow",
  };
  let mainResult = null;
  await fetch(`${baseUrl}/api/category/delete/${id}`, requestOptions)
    .then((response) => response.text())
    .then((result) => {
      mainResult = result;
      console.log("delete category", result);
    })
    .catch((error) => console.log("error", error));
  return JSON.parse(mainResult);
};
