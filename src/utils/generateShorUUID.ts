import shortUUID from "short-uuid";

export function generateShortUUID(): string {
  return shortUUID().generate()
}