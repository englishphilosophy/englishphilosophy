export default (searchParams: URLSearchParams) => {
  const regex = searchParams.get("r");
  if (regex) {
    try {
      const flags = searchParams.get("f") || undefined;
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

  const query = searchParams.get("q");
  if (query) {
    return {
      query,
      ignorePunctuation: searchParams.get("p") === "on",
      caseInsensitive: searchParams.get("c") === "on",
      wholeWords: searchParams.get("w") === "on",
      variantSpellings: searchParams.get("v") === "on",
    };
  }

  return null;
};
