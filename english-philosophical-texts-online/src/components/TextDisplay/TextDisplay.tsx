import type { Block, Text } from "@englishphilosophy/texts";
import Blocks from "../Blocks/Blocks.tsx";
import SearchResults from "../SearchResults/SearchResults.tsx";
import TableOfContents from "../TableOfContents/TableOfContents.tsx";

type Props = {
  text: Text;
  matches?: Block[];
};

export default ({ text, matches }: Props) => (
  <div class="reader-section text-display">
    <Blocks blocks={text.blocks.slice(0, 1)} />
    {matches
      ? <SearchResults context={text} matches={matches} />
      : text.children.length > 0
      ? <TableOfContents text={text} />
      : <Blocks blocks={text.blocks.slice(1)} />}
  </div>
);
