import type { FullText, Text } from "@englishphilosophy/texts";

const flattenText = (text: FullText | Text): string => {
  let result = "";

  for (const block of text.blocks) {
    switch (block.type) {
      case "title":
        result += block.text + "\n\n";
        break;
      case "paragraph":
        result += block.text + "\n\n";
        break;
      case "note":
        result += `${block.id.split(".").at(-1)}. ${block.text}\n\n`;
        break;
    }
  }

  for (const child of text.children) {
    if ("children" in child) {
      result += `${flattenText(child)}\n\n`;
    } else {
      result += `${child.title}\n\n`;
    }
  }

  return result.replace(/\n{3,}/g, "\n\n").trim() + "\n";
};

export default flattenText;
