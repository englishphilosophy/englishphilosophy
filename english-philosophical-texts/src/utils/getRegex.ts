import { getVariants } from "@englishphilosophy/dictionary";

export type Options = {
  ignorePunctuation: boolean;
  caseInsensitive: boolean;
  wholeWords: boolean;
  variantSpellings: boolean;
};

export default (query: string, options: Options): RegExp => {
  const flags = options.caseInsensitive ? "gi" : "g";

  const basePattern = query
    .split(/\s/)
    .map((part) =>
      options.variantSpellings ? `(${getVariants(part).join("|")})` : part
    )
    .join("\\s+");

  const pattern = options.wholeWords ? `\\b${basePattern}\\b` : basePattern;

  return new RegExp(`(${pattern})`, flags);
};
