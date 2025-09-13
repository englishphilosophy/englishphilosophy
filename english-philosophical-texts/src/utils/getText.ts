import { normalize } from "@englishphilosophy/dictionary";
import { compile, type Format } from "@englishphilosophy/markit";
import type { Text } from "../types.ts";
import getPath, { textsDir } from "../utils/getPath.ts";

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
