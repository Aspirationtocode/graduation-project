enum Mode {
  PRODUCTION = "production",
  DEVELOPMENT = "development"
}

export interface PROCESS_ENV {
  MODE?: Mode;
}

const env: PROCESS_ENV = process.env;

export module Environment {
  export const isProd = env.MODE === Mode.PRODUCTION;
  export const isDev = env.MODE === Mode.DEVELOPMENT;
}
