import { useState } from "react";

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
        {person.name} {person.num}
      </li>
    ))}
  </ul>
);

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", num: "040-1234567", id: 1 },
    { name: "Ada Lovelace", num: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", num: "12-43-234345", id: 3 },
    { name: "Mary Peppendieck", num: "39-23-6423122", id: 4 },
  ]);
  const [newName, setNewName] = useState("");
  const [newNum, setNewNum] = useState("");
  const [filter, setFilter] = useState("");

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
