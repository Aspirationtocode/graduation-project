import { observable } from "mobx";

export abstract class BaseRepository<T = {}> {
  @observable public isLoading: boolean = false;
  @observable public list: T[] = [];

  public replaceList(newList: T[]) {
    this.list = newList;
  }

  public getList(): T[] {
    if (!this.list.length) {
      setImmediate(() => {
        this.isLoading = true;
        this.getModels()
          .then(models => {
            this.isLoading = false;
            this.replaceList(models);
          })
          .catch(error => {
            this.isLoading = false;
            return Promise.reject(error);
          });
      });

      return [];
    }
    return this.list;
  }

  public abstract getModels(): Promise<T[]>;

  public appendList(model: T) {
    this.list.push(model);
  }

  public onFinishAsyncAction() {
    this.isLoading = false;
  }

  public onStartAsyncAction() {
    this.isLoading = true;
  }
}
