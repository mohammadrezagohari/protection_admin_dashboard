import baseUrl from "@/configs/base-url";
import apiClient from "../apiClient";

const auth_header = {
  "Content-Type": "application/json",
  Accept: "application/json",
  "Access-Control-Request-Method": "POST",
  "Access-Control-Request-Headers": "Content-Type, Accept",
};
const auth_header_files = {
  "Content-Type": "application/json",
  "Accept": "application/json",
  "Access-Control-Request-Method": "PATCH",
  "Access-Control-Request-Headers": "Content-Type, Accept",
};

  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Accept", "application/json");

  export const getFaq = async () => {
    var requestOptions = {
      method: "get",
      headers: myHeaders,
      redirect: "follow",
    };
    let mainResult = null;
    await fetch(`${baseUrl}/api/faq`, requestOptions)
      .then((response) => response.text())
      .then((result) => {
        mainResult = result;
        console.log("article", result);
      })
      .catch((error) => console.log("error", error));
    return JSON.parse(mainResult);
  };
  
  export const createFaq = async (values, userToken) => {
    auth_header.Authorization = `Bearer ${userToken}`;
    const response = await apiClient.post(
      `faq/store`,
      {
        question: values.question,
        description:values.description,
      },
      {
        headers: auth_header,
      }
    );
    if (!response.status) {
      return null;
    }
    return response?.data;
  };
  
  export const showFaq = async (id) => {
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
  await fetch(`${baseUrl}/api/faq/show/${id}`, requestOptions)
    .then((response) => response.text())
    .then((result) => {
      mainResult = result;
      console.log("faq", result);
    })
    .catch((error) => console.log("error", error));
  return JSON.parse(mainResult);
  };
  
 

  export const updateFaq = async (id, values, userToken) => {
    auth_header_files.Authorization = `Bearer ${userToken}`;
    const response = await apiClient.patch(
      `faq/update/${id}`,
      {
        question:values?.question,
        description:values?.description,
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
  
  export const deleteFaq = async (id,userToken) => {
    auth_header.Authorization = `Bearer ${userToken}`;
    const response = await apiClient.delete(`faq/delete/${id}`, {
      headers: auth_header,
    });
    if (!response.status) {
      return null;
    }
    return response?.data;
  };


  