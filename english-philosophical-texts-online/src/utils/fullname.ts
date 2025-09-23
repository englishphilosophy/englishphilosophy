import type { AuthorDetails } from "@englishphilosophy/texts";

/** Creates the full display name of an author, optionally highlighted by a search match. */
export default (author: AuthorDetails, search?: string): string => {
  const fullname = author.title
    ? `${author.title} [${author.forename} ${author.surname}]`
    : `${author.forename} ${author.surname}`;

  return search && search.length > 0
    ? fullname.replace(new RegExp(`(${search})`, "i"), "<mark>$1</mark>")
    : fullname;
};
