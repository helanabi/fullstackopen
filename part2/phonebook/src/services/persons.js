import axios from "axios";

const baseUrl = "http://localhost:3001/persons";

const getAll = () => axios.get(baseUrl).then(res => res.data);

const create = newPerson =>
  axios.post(baseUrl, newPerson).then(res => res.data);

const personService = { getAll, create };

export default personService;
