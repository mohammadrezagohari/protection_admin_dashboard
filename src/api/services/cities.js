import { useQuery } from "react-query";
import apiClient from "../apiClient";

const auth_header = {
  "Content-Type": "application/json",
  Accept: "application/json",
};

export const getCities = async (userToken) => {
  auth_header.Authorization = `Bearer ${userToken}`;
  console.log('auth header',auth_header)
  const response = await apiClient.get("/city", {
    headers: auth_header,
  });
  
  if (response.status !== 200) {
    return null;
  }
  return response?.data;
};
