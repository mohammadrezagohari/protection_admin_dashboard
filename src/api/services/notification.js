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


export const getNotification = async (userToken) => {
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

export const showNotification = async (id,userToken)=>{
 myHeaders.append("Authorization", `Bearer ${userToken}`);
 const requestOptions = {
   method: 'GET',
   headers: myHeaders,
   redirect: 'follow'
 };
 let mainResult = null;
 await fetch(`${baseUrl}/api/notification/show/${id}`, requestOptions)
 .then(response => response.text())
 .then(result => {
   mainResult = result;
   console.log("notification", result);
 })
 .catch((error) => console.log("error", error));
 return JSON.parse(mainResult);

}

export const createNotification = async (values,userToken) => {
 myHeaders.append("Authorization", `Bearer ${userToken}`);
   const raw = JSON.stringify({
     subject:values.subject,
     context:values.context,
     status:values.status,
   })
   const requestOptions = {
     method: 'POST',
     headers: myHeaders,
     body: raw,
     redirect: 'follow'
   };
   let mainResult = null;
   await fetch(`${baseUrl}/api/notification/store`, requestOptions)
     .then((response) => response.text())
     .then((result) => {
       mainResult = result;
       console.log("create notification", result);
     })
     .catch((error) => console.log("error", error));
   return JSON.parse(mainResult);
 };

 export const updateNotification = async (id,values,userToken) => {
   myHeaders.append("Authorization", `Bearer ${userToken}`);
     var raw = JSON.stringify({
        subject:values.subject,
        context:values.context,
        status:values.status,
     })
     const requestOptions = {
       method: 'PATCH',
       headers: myHeaders,
       body: raw,
       redirect: 'follow'
     };
     let mainResult = null;
     await fetch(`${baseUrl}/api/notification/update/${id}`, requestOptions)
       .then((response) => response.text())
       .then((result) => {
         mainResult = result;
         console.log("update notification", result);
       })
       .catch((error) => console.log("error", error));
     return JSON.parse(mainResult);
   };
 

   export const deleteNotification = async (id,userToken) => {
     myHeaders.append("Authorization", `Bearer ${userToken}`);
       const requestOptions = {
         method: 'DELETE',
         headers: myHeaders,
         redirect: 'follow'
       };
       let mainResult = null;
       await fetch(`${baseUrl}/api/notification/delete/${id}`, requestOptions)
         .then((response) => response.text())
         .then((result) => {
           mainResult = result;
           console.log("delete Notification", result);
         })
         .catch((error) => console.log("error", error));
       return JSON.parse(mainResult);
     };
 

