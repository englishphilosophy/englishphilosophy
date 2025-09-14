import { getPath } from "@englishphilosophy/texts";
import getMatches from "../utils/getMatches.ts";
import getRegex from "../utils/getRegex.ts";
import response from "../utils/response.ts";

export default async (
  id: string,
  searchParams: URLSearchParams,
): Promise<Response> => {
  const path = await getPath(id);
  return path
    ? handleSearch(id, getQueryOptions(searchParams))
    : response("error", "Not found", 404);
};

const handleSearch = (
  id: string,
  queryOptions: ReturnType<typeof getQueryOptions>,
) =>
  queryOptions.regex
    ? handleRegexSearch(id, queryOptions.regex, queryOptions)
    : queryOptions.query
    ? handleQuerySearch(id, queryOptions.query, queryOptions)
    : response("error", "No search parameters provided.", 400);

const handleRegexSearch = async (
  id: string,
  regex: string,
  queryOptions: ReturnType<typeof getQueryOptions>,
) => {
  try {
    const regexWithBrackets = `(${regex})`; // capture the whole expression for highlighting later
    const exp = queryOptions.flags
      ? new RegExp(regexWithBrackets, queryOptions.flags)
      : new RegExp(regexWithBrackets);
    const matches = await getMatches(id, exp);
    return response("data", matches);
  } catch {
    return response("error", `Invalid regular expression (${regex}).`, 400);
  }
};

const handleQuerySearch = async (
  id: string,
  query: string,
  queryOptions: ReturnType<typeof getQueryOptions>,
) => {
  const regex = getRegex(query, queryOptions);
  const matches = await getMatches(id, regex);
  return response("data", matches);
};

const getQueryOptions = (searchParams: URLSearchParams) => ({
  regex: searchParams.get("regex"),
  flags: searchParams.get("flags"),
  query: searchParams.get("query"),
  ignorePunctuation: searchParams.get("ignorePunctuation") !== "off",
  caseInsensitive: searchParams.get("caseInsensitive") !== "off",
  wholeWords: searchParams.get("wholeWords") !== "off",
  variantSpellings: searchParams.get("variantSpellings") !== "off",
});
