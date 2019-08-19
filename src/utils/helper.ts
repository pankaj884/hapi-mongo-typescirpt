import * as Jwt from "jsonwebtoken";
import * as Mongoose from "mongoose";
import { getDatabaseConfig, getServerConfigs, IServerConfigurations } from "../configurations";
import { LoggingModel } from "../plugins/logging/logging";
import * as Boom from "boom";

let config: any = getServerConfigs();

//Database logging async call for storing users logs
export const dbLogger = async (userId: string, payload: string, response: string) => {

    // create a new log
    var newLog = new LoggingModel({ userId, payload, response });

    try {
        newLog.save();
    } catch (error) {
        console.log("error" + error);
    }
};

//Sort array with key element
export const sortArray = (key: string) => {
    return function(a, b) {
        if (a[key] > b[key]) {
            return 1;
        } else if (a[key] < b[key]) {
            return -1;
        }
        return 0;
    };
};


//Sort array with key element
export const removeDuplicatesFromArray = (arr: any, key: string) => {
    if (!(arr instanceof Array) || key && typeof key !== 'string') {
        return false;
    }

    if (key && typeof key === 'string') {
        return arr.filter((obj, index, arr) => {
            return arr.map(mapObj => mapObj[key]).indexOf(obj[key]) === index;
        });

    } else {
        return arr.filter(function(item, index, arr) {
            return arr.indexOf(item) === index;
        });
    }
};