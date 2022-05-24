const mongoose = require("mongoose");

async function main(args) {
  if (args.length && args.length !== 2) {
    console.error("Usage: node mongo.js [<name> <number>]");
    process.exit(1);
  }

  await mongoose.connect("mongodb://localhost:27017/phonebook");
  const Person = makePerson();

  if (!args.length) await listAll(Person);
  else await addEntry(Person, ...args);

  await mongoose.connection.close();
}

function makePerson() {
  return mongoose.model(
    "Person",
    mongoose.Schema({
      name: String,
      number: String,
    })
  );
}

async function listAll(Person) {
  console.log("Phonebook:");
  (await Person.find({})).forEach((entry) => {
    console.log(`${entry.name} ${entry.number}`);
  });
}

async function addEntry(Person, name, number) {
  const res = await new Person({ name, number }).save();
  console.log(`added ${res.name} number ${res.number} to phonebook`);
}

main(process.argv.slice(2));
