const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGODB_URI)
  .then((_) =>
    console.log(`Connected to MongoDB at ${mongoose.connection.host}`)
  )
  .catch((err) => console.error("Could not connect to MongoDB: ", err.message));

const personSchema = mongoose.Schema(
  {
    name: {
      type: String,
      minLength: 3,
      required: true,
    },
    number: {
      type: String,
      minLength: 8,
      required: true,
      validate: {
        validator: (s) => /^(\d{2,3}-)?\d+$/.test(s),
        message: (props) => `${props.value} is not a valid phone number!`,
      },
    },
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
