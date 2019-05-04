import { Resolver, Mutation, Arg } from "type-graphql";
import { Auth__SignIn_Request, Auth__SignIn_Response } from "./types";
import { User, UserModel } from "../../models/user/types";
import { JwtModule } from "../../jwt/jwtModule";
import { ModelHelpers } from "../../models/modelHelpers";

@Resolver()
export class AuthResolver {
  @Mutation(returns => Auth__SignIn_Response)
  public signIn(
    @Arg("request") signInRequest: Auth__SignIn_Request
  ): Promise<Auth__SignIn_Response> {
    const { username } = signInRequest;
    return UserModel.findOne({
      username
    })
      .then(user => {
        if (!user) {
          throw new Error(`No user with username ${username}`);
        }
        const isPasswordsMatch = user.password === signInRequest.password;
        if (isPasswordsMatch) {
          try {
            const pureUser = ModelHelpers.getObject<User>(user);

            const tokenUser: User = {
              username: pureUser.username,
              id: pureUser.id,
              fullName: pureUser.fullName
            };
            const token = JwtModule.generateToken(tokenUser);
            return {
              user: tokenUser,
              token
            };
          } catch (error) {
            throw new Error("Something go wrong");
          }
        } else {
          throw new Error("Sorry, wrong credentials");
        }
      })
      .catch(error => {
        throw new Error(`Invalid credentials`);
      });
  }
}
