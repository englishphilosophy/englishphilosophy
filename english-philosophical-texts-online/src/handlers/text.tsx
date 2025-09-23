import { getMatches, getText } from "@englishphilosophy/texts";
import Error from "../pages/Error.tsx";
import Text from "../pages/Text.tsx";
import response from "../utils/response.ts";
import searchOptions from "../utils/searchOptions.ts";

export default async (id: string, searchParams: URLSearchParams) => {
  const text = await getText(id);
  if (!text) {
    return response(<Error message="Author not found." />, 404);
  }

  const options = searchOptions(searchParams);

  if (typeof options === "string") {
    const content = <Text text={text} searchParams={searchParams} searchError={options} />;
    return response(content);
  }

  if (options) {
    const matches = await getMatches(text.id, options);
    const content = (
      <Text text={text} searchParams={searchParams} matches={matches} />
    );
    return response(content);
  }

  const content = <Text text={text} />;
  return response(content);
};
