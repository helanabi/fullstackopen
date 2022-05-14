import { useEffect, useState } from "react";
import personService from "./services/persons";

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

const Persons = ({ persons, removePerson }) => (
  <ul>
    {persons.map(person => (
      <li key={person.name}>
        {person.name} {person.number}{" "}
        <button onClick={() => removePerson(person.id)}>remove</button>
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
    personService.getAll().then(initialPersons => setPersons(initialPersons));
  }, []);

  const setValue = setter => event => setter(event.target.value);

  const submitHandler = event => {
    event.preventDefault();
    let existingPerson = persons.find(p => p.name === newName);
    if (existingPerson) {
      if (
        window.confirm(
          `${newName} is already added to phonebook,` +
            " replace the old number with a new one?"
        )
      ) {
        personService
          .replace(existingPerson.id, { ...existingPerson, number: newNum })
          .then(updatedPerson =>
            setPersons(
              persons.map(p => (p.id === existingPerson.id ? updatedPerson : p))
            )
          );
      } else return;
    } else {
      personService
        .create({ name: newName, number: newNum })
        .then(createdPerson => setPersons(persons.concat(createdPerson)));
    }
    setNewName("");
    setNewNum("");
  };

  const shownPersons = persons.filter(person =>
    person.name.toLowerCase().includes(filter.toLowerCase())
  );

  const removePerson = id => {
    const person = persons.find(p => p.id === id);

    if (window.confirm(`Delete ${person.name}?`)) {
      personService
        .remove(id)
        .then(() => setPersons(persons.filter(p => p.id !== id)));
    }
  };

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
      <Persons persons={shownPersons} removePerson={removePerson} />
    </div>
  );
};

export default App;
