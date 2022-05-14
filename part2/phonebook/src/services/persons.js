import axios from "axios";

const baseUrl = "http://localhost:3001/persons";

const getAll = () => axios.get(baseUrl).then(res => res.data);

const create = newPerson =>
  axios.post(baseUrl, newPerson).then(res => res.data);

const remove = id => axios.delete(`${baseUrl}/${id}`).then(res => res.data);

const replace = (id, newObj) =>
  axios.put(`${baseUrl}/${id}`, newObj).then(res => res.data);

const personService = { getAll, create, remove, replace };

export default personService;
