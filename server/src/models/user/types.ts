import { ObjectType, ID, Field } from "type-graphql";
import { Typegoose, prop } from "typegoose";

interface UserBase {
  id: string;
  username: string;
  fullName: string;
  pub: string;
  sec: string;
  password?: string;
}

@ObjectType("User")
class UserGraphql implements UserBase {
  @Field(type => ID)
  id: string;

  @Field({ nullable: false })
  username: string;

  @Field({ nullable: false })
  fullName: string;

  @Field({ nullable: false })
  pub: string;

  @Field({ nullable: false })
  sec: string;

  @prop()
  password?: string;
}

class User extends Typegoose implements UserBase {
  @prop()
  id: string;

  @prop()
  username: string;

  @prop()
  fullName: string;

  @prop()
  pub: string;

  @prop()
  sec: string;

  @prop()
  password?: string;
}

export { UserGraphql as User };
export { User as UserTypegoose };

export const UserModel = new User().getModelForClass(User);
