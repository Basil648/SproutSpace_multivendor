import axios from "axios";

const api = axios.create({
baseURL: "https://sproutspace.onrender.com/api"
});

export default api;
