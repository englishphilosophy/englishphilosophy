import { getText } from "@englishphilosophy/texts";
import type { TextOptions } from "../types.ts";
import jsonResponse from "../utils/jsonResponse.ts";
import resolveChildren from "../utils/resolveChildren.ts";
import flattenText from "../utils/flattenText.ts";
import textResponse from "../utils/textResponse.ts";

export default async (id: string, options: TextOptions): Promise<Response> => {
  const text = await getText(id, options.format, options.normalized);

  if (text === undefined) {
    return jsonResponse("error", "Not found", 404);
  }
  if (options.full && options.flat) {
    const fullText = await resolveChildren(text, options);
    return textResponse(flattenText(fullText));
  }
  if (options.full) {
    const fullText = await resolveChildren(text, options);
    return jsonResponse("data", fullText);
  }
  if (options.flat) {
    return textResponse(flattenText(text));
  }
  return jsonResponse("data", text);
};
