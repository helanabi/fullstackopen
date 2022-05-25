require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const Person = require("./models/person");
const { generateId } = require("./utils");
const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.static("build"));
app.use(express.json());
app.use(
  morgan((tokens, req, res) =>
    [
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      tokens.res(req, res, "content-length"),
      "-",
      tokens["response-time"](req, res),
      "ms",
      req.method === "POST" ? JSON.stringify(req.body) : "",
    ].join(" ")
  )
);

const initialPersons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

app.get("/info", (_req, res) =>
  res.send(
    `<p>Phonebook has info for ${initialPersons.length} people</p>` +
      `<p>${new Date()}`
  )
);

app.get("/api/persons", (_req, res) =>
  Person.find({}).then((persons) => res.json(persons))
);

app.get("/api/persons/:id", (req, res) => {
  const person = initialPersons.find((p) => p.id === Number(req.params.id));
  if (person) res.json(person);
  else res.status(404).end();
});

app.delete("/api/persons/:id", (req, res) => {
  Person.findByIdAndRemove(req.params.id).then((_) => res.status(204).end());
});

app.post("/api/persons", (req, res) => {
  const { name, number } = req.body;
  if (!name || !number)
    return res.status(400).json({ error: "content missing" });

  new Person({ name, number }).save().then((person) => res.json(person));
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
