  import { useQuery } from "react-query";
  import apiClient from "../apiClient";
  import baseUrl from "@/configs/base-url";



  
var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");
myHeaders.append("Accept", "application/json");


export const getGoal = async (userToken)=>{
  myHeaders.append("Authorization", `Bearer ${userToken}`);

  const requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };
  let mainResult = null;
  await fetch(`${baseUrl}/api/goal`, requestOptions)
  .then(response => response.text())
  .then(result => {
    mainResult = result;
    console.log("goal", result);
  })
  .catch((error) => console.log("error", error));
  return JSON.parse(mainResult);

}



export const showGoal = async (id,userToken)=>{
  myHeaders.append("Authorization", `Bearer ${userToken}`);

  const requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };
  let mainResult = null;
  await fetch(`${baseUrl}/api/goal/show/${id}`, requestOptions)
  .then(response => response.text())
  .then(result => {
    mainResult = result;
    console.log("goal", result);
  })
  .catch((error) => console.log("error", error));
  return JSON.parse(mainResult);

}



export const createGoal = async (values,userToken) => {
  myHeaders.append("Authorization", `Bearer ${userToken}`);
    var raw = JSON.stringify({
      title: values.title,
      description: values.description,
    })
    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
    let mainResult = null;
    await fetch(`${baseUrl}/api/goal/store`, requestOptions)
      .then((response) => response.text())
      .then((result) => {
        mainResult = result;
        console.log("create goal", result);
      })
      .catch((error) => console.log("error", error));
    return JSON.parse(mainResult);
  };



  export const updateGoal = async (id,values,userToken) => {
    myHeaders.append("Authorization", `Bearer ${userToken}`);
      var raw = JSON.stringify({
        title: values.title,
        description: values.description,
      })
      const requestOptions = {
        method: 'PATCH',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      };
      let mainResult = null;
      await fetch(`${baseUrl}/api/goal/update/${id}`, requestOptions)
        .then((response) => response.text())
        .then((result) => {
          mainResult = result;
          console.log("update goal", result);
        })
        .catch((error) => console.log("error", error));
      return JSON.parse(mainResult);
    };
  

    export const deleteGoal = async (id,userToken) => {
      myHeaders.append("Authorization", `Bearer ${userToken}`);
        const requestOptions = {
          method: 'DELETE',
          headers: myHeaders,
          redirect: 'follow'
        };
        let mainResult = null;
        await fetch(`${baseUrl}/api/goal/delete/${id}`, requestOptions)
          .then((response) => response.text())
          .then((result) => {
            mainResult = result;
            console.log("delete goal", result);
          })
          .catch((error) => console.log("error", error));
        return JSON.parse(mainResult);
      };
  

