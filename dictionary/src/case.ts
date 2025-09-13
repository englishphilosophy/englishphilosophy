export const caseTypes = ["lower", "capitalized", "upper"] as const;

export type Case = typeof caseTypes[number];

export const getCase = (word: string): Case => {
  if (word[0] === "'") return getCase(word.slice(1));
  if (word === word.toUpperCase()) return "upper";
  if (word[0] === word[0].toUpperCase()) return "capitalized";
  return "lower";
};

export const applyCase = (word: string, caseType: Case): string => {
  if (word[0] === "'") return "'" + applyCase(word.slice(1), caseType);
  if (caseType === "upper") return word.toUpperCase();
  if (caseType === "capitalized") return word[0].toUpperCase() + word.slice(1);
  return word.toLowerCase();
};
