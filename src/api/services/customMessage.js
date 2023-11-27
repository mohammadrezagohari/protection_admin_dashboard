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


export const getCustomMessage = async (userToken) => {
  myHeaders.append("Authorization", `Bearer ${userToken}`);
  var requestOptions = {
    method: "get",
    headers: myHeaders,
    redirect: "follow",
  };
  let mainResult = null;
  await fetch(`${baseUrl}/api/custom-message`, requestOptions)
    .then((response) => response.text())
    .then((result) => {
      mainResult = result;
      console.log("CustomMessage", result);
    })
    .catch((error) => console.log("error", error));
  return JSON.parse(mainResult);
};

export const showCustomMessage = async (id,userToken)=>{
 myHeaders.append("Authorization", `Bearer ${userToken}`);
 const requestOptions = {
   method: 'GET',
   headers: myHeaders,
   redirect: 'follow'
 };
 let mainResult = null;
 await fetch(`${baseUrl}/api/custom-message/show/${id}`, requestOptions)
 .then(response => response.text())
 .then(result => {
   mainResult = result;
   console.log("custom-message", result);
 })
 .catch((error) => console.log("error", error));
 return JSON.parse(mainResult);

}

export const createCustomMessage = async (values,userToken) => {
 myHeaders.append("Authorization", `Bearer ${userToken}`);
   const raw = JSON.stringify({
     title: values.title,
     mobile: values.mobile,
     context:values.context,
   })
   const requestOptions = {
     method: 'POST',
     headers: myHeaders,
     body: raw,
     redirect: 'follow'
   };
   let mainResult = null;
   await fetch(`${baseUrl}/api/custom-message/store`, requestOptions)
     .then((response) => response.text())
     .then((result) => {
       mainResult = result;
       console.log("create custom-message", result);
     })
     .catch((error) => console.log("error", error));
   return JSON.parse(mainResult);
 };

 export const updateCustomMessage = async (id,values,userToken) => {
   myHeaders.append("Authorization", `Bearer ${userToken}`);
     var raw = JSON.stringify({
        title: values.title,
        mobile: values.mobile,
        context:values.context,
     })
     const requestOptions = {
       method: 'PATCH',
       headers: myHeaders,
       body: raw,
       redirect: 'follow'
     };
     let mainResult = null;
     await fetch(`${baseUrl}/api/custom-message/update/${id}`, requestOptions)
       .then((response) => response.text())
       .then((result) => {
         mainResult = result;
         console.log("update custom-message", result);
       })
       .catch((error) => console.log("error", error));
     return JSON.parse(mainResult);
   };
 

   export const deleteCustomMessage = async (id,userToken) => {
     myHeaders.append("Authorization", `Bearer ${userToken}`);
       const requestOptions = {
         method: 'DELETE',
         headers: myHeaders,
         redirect: 'follow'
       };
       let mainResult = null;
       await fetch(`${baseUrl}/api/custom-message/delete/${id}`, requestOptions)
         .then((response) => response.text())
         .then((result) => {
           mainResult = result;
           console.log("delete custom-message", result);
         })
         .catch((error) => console.log("error", error));
       return JSON.parse(mainResult);
     };
 

