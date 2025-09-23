import { getPath } from "@englishphilosophy/texts";
import getMatches from "../utils/getMatches.ts";
import response from "../utils/response.ts";

export default async (
  id: string,
  searchParams: URLSearchParams,
): Promise<Response> => {
  const path = await getPath(id);
  if (!path) {
    return response("error", "Text not found", 404);
  }

  const searchOptions = getSearchOptions(searchParams);
  if (typeof searchOptions === "string") {
    return response("error", searchOptions, 400);
  }

  const matches = await getMatches(id, searchOptions);
  return response("data", matches);
};

const getSearchOptions = (searchParams: URLSearchParams) => {
  const regex = searchParams.get("regex");
  if (regex) {
    try {
      const flags = searchParams.get("flags") || undefined;
      const regexWithBrackets = `(${regex})`; // capture the whole expression for highlighting later
      return {
        regex: flags
          ? new RegExp(regexWithBrackets, flags)
          : new RegExp(regexWithBrackets),
      };
    } catch {
      return `Invalid regular expression (${regex}).`;
    }
  }

  const query = searchParams.get("query");
  if (query) {
    return {
      query,
      ignorePunctuation: searchParams.get("ignorePunctuation") !== "off",
      caseInsensitive: searchParams.get("caseInsensitive") !== "off",
      wholeWords: searchParams.get("wholeWords") !== "off",
      variantSpellings: searchParams.get("variantSpellings") !== "off",
    };
  }

  return "No query or regex provided.";
};
