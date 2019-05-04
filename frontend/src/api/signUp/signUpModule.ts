import { ApiBaseModule } from "src/api/apiBaseModule";
import { CryptoUtils } from "src/crypto/CryptoUtils";
import {
  SignUp__SignUp_Request,
  SignUp__SignUp_Response
} from "server/src/resolvers/signUp/types";

export class SignUpModule extends ApiBaseModule {
  public signUp(
    request: SignUp__SignUp_Request
  ): Promise<SignUp__SignUp_Response> {
    const { username, password, fullName } = request;
    const ek = CryptoUtils.generateEK(password, username);
    const hashedPassword = CryptoUtils.generatePassword(ek);
    return this.sendQuery({
      query: `
mutation {
  signUp(request: {username: "${username}", fullName: "${fullName}", password: "${hashedPassword}"}) {
    user {
      id,
      username,
      fullName
    }
  }
}
      `
    }).then(response => {
      return this.getData<SignUp__SignUp_Response>(response, "signUp");
    });
  }
}
