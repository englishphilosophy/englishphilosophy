import { normalize } from "@englishphilosophy/dictionary";
import { compile, type Format } from "@englishphilosophy/markit";
import getPath, { textsDir } from "./getPath.ts";
import type { Text } from "./types.ts";

export default async (
  id: string,
  format: Format = "html",
  normalized = false,
): Promise<Text | undefined> => {
  const path = await getPath(id);

  if (path) {
    const [first] = await compile(path, {
      contextDirectory: textsDir,
      format,
    });

    const text = first as Text;
    if (normalized) {
      text.blocks = text.blocks.map((block) => ({
        ...block,
        text: normalize(block.text),
      }));
    }

    return text;
  }
};
