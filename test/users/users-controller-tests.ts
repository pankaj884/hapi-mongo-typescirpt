import * as chai from "chai";
import UserController from "../../src/api/users/user-controller";
import { IUser } from "../../src/api/users/user";
import * as Configs from "../../src/configurations";
import * as Server from "../../src/server";
import * as Database from "../../src/database";
import * as Utils from "../utils";

const configDb = Configs.getDatabaseConfig();
const database = Database.init(configDb);
const assert = chai.assert;
const serverConfig = Configs.getServerConfigs();

describe("UserController Tests", () => {
  let server;

  before(done => {
    Server.init(serverConfig, database).then(s => {
      server = s;
      done();
    });
  });

  // beforeEach(done => {
  //   Utils.createSeedUserData(database, done);
  // });

  after(done => {
    Utils.clearDatabase(database, done);
  });

  it("Create user", async () => {
    var user = {
      name: "John Robot",
    };

    const res = await server.inject({
      method: "POST",
      url: serverConfig.routePrefix + "/users",
      payload: user
    });

    var responseBody: any = JSON.parse(res.payload);
    assert.equal(201, res.statusCode);
    assert.isNotNull(responseBody.token);
  });


  it("Get user list", async () => {

    var user: any = Utils.createUserDummy();


    const res = await server.inject({
      method: "GET",
      url: serverConfig.routePrefix + "/users",
    });

    var responseBody: IUser = <IUser>JSON.parse(res.payload);
    assert.equal(200, res.statusCode);
  });


  it("Get user Info", async () => {

    const users = await server.inject({
      method: "GET",
      url: serverConfig.routePrefix + "/users",
    });

    const res = await server.inject({
      method: "GET",
      url: serverConfig.routePrefix + "/users/" + users.result[0]._id,
    });



    var responseBody: IUser = <IUser>JSON.parse(res.payload);
    assert.equal(200, res.statusCode);
  });




  it("Update user info", async () => {

    const users = await server.inject({
      method: "GET",
      url: serverConfig.routePrefix + "/users",
    });

    var updateUser = { name: "New Name" };

    const res = await server.inject({
      method: "PUT",
      url: serverConfig.routePrefix + "/users/" + users.result[0]._id,
      payload: updateUser,
    });

    var responseBody: IUser = <IUser>JSON.parse(res.payload);
    assert.equal(200, res.statusCode);
    assert.equal("New Name", responseBody.name);
  });

  it("Delete user", async () => {

    const users = await server.inject({
      method: "GET",
      url: serverConfig.routePrefix + "/users",
    });

    const res = await server.inject({
      method: "DELETE",
      url: serverConfig.routePrefix + "/users/" + users.result[0]._id,
    });

    assert.equal(200, res.statusCode);
    var responseBody: IUser = <IUser>JSON.parse(res.payload);


  });
});
