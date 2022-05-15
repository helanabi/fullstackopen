const generateId = persons => {
  let id = null;
  while (!id || persons.find(p => p.id === id))
    id = Math.floor(Math.random() * 1000);
  return id;
};

module.exports = { generateId };
