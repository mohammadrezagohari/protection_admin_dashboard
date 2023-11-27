import { useQuery } from "react-query";
import apiClient from "../apiClient";
import baseUrl from "@/configs/base-url";

const header = {
  "Content-Type": "application/json",
  Accept: "application/json",
  "Access-Control-Request-Method": "POST",
  "Access-Control-Request-Headers": "Content-Type, Accept",
};
var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");
myHeaders.append("Accept", "application/json"); 

export const getArticleCount = async (userToken) => {
  myHeaders.append("Authorization", `Bearer ${userToken}`);
  //   var raw = JSON.stringify({
  //     mobile: mobile,
  //     password: password,
  //   });
  var requestOptions = {
    method: "get",
    headers: myHeaders,
    redirect: "follow",
  };
  let mainResult = null;
  await fetch(`${baseUrl}/api/article/quantity`, requestOptions)
    .then((response) => response.text())
    .then((result) => {
      mainResult = result;
    })
    .catch((error) => console.log("error", error));
  return JSON.parse(mainResult);
};
export const getUserCount = async (userToken) => {
  myHeaders.append("Authorization", `Bearer ${userToken}`);
  var requestOptions = {
    method: "get",
    headers: myHeaders,
    redirect: "follow",
  };
  let mainResult = null;
  await fetch(`${baseUrl}/api/user/quantity`, requestOptions)
    .then((response) => response.text())
    .then((result) => {
      mainResult = result;
    })
    .catch((error) => console.log("error", error));
  return JSON.parse(mainResult);
};
export const getTutorialCount = async (userToken) => {
  myHeaders.append("Authorization", `Bearer ${userToken}`);
  var requestOptions = {
    method: "get",
    headers: myHeaders,
    redirect: "follow",
  };
  let mainResult = null;
  await fetch(`${baseUrl}/api/tutorial/quantity`, requestOptions)
    .then((response) => response.text())
    .then((result) => {
      mainResult = result;
    })
    .catch((error) => console.log("error", error));
  return JSON.parse(mainResult);
};

export const getCategoryCount = async (userToken) => {
    myHeaders.append("Authorization", `Bearer ${userToken}`);
    var requestOptions = {
      method: "get",
      headers: myHeaders,
      redirect: "follow",
    };
    let mainResult = null;
    await fetch(`${baseUrl}/api/category/quantity`, requestOptions)
      .then((response) => response.text())
      .then((result) => {
        mainResult = result;
      })
      .catch((error) => console.log("error", error));
    return JSON.parse(mainResult);
};
