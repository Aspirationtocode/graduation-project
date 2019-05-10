import { AuthChecker } from "type-graphql";
import { JwtModule } from "../jwt/jwtModule";

export const authChecker: AuthChecker<any> = ({
  context
}): boolean | Promise<boolean> => {
  const { authorization: token } = context.headers;
  if (!token) {
    return false;
  }
  return JwtModule.verifyToken(token).then(() => {
    return true;
  });
};
