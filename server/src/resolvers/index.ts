import { SignUpResolver } from "./signUp/signUp";
import { AuthResolver } from "./auth/auth";
import { LoginResolver } from "./login/login";

export const resolvers = [SignUpResolver, AuthResolver, LoginResolver];
