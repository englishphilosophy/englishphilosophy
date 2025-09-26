import search from "./handlers/search.ts";
import text from "./handlers/text.ts";
import texts from "./handlers/texts.ts";
import response from "./utils/response.ts";

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

    // individual text
    const textMatch = url.pathname.match(/^\/(.+)/);
    if (textMatch) {
      const id = textMatch[1];
      const isSearch = url.searchParams.get("regex") ||
        url.searchParams.get("query");
      return isSearch
        ? search(id, url.searchParams)
        : text(id, url.searchParams);
    }

    // 404
    return response("error", "Not Found", 404);
  } catch (error) {
    // 500
    console.error("Internal Server Error:", error);
    return response("error", "Internal Server Error", 500);
  }
};
