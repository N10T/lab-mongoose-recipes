const mongoose = require("mongoose");
const Recipe = require("./models/Recipe.model"); // Import of the model Recipe from './models/Recipe.model.js'
const data = require("./data.js"); // Import of the data from './data.js'
const cocoPunch = {
  title: "Coco punch",
  level: "Easy Peasy",
  ingredients: [
    "400 ml coconut milk",
    "150g concentred milk",
    "166g liquid sugar",
    "160ml rum",
    "vanilla",
    "a bit of cinnamon",
    "a bit of nutmeg"
  ],
  cuisine: "caribbean",
  dishType: "Drink",
  image:
    "https://www.laboutiquecreole.com/109-large_default/punch-coco-dormoy.jpg",
  duration: 10,
  creator: "Bibi"
};
// Connection to the database "recipeApp"
mongoose
  .connect("mongodb://localhost/recipe-app-dev", {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(x => {
    console.log(`1`);
    Recipe.create(cocoPunch)
      .then(recipe => {
        console.log("2");
        Recipe.insertMany(data)
          .then(recipe => {
            console.log("3");
            Recipe.updateOne(
              { title: "Rigatoni alla Genovese" },
              { duration: 100 },
              { new: true }
            )
              .then(recipe => {
                console.log("4");
                Recipe.findOneAndDelete({ title: "Carrot Cake" })
                  .then(response => {
                    console.log("5");
                    mongoose.connection
                      .close()
                      .then(() => console.log("Disconnected"))
                      .catch(err => console.log(err));
                  })
                  .catch(error =>
                    console.log("The recipe haven't been deleted: ", error)
                  );
              })
              .catch(error =>
                console.log("The recipe haven't been updated: ", error)
              );
          })
          .catch(error =>
            console.log("An error happened while saving a new recipe:\n", error)
          );
      })
      .catch(error =>
        console.log("An error happened while saving a new recipe:", error)
      );
  })
  .catch(err => console.error("Error connecting to mongo", err));
