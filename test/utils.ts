import * as Database from "../src/database";

export function createHobbyDummy(name?: string, passionLevel?: string, year?: number) {
  var hobby = {
    name: name || "dummy hobby",
    passionLevel: passionLevel || "Medium",
    year: year || 1
  };

  return hobby;
}

export function createUserDummy(email?: string) {
  var user = {
    name: "Dummy Jones",
  };

  return user;
}

export function clearDatabase(database: Database.IDatabase, done: MochaDone) {
  var promiseUser = database.userModel.remove({});
  var promiseTask = database.hobbyModel.remove({});

  Promise.all([promiseUser, promiseTask])
    .then(() => {
      done();
    })
    .catch(error => {
      console.log(error);
    });
}

export function createSeedHobbiesData(database: Database.IDatabase, done: MochaDone) {
  return database.userModel
    .create(createUserDummy())
    .then(user => {
      return Promise.all([
        database.hobbyModel.create(
          createHobbyDummy("Reading", "Medium", 12)
        ),
        database.hobbyModel.create(
          createHobbyDummy("Surfing", "Medium", 3)
        ),
        database.hobbyModel.create(
          createHobbyDummy("Soccer", "High", 5)
        )
      ]);
    })
    .then(task => {
      done();
    })
    .catch(error => {
      console.log(error);
    });
}

export function createSeedUserData(database: Database.IDatabase, done: MochaDone) {
  database.userModel
    .create(createUserDummy())
    .then(user => {
      done();
    })
    .catch(error => {
      console.log(error);
    });
}
