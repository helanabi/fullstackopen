import axios from "axios";
const baseUrl = "/api/blogs";

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const create = async (blog, token) => {
  const res = await axios.post(baseUrl, blog, {
    headers: {
      Authorization: `bearer ${token}`,
    },
  });

  return res.data;
};

const update = async (id, newBlog) => {
  const res = await axios.put(`${baseUrl}/${id}`, newBlog);
  return res.data;
};

const remove = async (id, token) => {
  await axios.delete(`${baseUrl}/${id}`, {
    headers: {
      Authorization: `bearer ${token}`,
    },
  });
};

const blogService = { getAll, create, update, remove };
export default blogService;
