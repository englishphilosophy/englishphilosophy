import { type Block, getText } from "@englishphilosophy/texts";
import { getVariants } from "@englishphilosophy/dictionary";

type SearchOptions = TextSearchOptions | RegexSearchOptions;

type TextSearchOptions = {
  query: string;
  ignorePunctuation: boolean;
  caseInsensitive: boolean;
  wholeWords: boolean;
  variantSpellings: boolean;
};

type RegexSearchOptions = {
  regex: RegExp;
};

const getMatches = async (
  id: string,
  options: SearchOptions,
): Promise<Block[]> => {
  const text = await getText(id, "text");
  if (!text) return [];

  const regex = "regex" in options ? options.regex : getRegex(options);
  const matches = getMatchedBlocks(text.blocks, regex);

  for (const child of text.children) {
    const childMatches = await getMatches(child.id, { regex });
    matches.push(...childMatches);
  }

  return matches;
};

export default getMatches;

const getRegex = (options: TextSearchOptions): RegExp => {
  const flags = options.caseInsensitive ? "gi" : "g";

  const basePattern = options.query
    .split(/\s/)
    .map((part) =>
      options.variantSpellings ? `(${getVariants(part).join("|")})` : part
    )
    .join("\\s+");

  const pattern = options.wholeWords ? `\\b${basePattern}\\b` : basePattern;

  return new RegExp(`(${pattern})`, flags);
};

const getMatchedBlocks = (blocks: Block[], regex: RegExp) =>
  blocks
    .filter((block) => block.text.match(regex))
    .map((block) => ({
      ...block,
      text: regex.flags.includes("g")
        ? block.text.replaceAll(regex, "<mark>$1</mark>")
        : block.text.replace(regex, "<mark>$1</mark>"),
    }));
