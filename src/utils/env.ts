export const isDev = (env: Env) => env.MODE === 'development';
export const isTest = (env: Env) => env.MODE === 'test';
export const isProd = (env: Env) => env.MODE === 'production';
