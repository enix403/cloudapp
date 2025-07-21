import path from "node:path";

import { bold, red } from "colorette";
import dotenv from "dotenv";

import { appLogger } from "./logger";

const NODE_ENV = getEnv("NODE_ENV", "production");

// Environment checks
export const isDev = NODE_ENV === "development";
export const isProd = !isDev;

dotenv.config({
  path: [
    path.resolve(process.cwd(), ".env"),
  ],
});

if (isDev) {
  dotenv.config({
    path: [path.resolve(process.cwd(), ".env.local")],
    override: true
  });
}

/**
 * Retrieves an environment variable.
 * @param key - The environment variable key.
 * @returns The environment variable value as a string or `null` if not found.
 */
function getEnv(key: string): string | null;

/**
 * Retrieves an environment variable with a fallback value.
 * @param key - The environment variable key.
 * @param fallback - The fallback value to return if the environment variable is not found.
 * @returns The environment variable value as a string or the fallback value.
 */
function getEnv<T>(key: string, fallback: T): string | T;

/**
 * Implementation of the `getEnv` function.
 * @param key - The environment variable key.
 * @param fallback - The fallback value to return if the environment variable is not found.
 * @returns The environment variable value, fallback value, or `null`.
 */
function getEnv<T>(key: string, fallback?: T): string | T | null {
  let result = process.env[key] ?? null;

  // Check if the environment variable is missing or empty
  if (result === null || result === undefined || result === "") {
    // Return the fallback value if provided
    return fallback !== undefined ? fallback : null;
  }

  return result;
}

function toBool(x: unknown): boolean {
  if (
    (typeof x === "boolean" && x === true) ||
    (typeof x === "string" && x.toLowerCase() === "true")
  ) {
    return true;
  }
  return false;
}

let hasMissing = false;

function requireEnv(key: string, isNumber: boolean = false): string {
  let val: any = getEnv(key);

  if (typeof val === "string") val = val.trim();

  if (isNumber && val) {
    val = +val;
  }

  if (!val) {
    appLogger.error(red(`Required env ${bold("`" + key + "`")} not provided.`));
    hasMissing = true;
    return "";
  }

  return val;
}

// Application environment variables
export const appEnv = {
  NODE_ENV: NODE_ENV,
  PORT: getEnv("PORT"),
  MONGO_URL: requireEnv("MONGO_URL"),
  POSTGRES_URL: requireEnv("POSTGRES_URL"),
};

if (hasMissing) {
  appLogger.error(red(`Invalid configuration. Quitting.`));
  process.exit(1);
}
