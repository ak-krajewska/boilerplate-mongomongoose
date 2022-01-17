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

//Use model.find() to Search Your Database
/*
Modify the findPeopleByName function to find all the people having a given name, using Model.find() -> [Person]

Use the function argument personName as the search key.
*/
const findPeopleByName = (personName, done) => {
  console.log("Starting findPeopleByName defintion")
  //use model.find(filter, [projections], [options], [callback])
  Person.find({name: personName}, (err, personFound) => {
    console.log("we started the model.find function")
    if (err) {
      return console.error(err)
    }
    done(null, personFound);
    }) 
};

//Use model.findOne() to Return a Single Matching Document from Your Database

/*
Modify the findOneByFood function to find just one person which has a certain food in the person's favorites, using Model.findOne() -> Person. Use the function argument food as search key.

Doc https://mongoosejs.com/docs/api/model.html#model_Model.findOne
*/

const findOneByFood = (food, done) => {
  Person.findOne({favoriteFoods: food}, (err, personFound) => {
    console.log("we started the model.findOne function")
    if (err) {
      return console.error(err)
    }
    done(null, personFound);
    }) 
};

//Use model.findById() to Search Your Database By _id
/*
Modify the findPersonById to find the only person having a given _id, using Model.findById() -> Person. Use the function argument personId as the search key.

Doc https://mongoosejs.com/docs/api/model.html#model_Model.findById
*/


const findPersonById = (personId, done) => {
  Person.findById(personId, (err, idFound) => {
    if (err) {
      return console.error(err)
    }
    done(null, idFound);
  }) 
};


//Perform Classic Updates by Running Find, Edit, then Save
const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger" 

  Person.findById(personId, (err, personFound) => {
    console.log("we started model.findById function")
    if (err) return console.error(err)
    
    //add hamburger to their favorite foods array
    personFound.favoriteFoods.push(foodToAdd)
    personFound.save((err, updatedPerson) => {
      if(err) return console.log(err)
      done(null, updatedPerson)
    }) 
  })
};

// Perform New Updates on a Document Using model.findOneAndUpdate()
/*
Modify the findAndUpdate function to find a person by Name and set the person's age to 20. Use the function parameter personName as the search key.

Note: You should return the updated document. To do that, you need to pass the options document { new: true } as the 3rd argument to findOneAndUpdate(). By default, these methods return the unmodified object.

https://mongoosejs.com/docs/api/model.html#model_Model.findOneAndUpdate
*/

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  
  Person.findOneAndUpdate({name: personName}, {age: ageToSet}, {new: true}, (err, updatedDoc) => {
    if(err) return console.log(err)
    done(null, updatedDoc);
    console.log(updatedDoc)
  })
};

// Delete One Document Using model.findByIdAndRemove
// Modify the removeById function to delete one person by the person's _id. You should use one of the methods findByIdAndRemove() or findOneAndRemove().
// https://mongoosejs.com/docs/api/model.html#model_Model.findByIdAndRemove

const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId, (err, removedDoc) => {
    if(err) return console.log(err)
    done(null, removedDoc);
  })
};

// Delete Many Documents with model.remove()
/*
Modify the removeManyPeople function to delete all the people whose name is within the variable nameToRemove, using Model.remove(). Pass it to a query document with the name field set, and a callback.

Note: The Model.remove() doesn’t return the deleted document, but a JSON object containing the outcome of the operation, and the number of items affected. Don’t forget to pass it to the done() callback, since we use it in tests.
*/
/*
const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person.remove({name: nameToRemove}, (err, response) => {
    if(err) return console.log(err);
    console.log(response)
    done(null, response);
  })
};*/

// use Model.deleteMany instead bcs Model.remove is deprecated

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person.deleteMany({name: nameToRemove}, (err, response) => {
    if(err) return console.log(err);
    console.log(response) // verifies that json count of removed docs is returned
    // tests don't pause w/ error 
    // SyntaxError: Unexpected token o in JSON at position 1
    // supsect that issue is in tests, as even example solution fails
    done(null, response); 
  })
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
