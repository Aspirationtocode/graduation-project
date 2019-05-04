enum Mode {
  PRODUCTION = "production",
  DEVELOPMENT = "development"
}

export interface PROCESS_ENV {
  MODE?: Mode;
}

const env: PROCESS_ENV = process.env;
console.log(env.MODE);

console.log(env.MODE, env.MODE === "production");

export module Environment {
  export const isProd = env.MODE === "production";
  export const isDev = env.MODE === "development";
}
