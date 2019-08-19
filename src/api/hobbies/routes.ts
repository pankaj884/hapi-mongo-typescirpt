import * as Hapi from "hapi";
import * as Joi from "joi";
import HobbiesController from "./hobbies-controller";
import * as HobbyValidator from "./hobbies-validator";
import { jwtValidator } from "../users/user-validator";
import { IDatabase } from "../../database";
import { IServerConfigurations } from "../../configurations";

export default function(
  server: Hapi.Server,
  configs: IServerConfigurations,
  database: IDatabase
) {
  const hobbyController = new HobbiesController(configs, database);
  server.bind(hobbyController);

  server.route({
    method: "GET",
    path: "/hobbies/{id}",
    options: {
      handler: hobbyController.getHobbyById,
      auth: false,
      tags: ["api", "hobbies"],
      description: "Get task by id.",
      validate: {
        params: {
          id: Joi.string().required()
        }
      },
      plugins: {
        "hapi-swagger": {
          responses: {
            "200": {
              description: "Task founded."
            },
            "404": {
              description: "Task does not exists."
            }
          }
        }
      }
    }
  });

  server.route({
    method: "GET",
    path: "/hobbies",
    options: {
      handler: hobbyController.getHobbies,
      auth: false,
      tags: ["api", "hobbies"],
      description: "Get all hobbies.",
      validate: {
        query: {
          top: Joi.number().default(5),
          skip: Joi.number().default(0)
        },
        headers: jwtValidator
      }
    }
  });

  server.route({
    method: "DELETE",
    path: "/hobbies/{id}",
    options: {
      handler: hobbyController.deleteHobby,
      auth: false,
      tags: ["api", "hobbies"],
      description: "Delete task by id.",
      validate: {
        params: {
          id: Joi.string().required()
        }
      },
      plugins: {
        "hapi-swagger": {
          responses: {
            "200": {
              description: "Deleted Task."
            },
            "404": {
              description: "Task does not exists."
            }
          }
        }
      }
    }
  });

  server.route({
    method: "PUT",
    path: "/hobbies/{id}",
    options: {
      handler: hobbyController.updateHobby,
      auth: false,
      tags: ["api", "hobbies"],
      description: "Update task by id.",
      validate: {
        params: {
          id: Joi.string().required()
        },
        payload: HobbyValidator.updateHobbyModel
      },
      plugins: {
        "hapi-swagger": {
          responses: {
            "200": {
              description: "Deleted Task."
            },
            "404": {
              description: "Task does not exists."
            }
          }
        }
      }
    }
  });

  server.route({
    method: "POST",
    path: "/hobbies",
    options: {
      handler: hobbyController.createHobby,
      auth: false,
      tags: ["api", "hobbies"],
      description: "Create a task.",
      validate: {
        payload: HobbyValidator.createHobbyModel
      },
      plugins: {
        "hapi-swagger": {
          responses: {
            "201": {
              description: "Created Task."
            }
          }
        }
      }
    }
  });
}
