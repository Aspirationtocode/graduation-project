import { inject } from "src/utils/inject";
import { AuthRepository } from "src/core/repositories/AuthRepository/authRepository";
import { CryptoUtils } from "src/crypto/CryptoUtils";
import { Crypto } from "assymetric-encryption";
import { LoginModule } from "src/api/login/loginModule";
import { Login__Create_Response } from "server/src/resolvers/login/types";
import { BaseRepository } from "src/core/repositories/baseRepository";
import { Login } from "server/src/models/login/types";

export class LoginRepository extends BaseRepository<Login> {
  @inject private authRepository: AuthRepository;
  @inject private loginModule: LoginModule;
  constructor() {
    super();
    this.getModels();
  }

  public createLogin(
    username: string,
    password: string,
    label: string,
    description: string
  ): Promise<Login__Create_Response> {
    const { profileUser } = this.authRepository;
    const { pub } = profileUser;
    const loginKey = CryptoUtils.generateRandomKey();
    const decryptedLoginData = {
      username,
      password,
      label,
      description
    };
    const encryptedLoginData = CryptoUtils.encrypt(
      JSON.stringify(decryptedLoginData),
      loginKey
    );
    const encryptedLoginKey = Crypto.encrypt(loginKey, pub);
    return this.loginModule
      .create({
        data: encryptedLoginData,
        key: encryptedLoginKey
      })
      .then(response => {
        return response;
      });
  }

  public getModels(): Promise<Login[]> {
    return this.loginModule.getLogins().then(response => {
      return response.logins;
    });
  }
}
