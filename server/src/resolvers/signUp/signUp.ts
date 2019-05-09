import { Resolver, Query, Mutation, Arg } from "type-graphql";
import { User, UserModel } from "../../models/user/types";
import { SignUp__SignUp_Request, SignUp__SignUp_Response } from "./types";
import { ModelHelpers } from "../../models/modelHelpers";

@Resolver()
export class SignUpResolver {
  @Query(returns => String)
  public null(): String {
    return "null";
  }

  @Mutation(returns => SignUp__SignUp_Response)
  public signUp(
    @Arg("request") signUpRequest: SignUp__SignUp_Request
  ): Promise<SignUp__SignUp_Response> {
    const { username } = signUpRequest;
    return UserModel.findOne({ username }).then(user => {
      if (user) {
        throw new Error(`User with username ${user.username} already exists`);
      }
      return UserModel.create(signUpRequest).then(user => {
        const pureUser = ModelHelpers.getObject<User>(user);
        return {
          user: {
            username: pureUser.username,
            fullName: pureUser.fullName,
            sec: pureUser.sec,
            pub: pureUser.pub,
            id: pureUser.id
          }
        };
      });
    });
  }
}
