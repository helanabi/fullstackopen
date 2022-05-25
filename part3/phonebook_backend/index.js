require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const Person = require("./models/person");
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

app.get("/info", (_req, res, next) =>
  Person.countDocuments({})
    .then((count) =>
      res.send(
        `<p>Phonebook has info for ${count} people</p>` + `<p>${new Date()}`
      )
    )
    .catch((err) => next(err))
);

app.get("/api/persons", (_req, res, next) =>
  Person.find({})
    .then((persons) => res.json(persons))
    .catch((err) => next(err))
);

app.get("/api/persons/:id", (req, res, next) =>
  Person.findById(req.params.id)
    .then((person) => {
      if (person) res.json(person);
      else res.status(404).end();
    })
    .catch((err) => next(err))
);

app.delete("/api/persons/:id", (req, res, next) => {
  Person.findByIdAndRemove(req.params.id)
    .then((_) => res.status(204).end())
    .catch((err) => next(err));
});

app.post("/api/persons", (req, res, next) => {
  const { name, number } = req.body;
  if (!name || !number)
    return res.status(400).json({ error: "content missing" });

  new Person({ name, number })
    .save()
    .then((person) => res.json(person))
    .catch((err) => next(err));
});

app.put("/api/persons/:id", (req, res, next) =>
  Person.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      number: req.body.number,
    },
    { new: true }
  )
    .then((person) => res.json(person))
    .catch((err) => next(err))
);

app.use((err, req, res, next) => {
  console.error(`${err.name}: ${err.message}`);
  if (err.name === "CastError") res.status(400).send({ error: "Malformed id" });
  next(err);
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
