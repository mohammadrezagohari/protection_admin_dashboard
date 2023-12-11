import {useQuery} from "react-query";
import apiClient from "../apiClient";

const header = {
    "Content-Type": "application/json", Accept: "application/json",
};

const auth_header_files = {
    "Content-Type": "multipart/form-data", Accept: "application/json",
};

export const getAbout = async (userToken) => {

    let count = 20;
    header.Authorization = `Bearer ${userToken}`;
    const response = await apiClient.get(`/about`, {
        headers: header,
    });
    if (response.status !== 200) {
        return null;
    }
    return response?.data;
}

export const createAbout = async (values, userToken) => {

    auth_header_files.Authorization = `Bearer ${userToken}`;
    const {data} = await apiClient.post(`about/store`, {
        title: values.title,
        content: JSON.stringify(values.content),
    }, {
        headers: {
            auth_header_files,
        }
    }).then((response) => {
        if (response.status !== 200) {
            return null;
        }
        console.log("respppp", response.status);
        return response;
    });
    return data;
};


export const updateAbout = async (id, values) => {
    myHeaders.append("Authorization", `Bearer ${userToken}`);
    var raw = JSON.stringify({
        content: values.content,
        title: values.title,
    })
    const requestOptions = {
        method: 'PATCH',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };
    let mainResult = null;
    await fetch(`${baseUrl}/api/about/update/${id}`, requestOptions)
        .then((response) => response.text())
        .then((result) => {
            mainResult = result;
            console.log("update about", result);
        })
        .catch((error) => console.log("error", error));
    return JSON.parse(mainResult);
};


export const deleteAbout = async (id) => {
    myHeaders.append("Authorization", `Bearer ${userToken}`);
    const requestOptions = {
        method: 'DELETE',
        headers: myHeaders,
        redirect: 'follow'
    };
    let mainResult = null;
    await fetch(`${baseUrl}/api/about/delete/${id}`, requestOptions)
        .then((response) => response.text())
        .then((result) => {
            mainResult = result;
            console.log("delete about", result);
        })
        .catch((error) => console.log("error", error));
    return JSON.parse(mainResult);
};
