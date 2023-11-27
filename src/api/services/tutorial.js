// import { _apiClient } from "../baseApi";
import apiClient from "../apiClient";
// import baseUrl from "@/configs/base-url";
// import axios from "axios";

const header = {
    "Content-Type": "application/json",
    Accept: "application/json",
};

const auth_header_files = {
    "Content-Type": "multipart/form-data",
    Accept: "application/json",
};

// export const getTutorials = async (page, userToken = null) => {
export const getTutorials = async (count = 10, userToken = null) => {
    header.Authorization = `Bearer ${userToken}`;
    const response = await apiClient.get(`/tutorial?count=${count}`, {
        headers: header,
    });
    if (response.status !== 200) {
        return null;
    }
    return response?.data;
};

export const showTutorials = async (id, userToken) => {
    auth_header_files.Authorization = `Bearer ${userToken}`;

    const response = await apiClient.get(`/tutorial/show/${id}`, {
        headers: header,
    });
    console.log("status", response);
    if (response.status !== 200) {
        return null;
    }
    return response?.data;
};

export const createTutorials = async (values, userToken) => {
    const {data} = await apiClient.post(
        `tutorial/store`,
        {
            main_title: values.main_title,
            first_title: values.first_title,
            first_context: JSON.stringify(values?.first_context),
            second_title: values?.second_title,
            second_context: JSON.stringify(values?.second_context),
            main_image: values.main_image,
            category_id: values.category_id,
        },
        {
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${userToken}`,
            },
        }
    )
        .then((response) => {
            if (response.status !== 200) {
                return null;
            }
            console.log("respppp", response.status);
            return response;
        });
    return data;
    // return data;
    //   console.log("url", `${baseUrl}/api/tutorial/store`);
    //   auth_header_files.Authorization = `Bearer ${userToken}`;
    //   const response = Axios.post(
    //     `${baseUrl}/api/tutorial/store`,
    //     {
    //       main_title: values.main_title,
    //       first_title: values.first_title,
    //       first_context: values.first_context,
    //       second_title: values.second_title,
    //       second_context: values.second_context,
    //       main_image: values.main_image,
    //       category_id: values.category_id,
    //     },
    //     {
    //       headers: auth_header_files,
    //     }
    //   ).then((response) => {
    //     if (response.status !== 200) {
    //       return null;
    //     }
    //     console.log("respppp", response.status);
    //     return response;
    //   });
    //   return response;
};

export const createTutorialsStep01 = (values, userToken) => {
    auth_header_files.Authorization = `Bearer ${userToken}`;
    const response = apiClient
        .post(
            `/tutorial/store_step01`,
            {
                main_title: values.main_title,
                first_title: values.first_title,
                first_context: values.first_context,
                main_image: values.main_image,
                category_id: values.category_id,
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

export const createTutorialsStep02 = (values, userToken) => {
    auth_header_files.Authorization = `Bearer ${userToken}`;
    const response = apiClient
        .post(
            `/tutorial/store_step02`,
            {
                id: values.id,
                second_title: values.second_title,
                second_context: values.second_context,
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

// ----------------------------------------------------------------------------

export const updateTutorials = async (values, id, userToken) => {
    auth_header_files.Authorization = `Bearer ${userToken}`;
    const response = await apiClient.patch(
        `/tutorial/update/${id}`,

        {
            headers: header,
        },
        {
            context: values?.context,
            category_id: values?.category_id,
            main_title: values?.main_title,
            first_title: values?.first_title,
            first_context: JSON.stringify(values?.first_context),
            second_title: values?.second_title,
            second_context: JSON.stringify(values?.second_context),
            image: values?.image,
        }
    );
    if (response.status !== 200) {
        return null;
    }
    return response?.data;
};

export const deleteTutorilas = async (id, userToken) => {
    auth_header_files.Authorization = `Bearer ${userToken}`;
    const response = await apiClient.delete(`/tutorial/delete/${id}`, {
        headers: header,
    });
    if (response.status !== 200) {
        return null;
    }
    return response?.data;
};
