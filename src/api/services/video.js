import { useQuery } from "react-query";
import apiClient from "../apiClient";

const auth_header_files = {
  "Content-Type": "multipart/form-data",
  Accept: "application/json",
};

export const getVideo = async () => {
  const response = await apiClient.get("/video?count=100", {
    headers: auth_header_files,
  });
  if (!response.status) {
    return null;
  }
  return response?.data;
};

export const createVideo = async (values, userToken) => {
  auth_header_files.Authorization = `Bearer ${userToken}`;
  //   const { data, error, isLoading } = useData("video/store");
  const response = await apiClient.post(
    `video/store`,
    {
      file_name: values.file_name,
      title: values.title,
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

export const showVideo = async (id, userToken) => {
  auth_header_files.Authorization = `Bearer ${userToken}`;
  const response = await apiClient.get(`video/show/${id}`, {
    headers: auth_header_files,
  });
  if (!response.status) {
    return null;
  }
  return response?.data;
};

export const updateVideo = async (id, values, userToken) => {
  auth_header_files.Authorization = `Bearer ${userToken}`;
  const response = await apiClient.patch(
    `video/update/${id}`,
    {
      file_name: values.file_name,
      title: values.title,
      description: values.description,
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

export const deleteVideo = async (id, userToken) => {
  auth_header_files.Authorization = `Bearer ${userToken}`;
  const response = await apiClient.delete(`video/delete/${id}`, {
    headers: auth_header_files,
  });
  if (!response.status) {
    return null;
  }
  return response?.data;
};

// import baseUrl from "@/configs/base-url";
// import apiClient from "../apiClient";

// const auth_header0 = {
//   "Content-Type": "multipart/form-data",
//   "Accept": "application/json",
//   // "Access-Control-Allow-Origin": "*",
//   // "Access-Control-Allow-Credentials":"true",
//   "Access-Control-Request-Method": "POST",
//   "Access-Control-Request-Headers": "Content-Type, Accept,Authorization,API-key",
// };

// const auth_header = {
//   "Content-Type": "multipart/form-data",
//   "Accept": "application/json",
//   "Access-Control-Request-Method": "POST",
//   "Access-Control-Request-Headers": "Content-Type, Accept",
// };

//   export const getGoal = async () => {
//     const response = await apiClient.get("/goal?count=100", {
//       headers: auth_header,
//     });
//     if (!response.status) {
//       return null;
//     }
//     return response?.data;
//   };

//   export const createGoal = async (values, userToken) => {
//     auth_header.Authorization = `Bearer ${userToken}`;
//     const response = await apiClient.post(
//       `goal/store`,
//       {
//         title: values?.title,
//         description: values?.description,
//       },
//       {
//         headers: auth_header,
//       }
//     )
//     .then((response) => {
//       if (response.status !== 200) {
//         return null;
//       }
//       return response;
//     });
//   return response;
// };

//   export const showGoal = async (id,userToken) => {
//     auth_header.Authorization = `Bearer ${userToken}`;
//     const response = await apiClient.get(`goal/show/${id}`, {
//       headers: auth_header,
//     });
//     if (!response.status) {
//       return null;
//     }
//     return response?.data;
//   };

//   export const updateGoal= async (id, values, userToken) => {
//     auth_header.Authorization = `Bearer ${userToken}`;
//     const response = await apiClient.patch(
//       `goal/update/${id}`,
//       {
//         title: values?.title,
//         description: values?.description,
//       },
//       {
//         headers: auth_header,
//       }
//     );
//     if (!response.status) {
//       return null;
//     }
//     return response?.data;
//   };

//   export const deleteGoal = async (id,userToken) => {
//     auth_header.Authorization = `Bearer ${userToken}`;
//     const response = await apiClient.delete(`goal/delete/${id}`, {
//       headers: auth_header,
//     });
//     if (!response.status) {
//       return null;
//     }
//     return response?.data;
//   };

// -------------------------------------------------------------------
//   import { useQuery } from "react-query";
//   import apiClient from "../apiClient";
//   import baseUrl from "@/configs/base-url";

// var myHeaders = new Headers();
// myHeaders.append("Content-Type", "application/json");
// myHeaders.append("Accept", "application/json");

// export const getVideo = async (userToken)=>{
//   myHeaders.append("Authorization", `Bearer ${userToken}`);

//   const requestOptions = {
//     method: 'GET',
//     headers: myHeaders,
//     redirect: 'follow'
//   };
//   let mainResult = null;
//   await fetch(`${baseUrl}/api/video`, requestOptions)
//   .then(response => response.text())
//   .then(result => {
//     mainResult = result;
//     console.log("goal", result);
//   })
//   .catch((error) => console.log("error", error));
//   return JSON.parse(mainResult);

// }

// export const showVideo = async (id,userToken)=>{
//   myHeaders.append("Authorization", `Bearer ${userToken}`);

//   const requestOptions = {
//     method: 'GET',
//     headers: myHeaders,
//     redirect: 'follow'
//   };
//   let mainResult = null;
//   await fetch(`${baseUrl}/api/video/show/${id}`, requestOptions)
//   .then(response => response.text())
//   .then(result => {
//     mainResult = result;
//     console.log("video", result);
//   })
//   .catch((error) => console.log("error", error));
//   return JSON.parse(mainResult);

// }

// export const createVideo = async (values,userToken) => {
//   myHeaders.append("Authorization", `Bearer ${userToken}`);
//     var raw ={
//       title: values.title,
//       file_name: values.file_name,
//     }
//     const requestOptions = {
//       method: 'POST',
//       headers: myHeaders,
//       body: raw,
//       redirect: 'follow'
//     };
//     let mainResult = null;
//     await fetch(`${baseUrl}/api/video/store`, requestOptions)
//       .then((response) => response.text())
//       .then((result) => {
//         mainResult = result;
//         console.log("create video", result);
//       })
//       .catch((error) => console.log("error", error));
//     return JSON.parse(mainResult);
//   };

//   export const updateVideo = async (id,values,userToken) => {
//     myHeaders.append("Authorization", `Bearer ${userToken}`);
//       var raw = JSON.stringify({
//         title: values.title,
//         file_name: values.file_name,
//       })
//       const requestOptions = {
//         method: 'PATCH',
//         headers: myHeaders,
//         body: raw,
//         redirect: 'follow'
//       };
//       let mainResult = null;
//       await fetch(`${baseUrl}/api/video/update/${id}`, requestOptions)
//         .then((response) => response.text())
//         .then((result) => {
//           mainResult = result;
//           console.log("update video", result);
//         })
//         .catch((error) => console.log("error", error));
//       return JSON.parse(mainResult);
//     };

//     export const deleteVideo = async (id,userToken) => {
//       myHeaders.append("Authorization", `Bearer ${userToken}`);
//         const requestOptions = {
//           method: 'DELETE',
//           headers: myHeaders,
//           redirect: 'follow'
//         };
//         let mainResult = null;
//         await fetch(`${baseUrl}/api/video/delete/${id}`, requestOptions)
//           .then((response) => response.text())
//           .then((result) => {
//             mainResult = result;
//             console.log("delete video", result);
//           })
//           .catch((error) => console.log("error", error));
//         return JSON.parse(mainResult);
//       };
