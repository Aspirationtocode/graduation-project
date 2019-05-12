import { Resolver, Mutation, Arg, Authorized, Ctx, Query } from "type-graphql";
import {
  Login__Create_Response,
  Login__Create_Request,
  Logins__Get_Response
} from "./types";
import { ModelHelpers } from "../../models/modelHelpers";
import { LoginModel, Login } from "../../models/login/types";
import { getUserIdFromContext } from "../../auth/getUserFromContext";
import { UserModel, User } from "../../models/user/types";
import { LoginKeyModel, LoginKey } from "../../models/loginKey/types";

@Resolver()
export class LoginResolver {
  @Query(returns => Logins__Get_Response)
  public getLogins(@Ctx() ctx: any): Promise<Logins__Get_Response> {
    const userId = getUserIdFromContext(ctx);
    return LoginKeyModel.find({ userId }).then(loginKeys => {
      const pureLoginKeys = loginKeys.map(key =>
        ModelHelpers.getObject<LoginKey>(key)
      );
      const pureLoginKeysLoginIds = pureLoginKeys.map(lk => lk.loginId);
      return LoginModel.find({ _id: { $in: pureLoginKeysLoginIds } }).then(
        logins => {
          const filteredLogins = logins.map(login => {
            return ModelHelpers.getObject<Login>(login);
          });

          return {
            logins: filteredLogins,
            loginKeys: pureLoginKeys
          };
        }
      );
    });
  }

  @Authorized()
  @Mutation(returns => Login__Create_Response)
  public createLogin(
    @Arg("request") loginCreateRequest: Login__Create_Request,
    @Ctx() ctx: any
  ): Promise<Login__Create_Response> {
    const userId = getUserIdFromContext(ctx);
    const { data } = loginCreateRequest;

    return LoginModel.create({ data }).then(login => {
      if (!login) {
        throw new Error("No login");
      }
      const pureLogin = ModelHelpers.getObject<Login>(login);

      return UserModel.findById(userId).then(user => {
        if (!user) {
          throw new Error("No user");
        }

        const pureUser = ModelHelpers.getObject<User>(user);
        const loginKeyCreateRequest = {
          data: loginCreateRequest.key,
          loginId: pureLogin.id,
          userId: pureUser.id
        };
        return LoginKeyModel.create(loginKeyCreateRequest).then(loginKey => {
          const pureLoginKey = ModelHelpers.getObject<LoginKey>(loginKey);
          const response: Login__Create_Response = {
            login: pureLogin,
            loginKey: pureLoginKey
          };
          return response;
        });
      });
    });
  }
}
