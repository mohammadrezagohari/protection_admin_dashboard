import { useQuery } from "react-query";
import apiClient from "../apiClient";

const auth_header_files = {
  "Content-Type": "multipart/form-data",
  Accept: "application/json",
};

export const getHospital = async (userToken) => {
  auth_header_files.Authorization = `Bearer ${userToken}`;
  const response = await apiClient.get("/hospital?count=100", {
    headers: auth_header_files,
  });
  if (!response.status) {
    return null;
  }
  return response?.data;
};

export const createHospital = async (values, userToken) => {
  auth_header_files.Authorization = `Bearer ${userToken}`;
  const response = await apiClient.post(
    `hospital/store`,
    {
        name:values.name,
        address: values.address,
        telephone: values.telephone,
        description:values.description ,
        email: values.email,
        work_hour:values.work_hour,
        city_id:values.city_id,
        image:values.image,
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

export const showHospital = async (id, userToken) => {
  auth_header_files.Authorization = `Bearer ${userToken}`;
  const response = await apiClient.get(`hospital/show/${id}`, {
    headers: auth_header_files,
  });
  if (!response.status) {
    return null;
  }
  return response?.data; 
};

export const updateHospital = async (id, values, userToken) => {
  auth_header_files.Authorization = `Bearer ${userToken}`;
  const response = await apiClient.post(
    `hospital/update/${id}`,
    {
        name:values.name,
        address: values.address,
        telephone: values.telephone,
        description:values.description ,
        email: values.email,
        work_hour:values.work_hour,
        city_id:values.city_id,
        image:values.image,
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

export const deleteHospital = async (id, userToken) => {
  auth_header_files.Authorization = `Bearer ${userToken}`;
  const response = await apiClient.delete(`hospital/delete/${id}`, {
    headers: auth_header_files,

  });
  if (!response.status) {
    return null;
  }
  return response?.data;
};