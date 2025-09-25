import { renderToString } from "preact-render-to-string";
import type { Author } from "@englishphilosophy/texts";
import Library from "../Library/Library.tsx";

document.querySelector("[data-authors][data-library-container-id]")
  ?.addEventListener("input", (event) => {
    const form = event.currentTarget as HTMLFormElement;
    const formData = new FormData(form);
    const query = formData.get("query")?.toString() ?? "";
    const order = formData.get("order")?.toString() ?? "";
    const authors = JSON.parse(form.getAttribute("data-authors")!) as Author[];
    const libraryContainerId = form.getAttribute("data-library-container-id")!;
    const libraryContainer = document.getElementById(libraryContainerId);
    if (libraryContainer) {
      libraryContainer.innerHTML = renderToString(
        <Library
          authors={authors}
          query={query}
          order={order}
        />,
      );
    }
  });
