import { extname } from "@std/path";
import { contentType } from "@std/media-types";
import init, { bundle } from "lightningcss-wasm";

await init();

const baseDir = Deno.env.get("BASE_DIR") ?? ".";

export default async (path: string): Promise<Response> => {
  const content = await getContent(path);
  const headers = getHeaders(path, content);
  return new Response(content, { headers });
};

const getContent = async (path: string) => {
  const ext = extname(path);
  switch (ext) {
    case ".css": {
      const { code } = bundle({
        filename: baseDir + "/static" + path,
        minify: true,
      });
      return code as Uint8Array<ArrayBuffer>;
    }
    case ".js": {
      return await Deno.readTextFile(baseDir + "/.build" + path);
    }
    default: {
      return await Deno.readFile(baseDir + "/static" + path);
    }
  }
};

const getHeaders = (path: string, content: Uint8Array | string) => ({
  "Content-Type": contentType(extname(path)) ?? "application/octet-stream",
  length: typeof content === "string"
    ? `${content.length}`
    : `${Deno.statSync(baseDir + "/static" + path).size}`,
});
