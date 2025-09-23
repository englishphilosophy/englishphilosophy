import type { Text, TextStub } from "@englishphilosophy/texts";

/** Creates the full display title of a text. */
export default (text: Text | TextStub): string =>
  text.published
    ? `${text.title} (${text.published.map((x) => x.toString(10)).join(", ")})`
    : text.title;
