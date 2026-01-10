import search from "./handlers/search.ts";
import text from "./handlers/text.ts";
import texts from "./handlers/texts.ts";
import jsonResponse from "./utils/jsonResponse.ts";

export default async (port = 0): Promise<string> => {
  let server: Deno.HttpServer<Deno.NetAddr>;
  await new Promise((onListen) => {
    server = Deno.serve({ port, onListen }, router);
  });
  return `http://${server!.addr.hostname}:${server!.addr.port}`;
};

const router = (request: Request) => {
  try {
    const url = new URL(request.url);

    // texts index
    if (url.pathname === "/") return texts();

    // individual text or author
    const textMatch = url.pathname.match(/^\/(.+)/);
    if (textMatch) {
      const id = textMatch[1];

      if (url.searchParams.get("regex") || url.searchParams.get("query")) {
        return search(id, url.searchParams);
      }

      const format = url.searchParams.get("format") ?? "html";
      if (format !== "markit" && format !== "text" && format !== "html") {
        return jsonResponse(
          "error",
          "Invalid format requested. Options are 'markit', 'text', or 'html'.",
          400,
        );
      }

      const normalized = url.searchParams.get("normalized") !== null;
      const full = url.searchParams.get("full") !== null;
      const flat = url.searchParams.get("flat") !== null;
      return text(id, { format, normalized, full, flat });
    }

    // 404
    return jsonResponse("error", "Not Found", 404);
  } catch (error) {
    // 500
    console.error("Internal Server Error:", error);
    return jsonResponse("error", "Internal Server Error", 500);
  }
};
