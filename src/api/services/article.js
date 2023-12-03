import apiClient from "../apiClient";
// import baseUrl from "@/configs/base-url";
// import axios from "axios";

const header = {
    "Content-Type": "application/json", Accept: "application/json",
};

const auth_header_files = {
    "Content-Type": "multipart/form-data", Accept: "application/json",
};


export const getArticle = async (userToken) => {
    let count = 20;
    header.Authorization = `Bearer ${userToken}`;
    const response = await apiClient.get(`/article?count=${count}`, {
        headers: header,
    });
    if (response.status !== 200) {
        return null;
    }
    return response?.data;
}


export const showArticle = async (id, userToken) => {
    auth_header_files.Authorization = `Bearer ${userToken}`;

    const response = await apiClient.get(`/article/show/${id}`, {
        headers: auth_header_files,
    });
    console.log("status", response);
    if (response.status !== 200) {
        return null;
    }
    return response?.data;
}

export const createArticle = async (values, userToken) => {
    auth_header_files.Authorization = `Bearer ${userToken}`;
    const {data} = await apiClient.post(`article/store`, {
        title: values.title,
        context: JSON.stringify(values.context),
        category_id: values.category_id,
        image: values.image,
    },{
        headers: {
            auth_header_files,
        }
    })
        .then((response) => {
            if (response.status !== 200) {
                return null;
            }
            console.log("respppp", response.status);
            return response;
        });
    return data;

};

export const updateArticle = async (id, values, userToken) => {
    auth_header_files.Authorization = `Bearer ${userToken}`;
    const response = await apiClient.post(
      `article/update/${id}`,
      {
        title: values.title,
        context: JSON.stringify(values.context),
        category_id: values.category_id,
        image: values.image,
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


export const deleteArticle = async (id, userToken) => {
    auth_header_files.Authorization = `Bearer ${userToken}`;
    const response = await apiClient.delete(`article/delete/${id}`, {
        headers: header,
    });
    if (response.status !== 200) {
        return null;
    }
    return response?.data;
};