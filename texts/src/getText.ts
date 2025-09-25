import { normalize } from "@englishphilosophy/dictionary";
import { compile, innerContent, type Format } from "@englishphilosophy/markit";
import getPath, { textsDir } from "./getPath.ts";
import type { Text, TextStub } from "./types.ts";

export default async (
  id: string,
  format: Format = "html",
  normalized = false
): Promise<Text | undefined> => {
  const path = await getPath(id);

  if (path) {
    const [first] = await compile(path, {
      contextDirectory: textsDir,
      format,
    });

    const text = formatTextFields(first as Text, format);
    if (normalized) {
      text.blocks = text.blocks.map((block) => ({
        ...block,
        text: normalize(block.text),
      }));
    }

    return text;
  }
};

const formatTextFields = <Type extends Text | TextStub>(
  text: Type,
  format: Format
): Type => {
  if (text.title) {
    text.title =
      format === "markit" ? text.title : innerContent(text.title, format);
  }
  if (text.sourceDesc) {
    text.sourceDesc =
      format === "markit"
        ? text.sourceDesc
        : innerContent(text.sourceDesc, format);
  }
  if ("ancestors" in text) {
    text.ancestors = text.ancestors.map((ancestor) =>
      formatTextFields(ancestor, format)
    ) as typeof text.ancestors;
  }
  if ("children" in text) {
    text.children = text.children.map((child) =>
      formatTextFields(child, format)
    );
  }
  return text;
};
