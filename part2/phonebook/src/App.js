import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", num: "040-1234567" },
  ]);
  const [newName, setNewName] = useState("");
  const [newNum, setNewNum] = useState("");

  const setValue = setter => event => setter(event.target.value);

  const submitHandler = event => {
    event.preventDefault();
    if (persons.find(person => person.name === newName)) {
      alert(`${newName} is already added to phonebook`);
      return;
    }
    setPersons(persons.concat({ name: newName, num: newNum }));
    setNewName("");
    setNewNum("");
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={submitHandler}>
        <div>
          <label>
            name:
            <input value={newName} onChange={setValue(setNewName)} />
          </label>
        </div>
        <div>
          <label>
            number:
            <input value={newNum} onChange={setValue(setNewNum)} />
          </label>
        </div>
        <div>
          <button>Add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map(person => (
          <li key={person.name}>
            {person.name} {person.num}
          </li>
        ))}
      </ul>
      <div>Debug: {newName}</div>
    </div>
  );
};

export default App;
