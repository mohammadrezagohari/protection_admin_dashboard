import { QueryClient, useQuery, useQueryClient } from "react-query";
import apiClient from "../apiClient";
import { _apiClient } from "../baseApi";
import { userRegister } from "./auth-api";
import baseUrl from "@/configs/base-url";

var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");
myHeaders.append("Accept", "application/json");

const auth_header = {
    "Content-Type": "multipart/form-data",
    Accept: "application/json",
  };
export const fetchUsers = async (userToken) => {
    myHeaders.append("Authorization", `Bearer ${userToken}`);
    var requestOptions = {
      method: "get",
      headers: myHeaders,
      redirect: "follow",
    };
    let mainResult = null;
    await fetch(`${baseUrl}/api/user`, requestOptions)
      .then((response) => response.text())
      .then((result) => {
        mainResult = result;
      })
      .catch((error) => console.log("error", error));
    return JSON.parse(mainResult);
};


export const getUsers = async (count = 10, userToken = null) => {
    auth_header.Authorization = `Bearer ${userToken}`;
    const response = await apiClient.get(`/user?count=${count}`, {
      headers: auth_header,
    });
    if (response.status !== 200) {
      return null;
    }
    return response?.data;
  };
  
  export const showUser = async (id, userToken) => {
    auth_header.Authorization = `Bearer ${userToken}`;
  
    const response = await apiClient.get(`/user/show/${id}`, {
      headers: auth_header,
    });
    if (response.status !== 200) {
      return null;
    }
    return response?.data;
  };
  


// const fetchUser = async (userId) => {
//   const response = await apiClient.get("/profile/me"); // Replace with your API endpoint

//   if (response.status !== 200) {
//     throw new Error("Failed to fetch data");
//   }

//   return response.data;
// };
