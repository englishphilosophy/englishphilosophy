import getText from "../utils/getText.ts";
import response from "../utils/response.ts";

export default async (
  id: string,
  searchParams: URLSearchParams,
): Promise<Response> => {
  const format = searchParams.get("format") ?? "html";
  if (format !== "markit" && format !== "text" && format !== "html") {
    return response(
      "error",
      "Invalid format requested. Options are 'markit', 'text', or 'html'.",
      400,
    );
  }

  const normalized = searchParams.get("normalized") !== null;
  const text = await getText(id, format, normalized);
  return text ? response("data", text) : response("error", "Not found", 404);
};
