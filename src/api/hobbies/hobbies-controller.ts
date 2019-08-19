import * as Hapi from "hapi";
import * as Boom from "boom";
import { IHobby } from "./hobbies";
import { IDatabase } from "../../database";
import { IServerConfigurations } from "../../configurations";
import { IRequest } from "../../interfaces/request";
import { ILogging } from "../../plugins/logging/logging";
import { IUser } from "../users/user";

//Custom helper module
import * as Helper from "../../utils/helper";

export default class HobbyController {
  private database: IDatabase;
  private configs: IServerConfigurations;

  constructor(configs: IServerConfigurations, database: IDatabase) {
    this.configs = configs;
    this.database = database;
  }

  public async createHobby(request: IRequest, h: Hapi.ResponseToolkit) {
    var newHobby: IHobby = <IHobby>request.payload;

    try {
      let hobby: IHobby = await this.database.hobbyModel.create(newHobby);

      let payload: any = request.payload;
      let userId = payload.userId;

      let user: IUser = await this.database.userModel.findByIdAndUpdate(
        userId,
        { $push: { hobbies: hobby._id } },
        { new: true }
      );

      return h.response(hobby).code(201);
    } catch (error) {
      return Boom.badImplementation(error);
    }
  }

  public async updateHobby(request: IRequest, h: Hapi.ResponseToolkit) {
    let _id = request.params["id"];

    try {
      let hobby: IHobby = await this.database.hobbyModel.findByIdAndUpdate(
        _id, //ES6 shorthand syntax
        { $set: request.payload },
        { new: true }
      );

      if (hobby) {
        return hobby;
      } else {
        return Boom.notFound();
      }
    } catch (error) {
      return Boom.badImplementation(error);
    }
  }

  public async deleteHobby(request: IRequest, h: Hapi.ResponseToolkit) {

    let id = request.params["id"];
    let userId = request["query"]["userId"];

    let deletedHobby = await this.database.hobbyModel.findOneAndRemove({
      _id: id,
    });

    let user: IUser = await this.database.userModel.findByIdAndUpdate(
      userId,
      { $pull: { hobbies: id } },
      { new: true }
    );


    if (deletedHobby) {
      return deletedHobby;
    } else {
      return Boom.notFound();
    }
  }

  public async getHobbyById(request: IRequest, h: Hapi.ResponseToolkit) {

    let id = request.params["id"];

    let hobby = await this.database.hobbyModel.findOne({ _id: id })
      .lean(true);

    if (hobby) {
      return hobby;
    } else {
      return Boom.notFound();
    }
  }

  public async getHobbies(request: IRequest, h: Hapi.ResponseToolkit) {
    let userId = request["query"]["userId"];

    let user: IUser = await this.database.userModel.findById(userId).lean();

    let top = request.query["top"];
    let skip = request.query["skip"];
    let hobbies = await this.database.hobbyModel
      .find({ _id: { $in: user.hobbies } })
      .lean(true)
      .skip(skip)
      .limit(top);

    return hobbies;
  }
}
