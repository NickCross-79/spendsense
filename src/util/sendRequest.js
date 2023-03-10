import axios from "axios";

const postReq = async (endpoint, request) => {
    const response = await axios.post("http://localhost:3001"+endpoint, request, {withCredentials: true});
    console.log(response.data);
    return response.data;
}

export default {postReq};