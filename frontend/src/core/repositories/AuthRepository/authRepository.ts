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

export enum AuthStatus {
  NONE = "NONE",
  SUCCESS = "SUCCESS"
}

export class AuthRepository extends CustomRepository<ModelTypes> {
  @inject private authModule: AuthModule;
  @inject private apiBaseModule: ApiBaseModule;
  @inject private sessionStorage: SessionStorage;
  @observable protected status: AuthStatus = AuthStatus.NONE;
  protected token: string | null = null;
  constructor(@inject mainRepository: MainRepository<ModelTypes>) {
    super(mainRepository);
    this.restoreSession();
  }

  public getStatus(): AuthStatus {
    return this.status;
  }

  public setStatus(status: AuthStatus) {
    this.status = status;
  }

  public setToken(token: string) {
    this.token = token;
    this.updateAuthorizationHeader(token);
  }

  public hasAuth(): boolean {
    return this.getStatus() === AuthStatus.SUCCESS;
  }

  private updateAuthorizationHeader(token: string) {
    this.apiBaseModule.setHeaders({
      Authorization: token
    });
  }

  private restoreSession() {
    const token = this.sessionStorage.getJwtToken();
    if (token) {
      this.setToken(token);
    }
  }

  public signIn(request: Auth__SignIn_Request): Promise<Auth__SignIn_Response> {
    return this.authModule.signIn(request).then(response => {
      const { token } = response;
      if (token) {
        this.setStatus(AuthStatus.SUCCESS);
        this.sessionStorage.setJwtToken(token);
        this.setToken(token);
      }
      return response;
    });
  }
}
