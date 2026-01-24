import notFound from "./handlers/404.tsx";
import serverError from "./handlers/500.tsx";
import file from "./handlers/file.ts";
import index from "./handlers/index.tsx";
import about from "./handlers/about.tsx";
import text from "./handlers/text.tsx";

export default async (port = 0): Promise<string> => {
  let server: Deno.HttpServer<Deno.NetAddr> | null = null;
  await new Promise((onListen) => {
    server = Deno.serve({ port, onListen }, handler);
  });

  return `http://${server!.addr.hostname}:${server!.addr.port}`;
};

const handler = (request: Request) => {
  const { pathname } = new URL(request.url);

  try {
    // assets
    if (pathname === "/favicon.ico") return file("/favicon.ico");
    if (pathname === "/banner.png") return file("/banner.png");
    if (pathname === "/screen.css") return file("/screen.css");
    if (pathname === "/index.js") return file("/index.js");

    // static pages
    if (pathname === "/") return index();
    if (pathname === "/about") return about();

    // text pages
    const id = pathname.slice(1).replace(/\//g, ".");
    if (id) return text(id);

    // 404 otherwise
    return notFound();
  } catch (error) {
    const errorObject = error instanceof Error
      ? error
      : new Error("something went wrong");
    return serverError(errorObject.message);
  }
};
