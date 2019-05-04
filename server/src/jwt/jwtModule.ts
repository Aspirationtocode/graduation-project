import * as jwt from "jsonwebtoken";
import { User } from "../models/user/types";

const jwt_secret = "SDASD314CF23SERGCSEd90EQW23JXKCERNHSKCFHJA";

export namespace JwtModule {
  export function generateToken(user: User) {
    return jwt.sign(user, jwt_secret, {
      expiresIn: 60 * 60 * 24
    });
  }
}
