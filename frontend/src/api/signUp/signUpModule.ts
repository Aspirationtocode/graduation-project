import { ApiBaseModule } from "src/api/apiBaseModule";
import { CryptoUtils } from "src/crypto/CryptoUtils";
import { SignUp__SignUp_Response } from "server/src/resolvers/signUp/types";
import { Crypto } from "assymetric-encryption";

export class SignUpModule extends ApiBaseModule {
  public signUp(
    username: string,
    password: string,
    fullName: string
  ): Promise<SignUp__SignUp_Response> {
    const ek = CryptoUtils.generateEK(password, username);
    const { pub, sec } = Crypto.generateKeyPair();
    const encryptedSec = CryptoUtils.encrypt(sec, ek);

    const hashedPassword = CryptoUtils.generatePassword(ek);
    const query = `
    mutation {
      signUp(
        request: {
          username: "${username}",
          fullName: "${fullName}",
          password: "${hashedPassword}",
          pub: """${pub}""",
          sec: """${encryptedSec}"""
        }) {
        user {
          id,
          username,
          fullName,
          pub,
          sec
        }
      }
    }
          `;
    return this.sendQuery({
      query
    }).then(response => {
      return this.getData<SignUp__SignUp_Response>(response, "signUp");
    });
  }
}
