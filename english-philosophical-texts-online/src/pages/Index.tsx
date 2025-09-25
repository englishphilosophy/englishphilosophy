import type { Index } from "@englishphilosophy/texts";
import Library from "../components/Library/Library.tsx";
import LibraryControls from "../components/LibraryControls/LibraryControls.tsx";
import Page from "../components/Page/Page.tsx";

type Props = {
  index: Index;
  query?: string;
  order?: string;
};

export default ({ index, query, order }: Props) => {
  const libraryContainerId = "library-container";

  return (
    <Page
      section="texts"
      heading={
        <LibraryControls
          authors={index.children}
          libraryContainerId={libraryContainerId}
          query={query}
          order={order}
        />
      }
    >
      <div id={libraryContainerId}>
        <Library authors={index.children} query={query} order={order} />
      </div>
    </Page>
  );
};
