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
    .then(() => res.status(204).end())
    .catch((err) => next(err));
});

app.post("/api/persons", async (req, res, next) => {
  const { name, number } = req.body;
  try {
    if (await Person.exists({ name }))
      res.status(400).send({ error: "Name exists in phonbook" });
    else res.json(await new Person({ name, number }).save());
  } catch (err) {
    next(err);
  }
});

app.put("/api/persons/:id", (req, res, next) =>
  Person.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      number: req.body.number,
    },
    { new: true, runValidators: true }
  )
    .then((person) => res.json(person))
    .catch((err) => next(err))
);

app.use((err, req, res, next) => {
  console.error(`${err.name}: ${err.message}`);
  if (err.name === "CastError")
    return res.status(400).send({ err: "Malformed id" });
  else if (err.name === "ValidationError")
    return res.status(400).send({ error: err.message });

  next(err);
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
