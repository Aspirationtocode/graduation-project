import { InputType, Field, ObjectType } from "type-graphql";
import { User } from "../../models/user/types";

@InputType()
export class SignUp__SignUp_Request {
  @Field({ nullable: false })
  username: string;

  @Field({ nullable: false })
  fullName: string;

  @Field({ nullable: false })
  pub: string;

  @Field({ nullable: false })
  sec: string;

  @Field({ nullable: false })
  password: string;
}

@ObjectType("SignUp__SignUp_Response")
export class SignUp__SignUp_Response {
  @Field({ nullable: false })
  user: User;
}
