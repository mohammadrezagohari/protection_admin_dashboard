import {useQuery} from "react-query";
import apiClient from "../apiClient";
import baseUrl from "@/configs/base-url";

const auth_header = {
    "Content-Type": "application/json",
    Accept: "application/json",
};

const auth_header_files = {
    "Content-Type": "multipart/form-data",
    Accept: "application/json",
};


export const getCategorysList = async (count = 10) => {
    const response = await apiClient.get(`/category?count=${count}`, {
        headers: auth_header,
    });
    if (!response.status) {
        return null;
    }
    return response?.data;
};


var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");
myHeaders.append("Accept", "application/json");

export const getCategory = async (count = 10, userToken = null) => {
    auth_header.Authorization = `Bearer ${userToken}`;
    const response = await apiClient.get(`/category?count=${count}`, {
        headers: auth_header,
    });
    console.log('resp', response)
    if (response.status !== 200) {
        return null;
    }
    return response?.data;
};

export const showCategory = async (id, userToken) => {
    auth_header.Authorization = `Bearer ${userToken}`;

    const response = await apiClient.get(`/category/show/${id}`, {
        headers: auth_header,
    });
    console.log("status", response);
    if (response.status !== 200) {
        return null;
    }
    return response?.data;
};

export const createCategory = async (name, icon, userToken) => {
    auth_header_files.Authorization = `Bearer ${userToken}`;
    const response = apiClient
        .post(
            `/category/store`,
            {
                name: name,
                icon: icon,
            },
            {
                headers: auth_header_files,
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

export const updateCategory = async (id, values, userToken) => {
    auth_header_files.Authorization = `Bearer ${userToken}`;
    const response = await apiClient.post(
        `/category/update/${id}`,
        {
            name: values.name,
            icon: values.icon,
        }, {
            headers: auth_header_files,
        },
    );
    if (response.status !== 200) {
        return null;
    }
    return response?.data;
};

export const deleteCategory = async (id, userToken) => {
    auth_header.Authorization = `Bearer ${userToken}`;
    const response = await apiClient.delete(`/category/delete/${id}`, {
        headers: auth_header,
    });
    if (response.status !== 200) {
        return null;
    }
    return response?.data;
};
