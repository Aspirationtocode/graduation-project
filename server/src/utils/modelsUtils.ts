type ModelWithMongoId<T> = T & {
  _id: string;
};

type ModelWithPureId<T> = T & {
  id: string;
};

export module ModelsUtils {
  export function transformModel<T>(
    model: ModelWithMongoId<T>
  ): ModelWithPureId<T> {
    const tempId = model._id;
    delete model._id;

    const newModel: ModelWithPureId<T> = {
      ...model,
      id: tempId
    };

    return newModel;
  }
}
