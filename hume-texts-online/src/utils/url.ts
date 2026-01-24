import type { Block, TextStub } from "@englishphilosophy/texts";

/** Create the (local) URL for a text, or block. */
export default (data: TextStub | Block): string => {
  const id = data.id.replace(/^Hume\./, "");
  const isBlock = (data as Block).type === "paragraph" || (data as Block).type === "note";

  return isBlock
    ? `/${id.toLowerCase().replace(/\.([^\.]*)$/, "#$1").replace(/\./g, "/")}`
    : `/${id.toLowerCase().replace(/\./g, "/")}`;
};
