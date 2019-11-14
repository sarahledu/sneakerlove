const mongoose = require("mongoose");
const Sneaker = require("../models/Sneaker");

const sneakers = [
  {
    name: "Jordan",
    ref: "2454",
    price: 100,
    category: "men"
  }
];

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
  })
  .then(x => {
    console.log(
      `Connected to Mongo! Database name: "${x.connections[0].name}"`
    );
    // Sneaker.insertMany(sneakers)
    //   .then(dbresult => {
    //     console.log("Sneaker inserted to Mongo ");
    //   })
    //   .catch(err => {
    //     console.error(err);
    //   });
  })
  .catch(err => {
    console.error("Error connecting to mongo", err);
  });

// mongoose.connection.on("connected", () =>
//   console.log("yay mongodb connected :)")
// );

// mongoose.connection.on("error", () => console.log("nay db error sorry :("));
