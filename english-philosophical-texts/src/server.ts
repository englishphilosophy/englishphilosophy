import healthcheck from "./handlers/healthcheck.ts";
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

    // healthcheck
    if (url.pathname === "/") return healthcheck();

    // texts index
    if (url.pathname === "/texts") return texts();

    // text by id
    const textMatch = url.pathname.match(/^\/texts\/(.+)/);
    if (textMatch) {
      return text(textMatch[1], url.searchParams);
    }

    // search
    const searchMatch = url.pathname.match(/^\/search\/(.+)/);
    if (searchMatch) {
      return search(searchMatch[1], url.searchParams);
    }

    // 404
    return response("error", "Not Found", 404);
  } catch (error) {
    // 500
    console.error("Internal Server Error:", error);
    return response("error", "Internal Server Error", 500);
  }
};
