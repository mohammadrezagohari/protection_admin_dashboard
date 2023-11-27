import { useQuery } from "react-query";
import apiClient from "../apiClient";

const auth_header = {
  "Content-Type": "application/json",
  Accept: "application/json",
  "Access-Control-Request-Method": "POST",
  "Access-Control-Request-Headers": "Content-Type, Accept",
};

export const getProvince = async (userToken) => {
  auth_header.Authorization = `Bearer ${userToken}`;
  const response = await apiClient.get("/province?count=1000", {
    headers: auth_header,
  });
  console.log("data response", response?.data);
  if (response.status !== 200) {
    return null;
  }
  console.log("getdata province", response.data);
  return response?.data;
};

export const createProvinces = async (name, userToken) => {
  auth_header.Authorization = `Bearer ${userToken}`;

  const response = await apiClient.post(
    `/province/store`,
    {
      name: name,
      slug: name,
    },
    {
      headers: auth_header,
    }
  );
  console.log("status", response);
  if (response.status !== 200) {
    return null;
  }
  return response?.data;
};

export const showProvinces = async (id) => {
  const response = await apiClient.get(`/province/show/${id}`, {
    headers: auth_header,
  });
  console.log("status", response);
  if (response.status !== 200) {
    return null;
  }
  return response?.data;
};

export const updateProvinces = async (id, values) => {
  const response = await apiClient.patch(
    `/province/update/${id}`,
    {
      name: values.name,
      slug: values.slug,
    },
    {
      headers: auth_header,
    }
  );
  console.log("status", response);
  if (response.status !== 200) {
    return null;
  }
  return response?.data;
};

export const deleteProvinces = async (id) => {
  const response = await apiClient.delete(`/province/delete/${id}`, {
    headers: auth_header,
  });
  console.log("status", response);
  if (response.status !== 200) {
    return null;
  }
  return response?.data;
};
