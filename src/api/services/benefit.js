import baseUrl from "@/configs/base-url";
import apiClient from "../apiClient";
var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");
myHeaders.append("Accept", "application/json");

const auth_header = {
  "Content-Type": "application/json",
  Accept: "application/json",
  "Access-Control-Request-Method": "POST",
  "Access-Control-Request-Headers": "Content-Type, Accept",
};

export const getBenefit = async (count = 10, userToken = null) => {
  auth_header.Authorization = `Bearer ${userToken}`;
  const response = await apiClient.get(`/benefit?count=${count}`, {
    headers: auth_header,
  });
  console.log("resp", response);
  if (response.status !== 200) {
    return null;
  }
  return response?.data;
};

export const showBenefit = async (id, userToken) => {
  myHeaders.append("Authorization", `Bearer ${userToken}`);

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };
  let mainResult = null;
  await fetch(`${baseUrl}/api/benefit/show/${id}`, requestOptions)
    .then((response) => response.text())
    .then((result) => {
      mainResult = result;
      console.log("benefit", result);
    })
    .catch((error) => console.log("error", error));
  return JSON.parse(mainResult);
};

export const createBenefit = async (values, userToken) => {
  myHeaders.append("Authorization", `Bearer ${userToken}`);
  const raw = JSON.stringify({
    title: values.title,
    is_active: values.is_active,
  });
  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };
  let mainResult = null;
  await fetch(`${baseUrl}/api/benefit/store`, requestOptions)
    .then((response) => response.text())
    .then((result) => {
      mainResult = result;
    });
  return JSON.parse(mainResult);
};

export const updateBenefit = async (id, values, userToken) => {
  myHeaders.append("Authorization", `Bearer ${userToken}`);
  var raw = JSON.stringify({
    title: values.title,
    is_active: values.is_active,
  });
  const requestOptions = {
    method: "PATCH",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };
  let mainResult = null;
  await fetch(`${baseUrl}/api/benefit/update/${id}`, requestOptions)
    .then((response) => response.text())
    .then((result) => {
      mainResult = result;
      console.log("update benefit", result);
    })
    .catch((error) => console.log("error", error));
  return JSON.parse(mainResult);
};

export const deleteBenefit = async (id, userToken) => {
  myHeaders.append("Authorization", `Bearer ${userToken}`);
  const requestOptions = {
    method: "DELETE",
    headers: myHeaders,
    redirect: "follow",
  };
  let mainResult = null;
  await fetch(`${baseUrl}/api/benefit/delete/${id}`, requestOptions)
    .then((response) => response.text())
    .then((result) => {
      mainResult = result;
      console.log("delete benefit", result);
    })
    .catch((error) => console.log("error", error));
  return JSON.parse(mainResult);
};
