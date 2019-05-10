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

  export function generateRandomKey(): string {
    return sjcl.codec.hex.fromBits(
      sjcl.misc.pbkdf2(
        sjcl.random.randomWords(8),
        sjcl.random.randomWords(2),
        1000
      )
    );
  }

  export function encrypt(plaintext: string, key: string): string {
    return (sjcl.encrypt(key as any, plaintext, {
      ks: 256
    } as any) as any) as string;
  }

  export function decrypt(obj: any, key: string) {
    return sjcl.decrypt(key, obj, { ks: 256 });
  }
}
