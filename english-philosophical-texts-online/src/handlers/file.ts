import { extname } from "@std/path";
import { contentType } from "@std/media-types";
import { bundle } from "lightningcss";

export default async (path: string): Promise<Response> => {
  const ext = extname(path);

  switch (ext) {
    case ".css": {
      const { code: content } = bundle({ filename: path, minify: true });
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
        entrypoints: [path],
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
      const content = await Deno.readFile(path);
      const headers = {
        "Content-Type": contentType(ext) || "application/octet-stream",
        length: `${Deno.statSync(path).size}`,
      };
      return new Response(content, { headers });
    }
  }
};
