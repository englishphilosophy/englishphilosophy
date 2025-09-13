import { compile } from "@englishphilosophy/markit";
import type { Block } from "../types.ts";
import getPath from "./getPath.ts";

const getMatches = async (id: string, exp: RegExp): Promise<Block[]> => {
  const path = await getPath(id);
  if (!path) return [];

  const [text] = await compile(path, { format: "text" });
  const matches = getMatchedBlocks(text.blocks, exp);

  for (const child of text.children) {
    const childMatches = await getMatches(child.id, exp);
    matches.push(...childMatches);
  }

  return matches;
};

export default getMatches;

const getMatchedBlocks = (blocks: Block[], exp: RegExp) =>
  blocks
    .filter((block) => block.text.match(exp))
    .map((block) => ({
      ...block,
      text: exp.flags.includes("g")
        ? block.text.replaceAll(exp, "<mark>$1</mark>")
        : block.text.replace(exp, "<mark>$1</mark>"),
    }));
