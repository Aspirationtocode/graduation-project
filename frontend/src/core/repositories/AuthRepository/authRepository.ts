import { inject } from "src/utils/inject";
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
import { CryptoUtils } from "src/crypto/CryptoUtils";

export enum AuthStatus {
  NONE = "NONE",
  SUCCESS = "SUCCESS"
}

export class AuthRepository {
  @inject private routing: Routing;
  @inject private authModule: AuthModule;
  @inject private apiBaseModule: ApiBaseModule;
  @inject private sessionStorage: SessionStorage;
  @observable protected status: AuthStatus = AuthStatus.NONE;
  @observable public profileUser: User;
  @observable public ek: string;
  protected token: string | null = null;
  constructor() {
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
      const { user, token, ek } = userSessionData;
      this.setToken(token);
      this.setStatus(AuthStatus.SUCCESS);
      this.profileUser = user;
      this.ek = ek;
    }
  }
  private onSuccessAuth(response: Auth__SignIn_Response, ek: string) {
    const { token, user } = response;
    if (token) {
      this.profileUser = user;
      this.ek = ek;
      this.setStatus(AuthStatus.SUCCESS);
      this.sessionStorage.setUserSessionData({ token, user, ek });
      this.setToken(token);
      this.routing.replace("/");
    }
  }
  public signIn(request: Auth__SignIn_Request): Promise<Auth__SignIn_Response> {
    const ek = CryptoUtils.generateEK(request.password, request.username);
    return this.authModule.signIn(request).then(response => {
      this.onSuccessAuth(response, ek);
      return response;
    });
  }
  public logout() {
    this.sessionStorage.removeUserSessionData();
    this.setStatus(AuthStatus.NONE);
    this.routing.replace("/signin");
  }
}
