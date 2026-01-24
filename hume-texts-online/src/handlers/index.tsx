import { getText } from "@englishphilosophy/texts";
import response from "../utils/response.ts";
import Index from "../pages/Index.tsx";
import Error from "../pages/Error.tsx";

export default async () => {
  const humeWorks = await getText("Hume");
  const humeEditions = await getText("Hume.Editions");

  if (!humeWorks || !humeEditions) {
    const content = <Error message="Could not load Hume texts." />;
    return response(content, 500);
  }

  const works = humeWorks.children;
  const editions = humeEditions.children;
  const content = <Index works={works} editions={editions} />;
  return response(content);
};
