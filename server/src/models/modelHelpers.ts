import { MongooseDocument } from "mongoose";

type MongoosePureModel<T> = { id: string } & T;

export module ModelHelpers {
  export function getObject<T>(model: MongooseDocument): MongoosePureModel<T> {
    const pureObject = model.toObject({ getters: true, versionKey: false });
    const tempId = model._id;
    delete pureObject._id;
    pureObject.id = tempId.toString();
    return pureObject;
  }
}
