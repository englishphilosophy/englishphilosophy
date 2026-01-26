import { getText } from "@englishphilosophy/texts";
import response from "../utils/response.ts";
import Error from "../pages/Error.tsx";
import Text from "../pages/Text.tsx";

export default async (id: string, diffWith: string | null) => {
  const text = await getText(`Hume.${id}`, { diffWith });

  if (!text) {
    const content = <Error message="Page not found." />;
    return response(content, 404);
  }

  const content = <Text text={text} />;
  return response(content);
};
