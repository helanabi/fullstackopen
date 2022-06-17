import axios from "axios";
const baseUrl = "/api/blogs";

let token = null;

const setToken = (newToken) => {
  void token;
  token = `bearer ${newToken}`;
};

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const create = async (blog) => {
  void token;
  const res = await axios.post(baseUrl, blog, {
    headers: {
      Authorization: token,
    },
  });

  return res.data;
};

const blogService = { setToken, getAll, create };
export default blogService;
