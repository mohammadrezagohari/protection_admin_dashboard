import { useQuery } from "react-query";
import apiClient from "../apiClient"; 


const auth_header = {
  "Content-Type": "multipart/form-data",
  Accept: "application/json",
};

export const getPatient = async () => {
  const response = await apiClient.get("/patient?count=100", {
    headers: auth_header,
  });
  if (!response.status) {
    return null;
  }
  return response?.data;
};


export const createPatient = (values, userToken) => {
  auth_header.Authorization = `Bearer ${userToken}`;

  const response = apiClient
    .post(
      `/patient/store`,
      {
        first_name: values.first_name,
        last_name: values.last_name,
        national_code: values.national_code,
        phone: values.phone,
        section_title: values.section_title,
        recep_date: values.recep_date,
        diagnose:values.diagnose,
        hospital_title:values.hospital_title, 
        patient_code:values.patient_code, 
       },
     
      {
        headers: auth_header,
      }
    )
    .then((response) => {
      if (response.status !== 200) {
        return null;
      }
      return response;
    });
  return response;
};
    

export const showPatient = async (id,userToken) => {
  auth_header.Authorization = `Bearer ${userToken}`;
  const response = await apiClient.get(`patient/show/${id}`, {
    headers: auth_header,
  });
  if (!response.status) { 
    return null;
  }
  return response?.data;
};

export const updatePatient = async (id, values, userToken) => {
  auth_header.Authorization = `Bearer ${userToken}`;
  const response = await apiClient.patch(
    `patient/update/${id}`,
    {
      first_name: values.first_name,
      last_name: values.last_name,
      national_code: values.national_code,
      phone: values.phone,
      section_title: values.section_title,
      recep_date: values.recep_date,
      diagnose:values.diagnose,
      hospital_title:values.hospital_title, 
      patient_code:values.patient_code, 
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

export const deletePatient = async (id, userToken) => {
  auth_header.Authorization = `Bearer ${userToken}`;
  const response = await apiClient.delete(`patient/delete/${id}`, {
    headers: auth_header,
  });
  if (!response.status) {
    return null;
  }
  return response?.data;
};