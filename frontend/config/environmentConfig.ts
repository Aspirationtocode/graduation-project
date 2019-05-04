import { Environment } from "./environment";

const { isProd } = Environment;

export interface FrontendEnvConfig {
  API_URL: string;
}

export const FRONTEND_ENV_CONFIG: FrontendEnvConfig = {
  API_URL: isProd
    ? "https://graduation-project-server.herokuapp.com"
    : "http://localhost:4000"
};
console.log(isProd, Environment, FRONTEND_ENV_CONFIG);
