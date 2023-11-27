import { useQuery } from "react-query";
import apiClient from "../apiClient";

const auth_header = {
  "Content-Type": "application/json",
  Accept: "application/json",
  "Access-Control-Request-Method": "POST",
  "Access-Control-Request-Headers": "Content-Type, Accept",
};
const auth_header_files = {
  Accept: "application/json",
  "Content-Type": "multipart/form-data",
  Authorization: `Bearer ${localStorage.getItem("_token_testato")}`,
};
export const getMenu = async () => {
  const response = await apiClient.get("/menu?count=1000", {
    headers: auth_header,
  });
  console.log("status", response);
  if (response.status !== 200) {
    return null;
  }
  return response?.data;
};

export const createMenu = async (title, background, color, icon) => {
  const response = await apiClient.post(
    `/menu/store`,
    {
      title: title,
      background: background,
      color: color,
      icon: icon,
    },
    {
      headers: auth_header_files,
    }
  );
  console.log("status", response);
  if (response.status !== 200) {
    return null;
  }
  return response?.data;
};

export const showMenus = async (id) => {
  const response = await apiClient.get(`/menu/show/${id}`, {
    headers: auth_header,
  });
  console.log("status", response);
  if (response.status !== 200) {
    return null;
  }
  return response?.data;
};

export const updateMenu = async (id, values) => {
  const response = await apiClient.patch(
    `/menu/update/${id}`,
    {
      title: values.title,
      icon: values.icon,
      color: values.color,
      background: values.background,
    },
    {
      headers: auth_header_files,
    }
  );
  console.log("status", response);
  if (response.status !== 200) {
    return null;
  }
  return response?.data;
};

export const deleteMenu = async (id) => {
  const response = await apiClient.delete(`/menu/delete/${id}`, {
    headers: auth_header,
  });
  console.log("status", response);
  if (response.status !== 200) {
    return null;
  }
  return response?.data;
};

//----------------------------------------------------

export const getMenuList = async () => {
  const response = await apiClient.get("/menu/list", {
    headers: auth_header,
  });
  console.log("status", response);
  if (response.status !== 200) {
    return null;
  }
  return response?.data;
};
