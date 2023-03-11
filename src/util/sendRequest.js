import axios from "axios";

const postReq = async (endpoint, request) => {
    const response = await axios.post(process.env.REACT_APP_SERVER_ADDRESS+endpoint, request, {withCredentials: true});
    console.log("Post Response: ",response.data);
    return response.data;
}

const getReq = async (endpoint, request) => {
    const response = axios.get(process.env.REACT_APP_SERVER_ADDRESS+endpoint, request, {withCredentials: true});
    console.log("Get Response",response.data);
    return (await response).data;
}

export default {
    postReq,
    getReq
};