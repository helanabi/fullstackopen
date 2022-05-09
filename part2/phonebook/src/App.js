import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas" }]);
  const [newName, setNewName] = useState("");

  const changeHanlder = event => setNewName(event.target.value);

  const submitHandler = event => {
    event.preventDefault();
    if (persons.find(person => person.name === newName)) {
      alert(`${newName} is already added to phonebook`);
      return;
    }
    setPersons(persons.concat({ name: newName }));
    setNewName("");
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={submitHandler}>
        <div>
          <label>
            name:
            <input value={newName} onChange={changeHanlder} />
          </label>
        </div>
        <div>
          <button>Add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map(person => (
          <li key={person.name}>{person.name}</li>
        ))}
      </ul>
      <div>Debug: {newName}</div>
    </div>
  );
};

export default App;
