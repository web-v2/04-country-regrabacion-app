declare const process: { env?: Record<string, string> } | undefined;

type RuntimeEnv = Record<string, string | undefined> | undefined;

const runtimeEnv: RuntimeEnv =
  typeof window !== 'undefined' && (window as Window & { __ENV__?: RuntimeEnv }).__ENV__
    ? (window as Window & { __ENV__?: RuntimeEnv }).__ENV__
    : typeof process !== 'undefined'
      ? process.env
      : undefined;

export const environment = {
  production: false,
  restCountriesApiBaseUrl: 'https://restcountries.com/v3.1',
  restCountriesApiKey:
    runtimeEnv?.RESTCOUNTRIES_API_KEY ??
    'rc_live_25554046d14f494894e6974d42d055f8',
};
