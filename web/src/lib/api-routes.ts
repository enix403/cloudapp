import ky from "ky";

export const API_BASE_URL: string = import.meta.env.VITE_API_BASE_URL as any;
(window as any).API_BASE_URL = API_BASE_URL;

if (!API_BASE_URL) {
  throw new Error("Env variable `VITE_API_BASE_URL` not set");
}

export const apiConn = ky.extend({
  prefixUrl: API_BASE_URL,
  timeout: false,
});

if (typeof window !== "undefined") {
  // @ts-ignore
  window.apiConn = apiConn;
}