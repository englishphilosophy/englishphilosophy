import { compile, type Format } from "@englishphilosophy/markit";
import type { Text } from "../types.ts";
import getPath from "../utils/getPath.ts";
import { normalize } from "@englishphilosophy/dictionary";

export default async (
  id: string,
  format: Format = "html",
  normalized = false,
): Promise<Text | undefined> => {
  const path = await getPath(id);

  if (path) {
    const [first] = await compile(path, {
      contextDirectory: "./texts",
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
