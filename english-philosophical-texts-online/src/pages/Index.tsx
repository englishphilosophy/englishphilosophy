import type { Index } from "@englishphilosophy/texts";
import Library from "../components/Library/Library.tsx";
import LibraryControls from "../components/LibraryControls/LibraryControls.tsx";
import Page from "../components/Page/Page.tsx";

type Props = {
  index: Index;
  query?: string;
  order?: string;
};

export default ({ index, query, order }: Props) => (
  <Page
    section="texts"
    heading={<LibraryControls query={query} order={order} />}
  >
    <div id="library-container">
      <Library authors={index.children} query={query} order={order} />
    </div>
    <script
      dangerouslySetInnerHTML={{
        __html: `window.index = ${JSON.stringify(index)};`,
      }}
    >
    </script>
  </Page>
);
