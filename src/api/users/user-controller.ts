import * as Hapi from "hapi";
import * as Boom from "boom";
import * as Jwt from "jsonwebtoken";
import { IUser } from "./user";
import { IDatabase } from "../../database";
import { IServerConfigurations } from "../../configurations";
import { IRequest, ILoginRequest } from "../../interfaces/request";

export default class UserController {
  private database: IDatabase;
  private configs: IServerConfigurations;

  constructor(configs: IServerConfigurations, database: IDatabase) {
    this.database = database;
    this.configs = configs;
  }

  public async createUser(request: IRequest, h: Hapi.ResponseToolkit) {
    try {
      let user: any = await this.database.userModel.create(request.payload);
      return h.response(user).code(201);
    } catch (error) {
      return Boom.badImplementation(error);
    }
  }

  public async updateUser(request: IRequest, h: Hapi.ResponseToolkit) {
    let id = request.params["id"];

    try {
      let user: IUser = await this.database.userModel.findByIdAndUpdate(
        id,
        { $set: request.payload },
        { new: true }
      ).lean();
      return user;
    } catch (error) {
      return Boom.badImplementation(error);
    }
  }

  public async deleteUser(request: IRequest, h: Hapi.ResponseToolkit) {
    let id = request.params["id"];

    let user: IUser = await this.database.userModel.findByIdAndRemove(id).lean();

    return user;
  }

  public async infoUser(request: IRequest, h: Hapi.ResponseToolkit) {
    let id = request.params["id"];

    let user: IUser = await this.database.userModel.findById(id).lean();

    return user;
  }

  public async listUser(request: IRequest, h: Hapi.ResponseToolkit) {

    let users = await this.database.userModel.find().lean();

    return users;
  }
}
