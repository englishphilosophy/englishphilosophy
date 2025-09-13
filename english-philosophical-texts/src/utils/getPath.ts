import { exists } from "@std/fs";

export const textsDir = Deno.env.get("TEXTS_DIR") ?? "./texts";

export default async (id: string): Promise<string | undefined> => {
  const idPath = id.replaceAll(".", "/").toLowerCase();
  if (await exists(`${textsDir}/${idPath}.mit`)) {
    return `${textsDir}/${idPath}.mit`;
  }
  if (await exists(`${textsDir}/${idPath}/index.mit`)) {
    return `${textsDir}/${idPath}/index.mit`;
  }
  return undefined;
};
