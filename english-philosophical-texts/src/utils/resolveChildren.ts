import { type FullText, getText, type Text } from "@englishphilosophy/texts";
import type { TextOptions } from "../types.ts";

const resolveChildren = async (
  text: Text,
  options: TextOptions,
): Promise<FullText> => {
  const children: FullText[] = [];
  for (const child of text.children) {
    const childText = await getText(
      child.id,
      options.format,
      options.normalized,
    );
    if (childText) {
      const fullChildText = await resolveChildren(childText, options);
      children.push(fullChildText);
    }
  }
  return { ...text, children };
};

export default resolveChildren;
