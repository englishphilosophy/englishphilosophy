import { compile } from "@englishphilosophy/markit";
import type { Author, Index } from "./types.ts";
import getPath, { textsDir } from "./getPath.ts";

export default async (): Promise<Index> => {
  if (cachedIndex) return cachedIndex;

  const id = "index";
  const publisher = "English Philosophical Texts";

  const path = await getPath("index");
  const options = { contextDirectory: textsDir };
  const [index] = await compile(path!, options);

  const children = await Promise.all(
    index.children!.map(async (author) => {
      const authorPath = await getPath(author.id);
      const options = { contextDirectory: textsDir };
      const [text] = await compile(authorPath!, options);
      return text as Author;
    }),
  );

  cachedIndex = { id, publisher, children };
  return cachedIndex;
};

let cachedIndex: Index | null = null;
