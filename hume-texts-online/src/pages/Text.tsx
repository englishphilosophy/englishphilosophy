import type { Text } from "@englishphilosophy/texts";
import Blocks from "../components/Blocks.tsx";
import Page from "../components/Page.tsx";
import TableOfContents from "../components/TableOfContents.tsx";

type Props = {
  text: Text;
};

export default ({ text }: Props) => (
  <Page section="texts">
    <div class="bg-white border border-gray p-4 flex flex-col gap-4">
      <Blocks blocks={text.blocks.slice(0, 1)} />
      {text.children.length > 0
        ? <TableOfContents text={text} />
        : <Blocks blocks={text.blocks.slice(1)} />}
    </div>
  </Page>
);
