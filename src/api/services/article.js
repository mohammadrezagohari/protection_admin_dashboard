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

    const response = await apiClient.get(`/tutorial/article/${id}`, {
        headers: header,
    });
    console.log("status", response);
    if (response.status !== 200) {
        return null;
    }
    return response?.data;
}

export const createArticle = async (values, userToken) => {
    const {data} = await apiClient.post(`article/store`, {
        title: values.title,
        context: JSON.stringify(values.context),
        category_id: values.category_id,
        image: values.image,
    }, {
        headers: {
            "Content-Type": "multipart/form-data", Authorization: `Bearer ${userToken}`,
        },
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
    const response = await apiClient.post(`article/update/${id}`,

        {
            headers: header,
        }, {
            title: values.title, context: JSON.stringify(values.context), category_id: values.category_id,
        });
    if (response.status !== 200) {
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