import variants from "../data/variants.ts";
import { applyCase, getCase } from "./case.ts";

export default (word: string): string[] => {
  const caseType = getCase(word);
  const wordInLowerCase = applyCase(word, "lower");

  // everything is a variant of itself
  const variantsOfWord = [word];

  // add standard form if word is a variant
  const standard = variants.find(([variant]) => variant === wordInLowerCase)
    ?.[1];
  if (standard) {
    variantsOfWord.push(applyCase(standard, caseType));
  } else if (word.endsWith("s")) {
    const standardWithoutS = variants.find(([variant]) =>
      variant === wordInLowerCase.slice(0, -1)
    )?.[1];
    if (standardWithoutS) {
      variantsOfWord.push(applyCase(standardWithoutS + "s", caseType));
    }
  }

  // add variants if word is a standard form
  variants.forEach(([variant, standard]) => {
    if (standard === word) {
      variantsOfWord.push(applyCase(variant, caseType));
    } else if (word.endsWith("s") && standard + "s" === word) {
      variantsOfWord.push(applyCase(variant + "s", caseType));
    }
  });

  return [...new Set(variantsOfWord)].sort();
};
