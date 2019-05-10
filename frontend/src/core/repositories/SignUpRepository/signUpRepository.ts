import { inject } from "src/utils/inject";
import { SignUpModule } from "src/api/signUp/signUpModule";
import { SignUp__SignUp_Response } from "server/src/resolvers/signUp/types";
import { Routing } from "src/routing/routing";
import { observable } from "mobx";

export class SignUpRepository {
  @inject private signUpModule: SignUpModule;
  @observable public isLoading: boolean = false;
  @inject private routing: Routing;

  public signUp(
    username: string,
    password: string,
    fullName: string
  ): Promise<SignUp__SignUp_Response> {
    this.isLoading = true;
    return this.signUpModule
      .signUp(username, password, fullName)
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
