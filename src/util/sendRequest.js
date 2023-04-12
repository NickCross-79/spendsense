import axios from "axios";

const server = process.env.REACT_APP_SERVER_ADDRESS;
const port = process.env.REACT_APP_BACKEND_PORT_NUMBER;

const postReq = async (endpoint, request) => {
    const response = await axios.post(`${server}:${port}`+endpoint, request, {withCredentials: true});
    console.log("Post Response: ",response.data);
    return response.data;
}

const getReq = async (endpoint, request) => {
    const response = await axios.get(`${server}:${port}`+endpoint, request, {withCredentials: true});
    console.log("Get Response: ",response.data);
    return response.data;
}

const delReq = async (endpoint, request) => {
    const response = await axios.delete(`${server}:${port}`+endpoint, request, {withCredentials: true});
    return response.data;
}

export default {
    postReq,
    getReq,
    delReq
};