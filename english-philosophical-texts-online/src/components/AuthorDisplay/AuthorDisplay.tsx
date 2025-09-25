import type { Author, Block } from "@englishphilosophy/texts";
import SearchResults from "../SearchResults/SearchResults.tsx";
import TableOfContents from "../TableOfContents/TableOfContents.tsx";
import fullname from "../../utils/fullname.ts";

type Props = {
  author: Author;
  matches?: Block[];
};

export default ({ author, matches }: Props) => (
  <div class="author-display">
    <h2>
      {fullname(author.author)} ({author.author.birth}-{author.author.death})
    </h2>
    <h4>
      {author.author.nationality}, {author.author.sex}
    </h4>
    {matches
      ? <SearchResults context={author} matches={matches} />
      : <TableOfContents text={author} />}
  </div>
);
