import { ObjectType, ID, Field, InputType } from "type-graphql";
import { Typegoose, prop } from "typegoose";

@ObjectType("User")
export class User extends Typegoose {
  @Field(type => ID)
  @prop()
  id: string;

  @Field({ nullable: false })
  @prop()
  username: string;

  @Field({ nullable: false })
  @prop()
  password?: string;
}

export const UserModel = new User().getModelForClass(User);

@InputType()
export class SignUpInput {
  @Field()
  username: string;

  @Field()
  password: string;
}
