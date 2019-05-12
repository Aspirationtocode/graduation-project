import { inject } from "src/utils/inject";
import { LoginModule } from "src/api/login/loginModule";
import { Login__Create_Response } from "server/src/resolvers/login/types";
import { BaseRepository } from "src/core/repositories/baseRepository";
import {
  DecryptedLogin,
  DecryptedLoginData
} from "server/src/models/login/types";
import { LoginsCrypto } from "src/crypto/LoginsCrypto";
import { MainRepository } from "src/core/repositories/MainRepository/mainRepository";

export class LoginRepository extends BaseRepository<DecryptedLogin> {
  @inject private loginsCrypto: LoginsCrypto;
  @inject private loginModule: LoginModule;

  constructor(@inject mainRepository: MainRepository) {
    super();
    mainRepository.registerRepository("loginRepository", this);
  }

  public createLogin(
    decryptedLoginData: DecryptedLoginData
  ): Promise<Login__Create_Response> {
    // 1. Generate login base key
    const loginBaseKey = this.loginsCrypto.generateLoginBaseKey();
    // 2. Encrypt login data with base key
    const encryptedLoginData = this.loginsCrypto.encryptLoginData(
      decryptedLoginData,
      loginBaseKey
    );
    // 3. Get login key by encrypting login base key
    const loginKey = this.loginsCrypto.getLoginKey(loginBaseKey);
    return this.loginModule
      .create({
        data: encryptedLoginData,
        key: loginKey
      })
      .then(response => {
        const decryptedLogin = this.loginsCrypto.decryptLogin(
          response.login,
          response.loginKey
        );
        this.appendList(decryptedLogin);
        return response;
      });
  }

  public getModels(): Promise<DecryptedLogin[]> {
    return this.loginModule.getLogins().then(response => {
      const decryptedLogins = this.loginsCrypto.decryptLogins(
        response.logins,
        response.loginKeys
      );
      return decryptedLogins;
    });
  }
}
