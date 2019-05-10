import * as jwt from "jsonwebtoken";
import { User } from "../models/user/types";
const jwt_secret = "SDASD314CF23SERGCSEd90EQW23JXKCERNHSKCFHJA";

export namespace JwtModule {
  export function generateToken(user: User) {
    return jwt.sign(user, jwt_secret, {
      expiresIn: 60 * 60 * 24
    });
  }

  export function decodeToken(token: string) {
    return jwt.decode(token);
  }

  export function verifyToken(token: string): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        jwt.verify(token, jwt_secret, (err: any, user: any) => {
          if (!err && user) {
            resolve();
          }
          throw new Error("JWT failed");
        });
      } catch {
        throw new Error("JWT failed");
      }
    });
  }
}
