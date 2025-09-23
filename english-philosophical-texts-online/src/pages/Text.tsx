import type { Block, Text } from "@englishphilosophy/texts";
import Breadcrumb from "../components/Breadcrumb/Breadcrumb.tsx";
import Page from "../components/Page/Page.tsx";
import Reader from "../components/Reader/Reader.tsx";
import Search from "../components/Search/Search.tsx";
import SubHeader from "../components/SubHeader/SubHeader.tsx";
import TextDisplay from "../components/TextDisplay/TextDisplay.tsx";

type Props = {
  text: Text;
  searchError?: string;
  searchParams?: URLSearchParams;
  matches?: Block[];
};

export default ({ text, searchError, searchParams, matches }: Props) => (
  <Page
    title={text.id.split(".")[0]}
    section="texts"
    heading={
      <SubHeader>
        <Breadcrumb
          ancestors={[...text.ancestors, text]}
          previous={text.previous}
          next={text.next}
        />
      </SubHeader>
    }
  >
    <Reader>
      <Search
        type={text.children.length > 0 ? "text" : "section"}
        searchError={searchError}
        searchParams={searchParams}
      />
      <TextDisplay text={text} matches={matches} />
    </Reader>
  </Page>
);
