import { useQuery } from "react-query";
import apiClient from "../apiClient";
import baseUrl from "@/configs/base-url";

var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");
myHeaders.append("Accept", "application/json");

export const getAbout = async (userToken)=>{
  myHeaders.append("Authorization", `Bearer ${userToken}`);

  const requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };
  let mainResult = null;
  await fetch(`${baseUrl}/api/about`, requestOptions)
  .then(response => response.text())
  .then(result => {
    mainResult = result;
    console.log("about", result);
  })
  .catch((error) => console.log("error", error));
  return JSON.parse(mainResult);

}

export const createAbout = async (values,userToken) => {
  myHeaders.append("Authorization", `Bearer ${userToken}`);
    var raw = JSON.stringify({
      content: values.content,
      title: values.title,
    })
    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
    let mainResult = null;
    await fetch(`${baseUrl}/api/about/store`, requestOptions)
      .then((response) => response.text())
      .then((result) => {
        mainResult = result;
        console.log("create about", result);
      })
      .catch((error) => console.log("error", error));
    return JSON.parse(mainResult);
  };


export const updateAbout = async (id, values) => {
  myHeaders.append("Authorization", `Bearer ${userToken}`);
      var raw = JSON.stringify({
        content: values.content,
        title: values.title,
      })
      const requestOptions = {
        method: 'PATCH',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      };
      let mainResult = null;
      await fetch(`${baseUrl}/api/about/update/${id}`, requestOptions)
        .then((response) => response.text())
        .then((result) => {
          mainResult = result;
          console.log("update about", result);
        })
        .catch((error) => console.log("error", error));
      return JSON.parse(mainResult);
    };
  

export const deleteAbout = async (id) => {
  myHeaders.append("Authorization", `Bearer ${userToken}`);
  const requestOptions = {
    method: 'DELETE',
    headers: myHeaders,
    redirect: 'follow'
  };
  let mainResult = null;
  await fetch(`${baseUrl}/api/about/delete/${id}`, requestOptions)
    .then((response) => response.text())
    .then((result) => {
      mainResult = result;
      console.log("delete about", result);
    })
    .catch((error) => console.log("error", error));
  return JSON.parse(mainResult);
};
