import axios from "axios";

const axiosInstance = axios.create({
  // baseURL: "http://127.0.0.1:5001/fir-2c2f1/us-central1/api",
  //Deployed Version of amazon server on render
  baseURL: "https://amazon-api-deploy-aoql.onrender.com",
});

export { axiosInstance };
