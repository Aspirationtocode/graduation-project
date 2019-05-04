enum Mode {
  PRODUCTION = "production",
  DEVELOPMENT = "development"
}

export interface PROCESS_ENV {
  mode?: Mode;
}

const env: PROCESS_ENV = process.env;
console.log(env);

export module Environment {
  export const isProd = env.mode === Mode.PRODUCTION;
  export const isDev = env.mode === Mode.DEVELOPMENT;
  export const mode =
    env.mode === Mode.DEVELOPMENT || env.mode === Mode.PRODUCTION
      ? env.mode
      : null;
}
