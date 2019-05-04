import { ObjectType, ID, Field } from "type-graphql";
import { Typegoose, prop } from "typegoose";

interface UserBase {
  id: string;
  username: string;
  fullName: string;
  password?: string;
}

@ObjectType("User")
export class User implements UserBase {
  @Field(type => ID)
  id: string;

  @Field({ nullable: false })
  username: string;

  @Field({ nullable: false })
  fullName: string;

  @prop()
  password?: string;
}

class UserTypegoose extends Typegoose implements UserBase {
  @prop()
  id: string;

  @prop()
  username: string;

  @prop()
  fullName: string;

  @prop()
  password?: string;
}

export const UserModel = new UserTypegoose().getModelForClass(User);
