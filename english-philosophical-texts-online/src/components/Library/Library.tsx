import type { Author } from "@englishphilosophy/texts";
import fullname from "../../utils/fullname.ts";
import url from "../../utils/url.ts";

type Props = {
  authors: Author[];
  query?: string;
  order?: string;
};

export default ({ authors, query, order }: Props) => {
  const displayAuthors = sortAndFilterAuthors(authors, query, order);

  return (
    <div class="library">
      {displayAuthors.length > 0
        ? (
          displayAuthors.map((author) => (
            <a class="author" href={url(author)}>
              <h6
                dangerouslySetInnerHTML={{
                  __html: `${
                    fullname(author.author, query)
                  } (${author.author.birth}-${author.author.death})`,
                }}
              />
              <div class="details">
                <div>Nationality: {author.author.nationality}</div>
                <div>Sex: {author.author.sex}</div>
                <div>
                  Texts in library:{" "}
                  {author.children.filter((x) => x.imported).length} /{" "}
                  {author.children.length}
                </div>
              </div>
            </a>
          ))
        )
        : <a class="author empty">No matching authors</a>}
    </div>
  );
};

const sortAndFilterAuthors = (
  authors: Author[],
  query?: string,
  order?: string,
) => {
  const filteredAuthors = query && query.length > 0
    ? authors.filter((author) =>
      fullname(author.author).toLowerCase().includes(query.toLowerCase())
    )
    : authors;

  switch (order) {
    case "birth":
      filteredAuthors.sort((a, b) => a.author.birth - b.author.birth);
      break;
    case "alphabetical":
      filteredAuthors.sort((a, b) =>
        a.author.surname.localeCompare(b.author.surname)
      );
      break;
    default: // "publication" by default
      filteredAuthors.sort((a, b) => a.author.published - b.author.published);
      break;
  }

  return filteredAuthors;
};
