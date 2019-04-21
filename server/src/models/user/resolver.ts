import { User, UserModel, SignUpInput } from "./types";
import { Resolver, Query, Mutation, Arg } from "type-graphql";

@Resolver(User)
export class UserResolver {
  @Query(returns => User)
  public user(): Promise<User> {
    return new Promise((resolve, reject) => {
      resolve(
        UserModel.create({
          username: "s",
          password: "s"
        })
      );
    });
  }

  @Mutation(returns => User)
  signUp(@Arg("user") signUpInput: SignUpInput) {
    const { password, username } = signUpInput;
    return UserModel.create({
      password,
      username
    }).then(user => {
      return {
        username: user.username,
        id: user._id
      };
    });
  }
}
