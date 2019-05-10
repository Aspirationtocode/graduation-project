import { JwtModule } from "../jwt/jwtModule";

export function getUserIdFromContext(ctx: any): string {
  const token = ctx.headers.authorization;
  const decodedToken = JwtModule.decodeToken(token) as any;
  return decodedToken.id;
}
