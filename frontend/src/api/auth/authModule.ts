import { ApiBaseModule } from "src/api/apiBaseModule";
import {
  Auth__SignIn_Request,
  Auth__SignIn_Response
} from "server/src/resolvers/auth/types";
import { CryptoUtils } from "src/crypto/CryptoUtils";

export class AuthModule extends ApiBaseModule {
  public signIn(request: Auth__SignIn_Request) {
    const { username, password } = request;
    const ek = CryptoUtils.generateEK(password, username);
    const hashedPassword = CryptoUtils.generatePassword(ek);
    return this.sendQuery({
      query: `
mutation {
    signIn(request: {username: "${username}", password: "${hashedPassword}"}) {
      token,
      user {
        username,
        id,
        fullName
      }
    }
  }
      `
    }).then(response => {
      return this.getData<Auth__SignIn_Response>(response, "signIn");
    });
  }
}
