const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGODB_URI)
  .then((_) =>
    console.log(`Connected to MongoDB at ${mongoose.connection.host}`)
  )
  .catch((err) => console.error("Could not connect to MongoDB: ", err.message));

const personSchema = mongoose.Schema(
  {
    name: String,
    number: String,
  },
  {
    toJSON: {
      transform: (_document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
      },
    },
  }
);

module.exports = mongoose.model("Person", personSchema);
