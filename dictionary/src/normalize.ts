import variants from "../data/variants.ts";
import { applyCase, caseTypes } from "./case.ts";

export default (text: string): string => {
  for (const [from, to] of variants) {
    text = caseSensitiveReplacements(text, from, to);
    text = caseSensitiveReplacements(text, from + "s", to + "s");
  }
  return text;
};

const caseSensitiveReplacements = (text: string, from: string, to: string) => {
  for (const caseType of caseTypes) {
    const regex = from.startsWith("'") && from.endsWith("'")
      ? new RegExp(`${applyCase(from, caseType)}`, "g")
      : from.startsWith("'")
      ? new RegExp(`${applyCase(from, caseType)}\\b`, "g")
      : from.endsWith("'")
      ? new RegExp(`\\b${applyCase(from, caseType)}`, "g")
      : new RegExp(`\\b${applyCase(from, caseType)}\\b`, "g");
    text = text.replace(regex, applyCase(to, caseType));
  }
  return text;
};
