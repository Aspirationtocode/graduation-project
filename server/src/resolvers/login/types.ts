import { InputType, Field, ObjectType } from "type-graphql";
import { Login } from "../../models/login/types";
import { LoginKey } from "../../models/loginKey/types";

@InputType()
export class Login__Create_Request {
  @Field({ nullable: false })
  data: string;
  @Field({ nullable: false })
  key: string;
}

@ObjectType("Login__Create_Response")
export class Login__Create_Response {
  @Field({ nullable: false })
  login: Login;
  @Field({ nullable: false })
  loginKey: LoginKey;
}

@ObjectType("Logins__Get_Response")
export class Logins__Get_Response {
  @Field(type => [Login], { nullable: false })
  logins: Login[];
  @Field(type => [LoginKey], { nullable: false })
  loginKeys: LoginKey[];
}
