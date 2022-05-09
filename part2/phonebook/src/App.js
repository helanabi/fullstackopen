import axios from "axios";
import { useEffect, useState } from "react";

const Filter = ({ onChange }) => (
  <div>
    <label>
      Filter shown with &nbsp;
      <input onChange={onChange} />
    </label>
  </div>
);

const PersonForm = ({
  onSubmit,
  newName,
  onNameChange,
  newNum,
  onNumChange,
}) => (
  <form onSubmit={onSubmit}>
    <div>
      <label>
        name: &nbsp;
        <input value={newName} onChange={onNameChange} />
      </label>
    </div>
    <div>
      <label>
        number: &nbsp;
        <input value={newNum} onChange={onNumChange} />
      </label>
    </div>
    <div>
      <button>Add</button>
    </div>
  </form>
);

const Persons = ({ persons }) => (
  <ul>
    {persons.map(person => (
      <li key={person.name}>
        {person.name} {person.number}
      </li>
    ))}
  </ul>
);

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNum, setNewNum] = useState("");
  const [filter, setFilter] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:3001/persons")
      .then(resp => setPersons(resp.data));
  }, []);

  const setValue = setter => event => setter(event.target.value);

  const submitHandler = event => {
    event.preventDefault();
    if (persons.find(person => person.name === newName)) {
      alert(`${newName} is already added to phonebook`);
      return;
    }
    setPersons(persons.concat({ name: newName, number: newNum }));
    setNewName("");
    setNewNum("");
  };

  const shownPersons = persons.filter(person =>
    person.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter onChange={setValue(setFilter)} />

      <h3>Add a new</h3>
      <PersonForm
        onSubmit={submitHandler}
        newName={newName}
        onNameChange={setValue(setNewName)}
        newNum={newNum}
        onNumChange={setValue(setNewNum)}
      />

      <h2>Numbers</h2>
      <Persons persons={shownPersons} />
    </div>
  );
};

export default App;
