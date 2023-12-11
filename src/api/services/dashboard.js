import { useQuery } from "react-query";
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

export const getArticleCount = async (userToken) => {
    auth_header.Authorization = `Bearer ${userToken}`;
    const response = await apiClient.get(`/article/quantity`, {
        headers: auth_header,
    });
    if (response.status !== 200) {
        return null;
    }
    return response?.data;
};
export const getUserCount = async (userToken) => {
    auth_header.Authorization = `Bearer ${userToken}`;
    const response = await apiClient.get(`/user/quantity`, {
        headers: auth_header,
    });
    if (response.status !== 200) {
        return null;
    }
    return response?.data;
};
export const getTutorialCount = async (userToken) => {
    auth_header.Authorization = `Bearer ${userToken}`;
    const response = await apiClient.get(`/tutorial/quantity`, {
        headers: auth_header,
    });
    if (response.status !== 200) {
        return null;
    }
    return response?.data;
};

export const getCategoryCount = async (userToken) => {
    auth_header.Authorization = `Bearer ${userToken}`;
    const response = await apiClient.get(`/category/quantity`, {
        headers: auth_header,
    });
    if (response.status !== 200) {
        return null;
    }
    return response?.data;
};
