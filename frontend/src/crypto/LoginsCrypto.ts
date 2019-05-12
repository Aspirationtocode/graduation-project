import {
  Login,
  DecryptedLogin,
  DecryptedLoginData
} from "server/src/models/login/types";
import { LoginKey } from "server/src/models/loginKey/types";
import { Crypto } from "assymetric-encryption";
import { inject } from "src/utils/inject";
import { AuthRepository } from "src/core/repositories/AuthRepository/authRepository";
import { CryptoUtils } from "src/crypto/CryptoUtils";

export class LoginsCrypto {
  @inject private authRepository: AuthRepository;
  public decryptLogins(
    logins: Login[],
    loginKeys: LoginKey[]
  ): DecryptedLogin[] {
    const decryptedLogins = logins.map(login => {
      const key = this.findKey(login, loginKeys);
      return this.decryptLogin(login, key);
    });
    return decryptedLogins;
  }

  public decryptLogin(login: Login, loginKey: LoginKey): DecryptedLogin {
    const loginBaseKey = this.getLoginBaseKey(loginKey.data);
    return {
      ...login,
      data: this.decryptLoginData(login.data, loginBaseKey)
    } as DecryptedLogin;
  }

  public encryptLoginData(
    decryptedLoginData: DecryptedLoginData,
    loginBaseKey: string
  ): string {
    return CryptoUtils.encrypt(
      JSON.stringify(decryptedLoginData),
      loginBaseKey
    );
  }

  public decryptLoginData(
    encryptedLoginData: string,
    loginBaseKey: string
  ): DecryptedLoginData {
    return JSON.parse(CryptoUtils.decrypt(encryptedLoginData, loginBaseKey));
  }

  private findKey(login: Login, loginKeys: LoginKey[]): LoginKey {
    return loginKeys.find(loginKey => loginKey.loginId === login.id);
  }

  public getLoginKey(loginBaseKey: string): string {
    const { profileUser } = this.authRepository;
    const { pub } = profileUser;
    return Crypto.encrypt(loginBaseKey, pub);
  }

  public getLoginBaseKey(loginKey: string): string {
    const { profileUser } = this.authRepository;
    const { sec } = profileUser;
    return Crypto.decrypt(loginKey, sec);
  }

  public generateLoginBaseKey() {
    return CryptoUtils.generateRandomKey();
  }
}
