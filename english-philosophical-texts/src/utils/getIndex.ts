import { compile } from "@englishphilosophy/markit";
import type { Author, Index } from "../types.ts";

export default async (): Promise<Index> => {
  if (cachedIndex) return cachedIndex;

  const id = "index";
  const publisher = "English Philosophical Texts";

  const [index] = await compile("./texts/index.mit", {
    contextDirectory: "./texts",
  });

  const children = await Promise.all(
    index.children!.map(async (author) => {
      const [text] = await compile(`./texts/${author.id}/index.mit`, {
        contextDirectory: "./texts",
      });
      return text as Author;
    }),
  );

  cachedIndex = { id, publisher, children };
  return cachedIndex;
};

let cachedIndex: Index | null = null;
