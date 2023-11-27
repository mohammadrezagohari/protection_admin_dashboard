import apiClient from "../apiClient";

const auth_header = {
  "Content-Type": "application/json",
  Accept: "application/json",
  "Access-Control-Request-Method": "POST",
  "Access-Control-Request-Headers": "Content-Type, Accept",
};

  
  export const getContent = async () => {
    const response = await apiClient.get("/content?count=100", {
      headers: auth_header,
    });
    if (!response.status) {
      return null;
    }
    return response?.data;
  };
  
  export const createContent = async (content,mobile, userToken) => {
    const response = await apiClient.post(
      `content/store`,
      {
        content: content,
        mobile: mobile,
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
  
//   export const showContent = async (id) => {
//     const response = await apiClient.get(`content/show/${id}`, {
//       headers: auth_header,
//     });
//     if (!response.status) {
//       return null;
//     }
//     return response?.data;
//   };
  
  export const updateContent= async (id, values, userToken) => {
    const response = await apiClient.patch(
      `content/update/${id}`,
      {
        content: values?.content,
        mobile: values?.mobile,
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
  
//   export const deleteContent = async (id,userToken) => {
//     auth_header.Authorization = `Bearer ${userToken}`;
//     const response = await apiClient.delete(`content/delete/${id}`, {
//       headers: auth_header,
//     });
//     if (!response.status) {
//       return null;
//     }
//     return response?.data;
//   };
  
  // -------------------------------------------------------------------

  