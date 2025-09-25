import type { Author, Block, Text } from "@englishphilosophy/texts";
import Blocks from "../Blocks/Blocks.tsx";
import url from "../../utils/url.ts";

type Props = {
  context: Author | Text;
  matches: Block[];
};

export default ({ context, matches }: Props) => (
  <div class="search-results">
    <h3>
      Search Results
      <a href={url(context)}>clear</a>
    </h3>
    <div class="feedback">
      <p>
        {matches.length === 0
          ? "No matches found."
          : `Your search matched ${matches.length} ${
            matches.length === 1 ? "paragraph/note" : "paragraphs/notes"
          }.`}
      </p>
      <p>
        Note that matching text is shown without formatting. To see the text
        with formatting, click on the link for each paragraph to see it in
        context.
      </p>
    </div>
    {matches.length > 0 ? <Blocks blocks={matches} /> : null}
  </div>
);
