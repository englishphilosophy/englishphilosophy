import { getAuthor, getMatches } from "@englishphilosophy/texts";
import Author from "../pages/Author.tsx";
import Error from "../pages/Error.tsx";
import response from "../utils/response.ts";
import searchOptions from "../utils/searchOptions.ts";

export default async (id: string, searchParams: URLSearchParams) => {
  const author = await getAuthor(id);
  if (!author) {
    return response(<Error message="Author not found." />, 404);
  }

  const options = searchOptions(searchParams);

  if (typeof options === "string") {
    const content = <Author author={author} searchParams={searchParams} searchError={options} />;
    return response(content);
  }

  if (options) {
    const matches = await getMatches(author.id, options);
    const content = (
      <Author author={author} searchParams={searchParams} matches={matches} />
    );
    return response(content);
  }

  const content = <Author author={author} />;
  return response(content);
};
