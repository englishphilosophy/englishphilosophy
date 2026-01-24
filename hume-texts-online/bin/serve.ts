import server from "../src/server.ts";

const PORT = Deno.env.get("PORT");
const port = PORT ? Number(PORT) : undefined;

server(port);
