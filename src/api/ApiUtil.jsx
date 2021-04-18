import axios from "axios";

const { 
  REACT_APP_API_URL
} = process.env;

const ApiUtil = {
  call: async (api, data, type="get") => {
    let errorMessage = "";
    let status = 200;

    const URL = REACT_APP_API_URL + api;

    let token = window.localStorage.getItem("access_token");
    let getResult = null;

    if (type === "get") {
      getResult = await axios.get(URL, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": (token === "" || token === undefined) ? "" : "Bearer " + token
        }
      })
      .catch( error => {
        try {
          status = error.response.status;

          if (error.response) {
            errorMessage = error.response.data;
          } else if (error.request) {
            errorMessage = error.request;
          } else {
            errorMessage = "Something went wrong.";
          }
        } catch(err) {
          errorMessage = "Service Unavailable!"
        }
      });
    } else {
      getResult = await axios[type.toLowerCase()](URL, data, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": (token === "" || token === undefined) ? "" : "Bearer " + token
        }
      })
      .catch( error => {
        try {
          status = error.response.status;

          if (error.response) {
            errorMessage = error.response.data;
          } else if (error.request) {
            errorMessage = error.request;
          } else {
            errorMessage = "Something went wrong.";
          }
        } catch(err) {
          errorMessage = "Service Unavailable!"
        }
      });
    }

    return { data: getResult, errorMessage: errorMessage, status: status};
  },

  callFormData: async (api, data, type="get") => {
    let errorMessage = "";
    let status = 200;

    const URL = REACT_APP_API_URL + api;

    let token = window.localStorage.getItem("access_token");

    const getResult = await axios[type.toLowerCase()](URL, data, {
      headers: {
        "Content-Type": "multipart/form-data",
        "Authorization": (token === "" || token === undefined) ? "" : "Bearer " + token
      }
    })
    .catch( error => {
      try {
        status = error.response.status;

        if (error.response) {
          errorMessage = error.response.data;
        } else if (error.request) {
          errorMessage = error.request;
        } else {
          errorMessage = "Something went wrong.";
        }
      } catch(err) {
        errorMessage = "Service Unavailable!"
      }
    });

    return { data: getResult, errorMessage: errorMessage, status: status};
  },
}

export default ApiUtil;