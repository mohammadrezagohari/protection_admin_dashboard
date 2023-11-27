import baseUrl from "@/configs/base-url";
import React from "react";

export async function _apiClient(
  endpoint,
  method = "POST",
  token = null,
  data = null
) {
  try {
    const url = `${baseUrl}/api/${endpoint}`;
    let headers = token
      ? {
          "Content-Type": "multipart/form-data",
          Accept: "application/json",
          "Access-Control-Request-Method": method,
          "Access-Control-Request-Headers": "Content-Type, Accept",
        }
      : {
          "Content-Type": "multipart/form-data",
          Accept: "application/json",
          "Access-Control-Request-Method": method,
          "Access-Control-Request-Headers": "Content-Type, Accept",
          Authorization: `Bearer ${token}`,
        };

    const options = {
      method: method,
      mode: "cors", // no-cors, *cors, same-origin
      headers: headers,
      redirect: "follow", // manual, *follow, error
    };


    // const options = {
    //     method: "POST", // *GET, POST, PUT, DELETE, etc.
    //     mode: "cors", // no-cors, *cors, same-origin
    //     cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    //     credentials: "same-origin", // include, *same-origin, omit
    //     headers: {
    //       "Content-Type": "application/json",
    //       // 'Content-Type': 'application/x-www-form-urlencoded',
    //     },
    //     redirect: "follow", // manual, *follow, error
    //     referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    //     body: JSON.stringify(data), // body
    // }

    if (data) {
      if (method.toLowerCase() == "get") {
        const query = Object.keys(data)
          .map((key) => `${key}=${encodeURIComponent(data[key])}`)
          .join("&");
        // url = `${url}?${query}`;
        console.log("uuu", `${url}?${query}`);
      } else {
        options.body = data;//JSON.stringify(data);
      }
    }
    const resData=null;
    console.log("url", url);
    console.log("options", options);
    
    const result = fetch(url, options).then((response) => {
        console.log('reeeees',response.body);
      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }
      resData=response;
      console.log(response);
      return response.json();
    });
    console.log('resData',resData)
    return resData; 
  } catch (error) {
    console.error("Error:", error);
  }
}
