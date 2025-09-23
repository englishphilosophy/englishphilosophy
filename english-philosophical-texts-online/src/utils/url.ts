import type { AuthorStub, Block, TextStub } from "@englishphilosophy/texts";

/** Create the (local) URL for an author, text, or block. */
export default (data: AuthorStub | TextStub | Block): string =>
  (data as Block).type === "paragraph" || (data as Block).type === "note"
    ? `/${
      data.id
        .toLowerCase()
        .replace(/\.([^\.]*)$/, "#$1")
        .replace(/\./g, "/")
    }`
    : `/${data.id.toLowerCase().replace(/\./g, "/")}`;
