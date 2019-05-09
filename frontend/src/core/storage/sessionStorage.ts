import { BaseStorage } from "src/core/storage/storage";
import { User } from "server/src/models/user/types";

enum SessionStorageKey {
  USER_SESSION_DATA = "user-session-data"
}

interface UserSessionData {
  token: string;
  user: User;
}

export class SessionStorage extends BaseStorage<"sessionStorage"> {
  constructor() {
    super();
    this.init("sessionStorage");
  }

  public removeUserSessionData() {
    this.removeItem(SessionStorageKey.USER_SESSION_DATA);
  }

  public setUserSessionData(data: UserSessionData) {
    this.setItem(SessionStorageKey.USER_SESSION_DATA, data);
  }

  public getUserSessionData(): UserSessionData {
    return this.getItem<UserSessionData>(SessionStorageKey.USER_SESSION_DATA);
  }
}
