enum Mode {
  PRODUCTION = "production",
  DEVELOPMENT = "development"
}

export interface PROCESS_ENV {
  mode?: Mode;
}

const env: PROCESS_ENV = process.env;

export module Environment {
  export const isProd = env.mode === "production";
  export const isDev = env.mode === "development";
}
