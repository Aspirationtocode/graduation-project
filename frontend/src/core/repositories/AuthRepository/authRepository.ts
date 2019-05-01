import { CustomRepository, inject, MainRepository } from "modelsApi";
import { ModelTypes } from "src/core/types/types";
import { observable } from "mobx";

export enum AuthStatus {
  NONE = "NONE",
  SUCCESS = "SUCCESS",
  ERROR = "ERROR"
}

export class AuthRepository extends CustomRepository<ModelTypes> {
  @observable protected status: AuthStatus = AuthStatus.NONE;
  constructor(@inject mainRepository: MainRepository<ModelTypes>) {
    super(mainRepository);
  }

  public getStatus(): AuthStatus {
    return this.status;
  }

  public hasAuth(): boolean {
    return this.getStatus() === AuthStatus.SUCCESS;
  }
}
