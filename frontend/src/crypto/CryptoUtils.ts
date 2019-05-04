import * as sjcl from "sjcl";

export namespace CryptoUtils {
  export function generateEK(password: string, username: string) {
    return sjcl.codec.hex.fromBits(
      sjcl.misc.pbkdf2(password, username.trim().toLowerCase(), 1000)
    );
  }

  export function generatePassword(ek: string) {
    return sjcl.codec.hex.fromBits(sjcl.hash.sha256.hash(ek));
  }
}
