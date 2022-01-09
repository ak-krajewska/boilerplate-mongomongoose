require('dotenv').config();
//Mongoose configuration
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URI);

//Create a Model
const Schema = mongoose.Schema;

const personSchema = new Schema({
    name:  {
      type: String,
      required: true}, 
    age: Number,
    favoriteFoods: [String],
  });

const Person = mongoose.model('Person', personSchema);

//Create and Save a Record of a Model

let createAndSavePerson = (done) => {
  let fuzzyBear = new Person({
    name: "Fuzzy the Bear", 
    age: 7, 
    favoriteFoods: ["tea", "honey", "marmalade"]
      });

  //console.log("Test if I created fuzzyBear. His name is: " + fuzzyBear.name)


//Fixed error. document.save() needed anonymous function as a callback
  fuzzyBear.save((err, data) => {
      if (err) {
        return console.error(err)
      } 
      done(null, data)  
    }) 
};


//Create Many Records with model.create()

//Create an array of people-actually pets
let arrayOfPeople = [
  {name: "Flufykins", age: 3, favoriteFoods: ["carrots", "angelwort"]},
  {name: "Murderbot", age: 19, favoriteFoods: ["chicken liver", "spiders", "fancy feast"]},
  {name: "Rex", age: 5, favoriteFoods: ["cheese", "whatever you are eating"]}
]

console.log("My dog " + arrayOfPeople[2].name + " is " + arrayOfPeople[2].age   + " years old and would like to eat " + arrayOfPeople[2].favoriteFoods[0] + " and " +  arrayOfPeople[2].favoriteFoods[1] + ".")


const createManyPeople = (arrayOfPeople, done) => {
  //model.create([array], [options], callback)
  console.log("we started definiting createManyPeople")
  Person.create(arrayOfPeople, (err, people) => {
    console.log("we started the model.create function")
  if (err) {
    return console.error(err)
  }   
  done(null , people);
  })
}

const findPeopleByName = (personName, done) => {
  done(null /*, data*/);
};

const findOneByFood = (food, done) => {
  done(null /*, data*/);
};

const findPersonById = (personId, done) => {
  done(null /*, data*/);
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";

  done(null /*, data*/);
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;

  done(null /*, data*/);
};

const removeById = (personId, done) => {
  done(null /*, data*/);
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";

  done(null /*, data*/);
};

const queryChain = (done) => {
  const foodToSearch = "burrito";

  done(null /*, data*/);
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
