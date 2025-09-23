import { renderToString } from "preact-render-to-string";
import type { Index } from "@englishphilosophy/texts";
import Library from "../Library/Library.tsx";

type Window = typeof globalThis & {
  index?: Index;
};

const libraryControls = document.getElementById("library-controls");
const libraryContainer = document.getElementById("library-container");
const index = (globalThis as Window).index;

if (libraryControls && libraryContainer && index) {
  libraryControls.addEventListener("input", (event) => {
    event.preventDefault();
    const formData = new FormData(libraryControls as HTMLFormElement);
    const query = formData.get("query")?.toString() ?? "";
    const order = formData.get("order")?.toString() ?? "";
    libraryContainer.innerHTML = renderToString(
      <Library
        authors={index.children}
        query={query}
        order={order}
      />,
    );
  });
}
