import { CustomRepository, inject, MainRepository } from "modelsApi";
import { ModelTypes } from "src/core/types/types";
import { SignUpModule } from "src/api/signUp/signUpModule";
import { observable } from "mobx";
import {
  SignUp__SignUp_Request,
  SignUp__SignUp_Response
} from "server/src/resolvers/signUp/types";
import { Routing } from "src/routing/routing";

export class SignUpRepository extends CustomRepository<ModelTypes> {
  @inject private signUpModule: SignUpModule;
  @inject private routing: Routing;
  @observable public isLoading = false;

  constructor(@inject mainRepository: MainRepository<ModelTypes>) {
    super(mainRepository);
  }

  public signUp(
    request: SignUp__SignUp_Request
  ): Promise<SignUp__SignUp_Response> {
    this.isLoading = true;
    return this.signUpModule
      .signUp(request)
      .then(response => {
        this.isLoading = false;
        this.routing.replace("/signin");
        return response;
      })
      .catch(error => {
        this.isLoading = false;
        return Promise.reject(error);
      });
  }
}
