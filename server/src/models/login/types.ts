import { ObjectType, Field, ID } from "type-graphql";
import { Typegoose, prop } from "typegoose";
import { Omit } from "../../types";

export interface DecryptedLogin extends Omit<Login, "data"> {
  data: DecryptedLoginData;
  id: string;
}

export interface DecryptedLoginData {
  username: string;
  password: string;
  label?: string;
  description?: string;
}

interface LoginBase {
  id: string;
  data: string;
}

@ObjectType("Login")
class LoginGraphql implements LoginBase {
  @Field(type => ID)
  id: string;

  @Field({ nullable: false })
  data: string;
}

class Login extends Typegoose implements LoginBase {
  @prop()
  id: string;

  @prop()
  data: string;
}

export { LoginGraphql as Login };
export { Login as UserTypegoose };

export const LoginModel = new Login().getModelForClass(Login);
