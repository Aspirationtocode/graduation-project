import { BaseStorage } from "src/core/storage/storage";

enum SessionStorageKey {
  JWT_TOKEN = "session-jwt-token"
}

export class SessionStorage extends BaseStorage<"sessionStorage"> {
  constructor() {
    super();
    this.init("sessionStorage");
  }

  public setJwtToken(token: string) {
    this.setItem(SessionStorageKey.JWT_TOKEN, token);
  }

  public getJwtToken(): string | null {
    return this.getItem<string>(SessionStorageKey.JWT_TOKEN);
  }
}
