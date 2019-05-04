import { InputType, Field, ObjectType } from "type-graphql";
import { User } from "../../models/user/types";

@InputType()
export class Auth__SignIn_Request {
  @Field({ nullable: false })
  username: string;

  @Field({ nullable: false })
  password: string;
}

@ObjectType("Auth__SignIn_Response")
export class Auth__SignIn_Response {
  @Field({ nullable: false })
  user: User;
  @Field({ nullable: false })
  token: string;
}
