import { compile } from "@englishphilosophy/markit";
import getPath, { textsDir } from "./getPath.ts";
import type { Author } from "./types.ts";

export default async (id: string): Promise<Author | undefined> => {
  if (id.includes(".") || id.includes("/")) return undefined;

  const path = await getPath(id);
  if (!path) return undefined;

  const [author] = await compile(path, { contextDirectory: textsDir });
  return author as Author;
};
