import { normalize } from "@englishphilosophy/dictionary";
import { compile, type Format, innerContent } from "@englishphilosophy/markit";
import { diffWordsWithSpace } from "diff";
import getPath, { textsDir } from "./getPath.ts";
import type { Block, GetTextOptions, Text, TextStub } from "./types.ts";

export default async (
  id: string,
  {
    format = "html",
    normalized = false,
    diffWith = null,
  }: Partial<GetTextOptions> = {},
): Promise<Text | undefined> => {
  // get base text
  const baseText = await getText(id, format, normalized);
  if (!baseText) return undefined;

  // format base text fields
  const text = formatTextFields(baseText, format);

  // get text to diff against
  const diffText = diffWith === null
    ? undefined
    : await getText(diffWith, format, normalized);
  if (!diffText) return text;

  // generate diff for all blocks in main text
  text.blocks = text.blocks.map((block) => {
    const diffBlock = findDiffBlock(block.id, text, diffText);
    return { ...block, text: diff(diffBlock?.text ?? "", block.text) };
  });

  // add in any blocks that are in the diff text but not the main text
  diffText.blocks
    .filter((diffBlock) => !findDiffBlock(diffBlock.id, diffText, text))
    .forEach((diffBlock, index, diffBlocks) => {
      const indexOfPreviousMatch = text.blocks.findIndex((block) =>
        block.id.split(".").at(-1) ===
          diffBlocks[index - 1]?.id.split(".").at(-1)
      );
      const insertionIndex = indexOfPreviousMatch === -1
        ? text.blocks.length
        : indexOfPreviousMatch + 1;
      text.blocks.splice(insertionIndex, 0, {
        ...diffBlock,
        text: diff(diffBlock.text, ""),
      });
    });

  // return final text with diffs
  return text;
};

const getText = async (id: string, format: Format, normalized: boolean) => {
  const path = await getPath(id);
  if (!path) return undefined;

  const [text] = await compile(path, {
    contextDirectory: textsDir,
    format,
  });

  if (normalized) {
    text.blocks = text.blocks.map((block) => ({
      ...block,
      text: normalize(block.text),
    }));
  }

  return text as Text;
};

const formatTextFields = <Type extends Text | TextStub>(
  text: Type,
  format: Format,
): Type => {
  if (text.title) {
    text.title = format === "markit"
      ? text.title
      : innerContent(text.title, format);
  }
  if (text.sourceDesc) {
    text.sourceDesc = format === "markit"
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

const findDiffBlock = (blockId: string, sourceText: Text, targetText: Text) =>
  targetText.blocks.find((diffBlock) =>
    diffBlock.id.replace(targetText.id, "") === blockId.replace(sourceText.id, "")
  );

const diff = (textA: string, textB: string) =>
  diffWordsWithSpace(textA, textB)
    .reduce((acc, part) => {
      if (part.added) {
        return acc + `<ins>${part.value}</ins>`;
      } else if (part.removed) {
        return acc + `<del>${part.value}</del>`;
      } else {
        return acc + part.value;
      }
    }, "")
    .replaceAll(
      /<ins><([a-z]+)><\/ins>(.*?)<ins><\/\1><\/ins>/g,
      "<ins><$1>$2</$1></ins><del>$2</del>",
    )
    .replaceAll(
      /<del><([a-z]+)><\/del>(.*?)<del><\/\1><\/del>/g,
      "<del><$1>$2</$1></del><ins>$2</ins>",
    );
