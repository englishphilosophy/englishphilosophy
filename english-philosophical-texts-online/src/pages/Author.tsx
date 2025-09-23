import type { Author, Block, SearchOptions } from "@englishphilosophy/texts";
import AuthorDisplay from "../components/AuthorDisplay/AuthorDisplay.tsx";
import Breadcrumb from "../components/Breadcrumb/Breadcrumb.tsx";
import Page from "../components/Page/Page.tsx";
import Reader from "../components/Reader/Reader.tsx";
import Search from "../components/Search/Search.tsx";
import SubHeader from "../components/SubHeader/SubHeader.tsx";

type Props = {
  author: Author;
  searchParams?: URLSearchParams;
  searchError?: string;
  matches?: Block[];
};

export default ({ author, searchParams, searchError, matches }: Props) => (
  <Page
    title={author.id}
    section="texts"
    heading={
      <SubHeader>
        <Breadcrumb ancestors={[author]} />
      </SubHeader>
    }
  >
    <Reader>
      <Search
        type="author"
        searchParams={searchParams}
        searchError={searchError}
      />
      <AuthorDisplay author={author} matches={matches} />
    </Reader>
  </Page>
);
