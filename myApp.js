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

/*
//why does this es6 style version of the document.save function not work?
  fuzzyBear.save = (err, data) => {
      console.log("we started the document.save function")
      if (err) {
        return console.error(err)
      } 
      done(null, data)  
    } 
   */ 
 
  fuzzyBear.save(function(err, data) {
    console.log("we started the document.save function")
    if (err) return console.error(err);
    console.log("we got past the error if")
    done(null, data)
  });
};



const createManyPeople = (arrayOfPeople, done) => {
  done(null /*, data*/);
};

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
