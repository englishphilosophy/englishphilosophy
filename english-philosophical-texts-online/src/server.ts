import notFound from "./handlers/404.tsx";
import serverError from "./handlers/500.tsx";
import about from "./handlers/about.tsx";
import author from "./handlers/author.tsx";
import file from "./handlers/file.ts";
import index from "./handlers/index.tsx";
import text from "./handlers/text.tsx";

export default async (port = 0): Promise<string> => {
  let server: Deno.HttpServer<Deno.NetAddr> | null = null;
  await new Promise((onListen) => {
    server = Deno.serve({ port, onListen }, handler());
  });

  return `http://${server!.addr.hostname}:${server!.addr.port}`;
};

const handler = () => (request: Request) => {
  const { pathname, searchParams } = new URL(request.url);

  try {
    // assets
    if (pathname === "/favicon.ico") return file("/static/favicon.ico");
    if (pathname === "/leviathan.webp") return file("/static/leviathan.webp");
    if (pathname === "/screen.css") return file("/static/screen.css");
    if (pathname === "/index.js") return file("/src/client/index.ts");

    // static pages
    if (pathname === "/") return index(searchParams);
    if (pathname === "/about") return about("general");
    if (pathname === "/about/") return about("general");
    if (pathname === "/about/general") return about("general");
    if (pathname === "/about/corpus") return about("corpus");
    if (pathname === "/about/principles") return about("principles");
    if (pathname === "/about/permissions") return about("permissions");

    // author pages
    const authorMatch = new URLPattern({ pathname: "/:id" });
    const authorMatchResult = authorMatch.exec(request.url);
    if (authorMatchResult) {
      const { id } = authorMatchResult.pathname.groups;
      return author(id!, searchParams);
    }

    // text pages
    const textMatch = new URLPattern({ pathname: "/:id+" });
    const textMatchResult = textMatch.exec(request.url);
    if (textMatchResult) {
      const { id } = textMatchResult.pathname.groups;
      return text(id!, searchParams);
    }

    // 404 otherwise
    return notFound();
  } catch (error) {
    const errorObject = error instanceof Error
      ? error
      : new Error("something went wrong");
    return serverError(errorObject.message);
  }
};
