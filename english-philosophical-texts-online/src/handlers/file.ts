import { extname } from "@std/path";
import { contentType } from "@std/media-types";
import { bundle } from "lightningcss";

const baseDir = Deno.env.get("BASE_DIR") ?? ".";

export default async (path: string): Promise<Response> => {
  const ext = extname(path);

  switch (ext) {
    case ".css": {
      const { code: content } = bundle({
        filename: baseDir + path,
        minify: true,
      });
      const headers = {
        "Content-Type": "text/css",
        length: `${content.length}`,
      };
      return new Response(content as Uint8Array<ArrayBuffer>, { headers });
    }
    case ".js": // fallthrough
    case ".jsx": // fallthrough
    case ".ts": // fallthrough
    case ".tsx": {
      const result = await Deno.bundle({
        entrypoints: [baseDir + path],
        platform: "browser",
        minify: true,
      });
      const content = result.outputFiles![0].text();
      const headers = {
        "Content-Type": "text/javascript",
        length: `${content.length}`,
      };
      return new Response(content, { headers });
    }
    default: {
      const content = await Deno.readFile(baseDir + path);
      const headers = {
        "Content-Type": contentType(ext) || "application/octet-stream",
        length: `${Deno.statSync(baseDir + path).size}`,
      };
      return new Response(content, { headers });
    }
  }
};
