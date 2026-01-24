import type { VNode } from "preact";
import { renderToString } from "preact-render-to-string";

export default (component: VNode, status = 200) => {
  const html = `<!doctype html>${renderToString(component)}`;
  return new Response(html, {
    status,
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      length: `${html.length}`,
    },
  });
};
