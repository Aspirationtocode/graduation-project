import { CustomRepository, inject, MainRepository } from "modelsApi";
import { ModelTypes } from "src/core/types/types";
import { observable } from "mobx";
import {
  Auth__SignIn_Request,
  Auth__SignIn_Response
} from "server/src/resolvers/auth/types";
import { AuthModule } from "src/api/auth/authModule";
import { SessionStorage } from "src/core/storage/sessionStorage";
import { ApiBaseModule } from "src/api/apiBaseModule";
import { Routing } from "src/routing/routing";
import { User } from "server/src/models/user/types";

export enum AuthStatus {
  NONE = "NONE",
  SUCCESS = "SUCCESS"
}

export class AuthRepository extends CustomRepository<ModelTypes> {
  @inject private routing: Routing;
  @inject private authModule: AuthModule;
  @inject private apiBaseModule: ApiBaseModule;
  @inject private sessionStorage: SessionStorage;
  @observable protected status: AuthStatus = AuthStatus.NONE;
  @observable public profileUser: User;
  protected token: string | null = null;
  constructor(@inject mainRepository: MainRepository<ModelTypes>) {
    super(mainRepository);
    this.restoreSession();
  }

  public setStatus(status: AuthStatus) {
    this.status = status;
  }

  public setToken(token: string) {
    this.token = token;
    this.updateAuthorizationHeader(token);
  }

  public hasAuth(): boolean {
    return this.status === AuthStatus.SUCCESS;
  }
  private updateAuthorizationHeader(token: string) {
    this.apiBaseModule.setHeaders({
      Authorization: token
    });
  }
  private restoreSession() {
    const userSessionData = this.sessionStorage.getUserSessionData();
    if (userSessionData) {
      const { user, token } = userSessionData;
      this.setToken(token);
      this.setStatus(AuthStatus.SUCCESS);
      this.profileUser = user;
    }
  }
  private onSuccessAuth(response: Auth__SignIn_Response) {
    const { token, user } = response;
    if (token) {
      this.profileUser = user;
      this.setStatus(AuthStatus.SUCCESS);
      this.sessionStorage.setUserSessionData({ token, user });
      this.setToken(token);
      this.routing.replace("/");
    }
  }
  public signIn(request: Auth__SignIn_Request): Promise<Auth__SignIn_Response> {
    return this.authModule.signIn(request).then(response => {
      this.onSuccessAuth(response);
      return response;
    });
  }
  public logout() {
    this.sessionStorage.removeUserSessionData();
    this.setStatus(AuthStatus.NONE);
    this.routing.replace("/signin");
  }
}
