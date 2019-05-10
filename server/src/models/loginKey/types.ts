import { ObjectType, Field, ID } from "type-graphql";
import { Typegoose, prop } from "typegoose";

interface LoginKeyBase {
  id: string;
  loginId: string;
  userId: string;
  data: string;
}

@ObjectType("LoginKey")
class LoginKeyGraphql implements LoginKeyBase {
  @Field(type => ID)
  id: string;

  @Field({ nullable: false })
  data: string;

  @Field({ nullable: false })
  loginId: string;

  @Field({ nullable: false })
  userId: string;
}

class LoginKey extends Typegoose implements LoginKeyBase {
  @prop()
  id: string;

  @prop()
  data: string;

  @prop()
  loginId: string;

  @prop()
  userId: string;
}

export { LoginKeyGraphql as LoginKey };
export { LoginKey as UserTypegoose };

export const LoginKeyModel = new LoginKey().getModelForClass(LoginKey);
